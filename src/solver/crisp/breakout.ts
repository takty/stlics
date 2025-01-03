/**
 * Class implements a solver using the breakout method.
 * Solves a problem as a maximum CSP.
 *
 * @author Takuto Yanagida
 * @version 2025-01-03
 */

import { Variable } from '../../problem/variable';
import { Constraint } from '../../problem/constraint';
import { Assignment } from '../misc/assignment';
import { AssignmentList } from '../misc/assignment-list';
import { Solver } from '../solver';

export class Breakout extends Solver {

	#isRandom: boolean = true;
	#ws!     : number[];

	/**
	 * Generates a solver.
	 */
	constructor() {
		super();
	}

	/**
	 * Sets the randomness of the algorithm.
	 * Enabling randomness reduces the risk of local solutions, but makes the solution unrepeatable.
	 * @param flag Whether the randomness is enabled.
	 */
	setRandomness(flag: boolean): void {
		this.#isRandom = flag;
	}

	/**
	 * {@override}
	 */
	name(): string {
		return 'Breakout';
	}

	/**
	 * {@override}
	 */
	protected preprocess(): void {
		this.#ws = new Array(this.pro.constraintSize());
		this.#ws.fill(1);

		for (const x of this.pro.variables()) {
			if (x.isEmpty()) {
				x.assign(x.domain().at(0));
			}
		}
		this.monitor.initialize();
	}

	/**
	 * {@override}
	 */
	protected exec(): boolean {
		const defEv: number         = this.pro.ratio();
		const sol  : AssignmentList = new AssignmentList();
		let solEv  : number         = defEv;

		const canList = new AssignmentList();
		let ret: boolean | null = null;

		while (true) {
			const cs: Constraint[] = this.pro.violatingConstraints();
			const ev: number = this.pro.ratio();
			this.monitor.outputDebugString(`Evaluation: ${ev}`);

			if (solEv < ev) {
				sol.setProblem(this.pro);
				solEv = ev;

				if (this.monitor.solutionFound(sol, solEv)) {
					return true;
				}
			}
			if (null !== (ret = this.monitor.check(ev))) {
				break;
			}
			this.#next(cs, canList);
		}

		if (false === ret && !this.monitor.isTargetAssigned() && defEv < solEv) {
			sol.apply();
			ret = true;
		}
		return ret;
	}

	#next(cs: Constraint[], canList: AssignmentList): void {
		this.#findCandidates(this.#listTargetVariables(cs), canList);

		if (0 < canList.size()) {
			const a: Assignment = this.#isRandom ? canList.random() : canList.at(0);
			a.apply();
			canList.clear();
			this.monitor.outputDebugString('\t' + a);
		} else {
			for (const c of cs) {
				this.#ws[c.index()] += 1;
			}
			this.monitor.outputDebugString('Breakout');
		}
	}

	#findCandidates(tarXs: Variable[], canList: AssignmentList): void {
		let maxDiff: number = 0;

		for (const x of tarXs) {
			const x_v: number = x.value();  // Save the value

			let nowEv: number = 0;
			for (const c of x) {
				nowEv += (1 - c.isSatisfied()) * this.#ws[c.index()];
			}
			out: for (const v of x.domain()) {
				if (x_v === v) {
					continue;
				}
				x.assign(v);
				let diff: number = nowEv;

				for (const c of x) {
					diff -= (1 - c.isSatisfied()) * this.#ws[c.index()];
					// If the improvement is less than the previous improvement, try the next variable.
					if (diff < maxDiff) {
						continue out;
					}
				}
				if (maxDiff < diff) {  // An assignment that are better than ever before is found.
					maxDiff = diff;
					canList.clear();
					canList.addVariable(x, v);
				} else if (maxDiff !== 0) {  // An assignments that can be improved to the same level as before is found.
					canList.addVariable(x, v);
				}
			}
			x.assign(x_v);  // Restore the value.
		}
	}

	#listTargetVariables(tarCs: Constraint[]): Variable[] {
		const xs = new Set<Variable>();

		for (const c of tarCs) {
			for (const x of c) {
				xs.add(x);
			}
		}
		return Array.from<Variable>(xs);
	}

}
