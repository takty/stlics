/**
 * Class implements a solver using the breakout method.
 * Solves a problem as a maximum CSP.
 *
 * @author Takuto Yanagida
 * @version 2024-10-22
 */

import { Problem } from '../../problem/problem';
import { CrispProblem } from '../../problem/problem-crisp';
import { Variable } from '../../problem/variable';
import { Constraint } from '../../problem/constraint';
import { Assignment } from '../../util/assignment';
import { AssignmentList } from '../../util/assignment-list';
import { Solver } from '../solver';

export class Breakout extends Solver {

	#isRandom: boolean = true;

	#ws: number[];

	/**
	 * Generates a solver given a constraint satisfaction problem.
	 * @param p A crisp problem.
	 */
	constructor(p: CrispProblem) {
		super(p as Problem);

		this.#ws = new Array(this._pro.constraintSize());
		this.#ws.fill(1);
	}

	name(): string {
		return 'Breakout';
	}

	/**
	 * Sets the randomness of the algorithm.
	 * Enabling randomness reduces the risk of local solutions, but makes the solution unrepeatable.
	 * @param flag Whether the randomness is enabled.
	 */
	setRandomness(flag: boolean): void {
		this.#isRandom = flag;
	}

	#findCandidates(vioXs: Variable[], canList: AssignmentList): void {
		let maxDiff: number = 0;

		for (const x of vioXs) {
			const x_v: number = x.value();  // Save the value

			let nowVio: number = 0;
			for (const c of x) {
				nowVio += (1 - c.isSatisfied()) * this.#ws[c.index()];
			}
			out: for (const v of x.domain()) {
				if (x_v === v) {
					continue;
				}
				x.assign(v);
				let diff: number = nowVio;

				for (const c of x) {
					diff -= (1 - c.isSatisfied()) * this.#ws[c.index()];
					// If the improvement is less than the previous improvement, try the next variable.
					if (diff < maxDiff) {
						continue out;
					}
				}
				if (diff > maxDiff) {  // Found assignments that are better than ever before.
					maxDiff = diff;
					canList.clear();
					canList.addVariable(x, v);
				} else if (maxDiff !== 0) {  // Found assignments that can be improved to the same level as before.
					canList.addVariable(x, v);
				}
			}
			x.assign(x_v);  // Restore the value.
		}
	}

	#listViolatingVariables(vioCs: Constraint[]): Variable[] {
		const xs = new Set<Variable>();

		for (const c of vioCs) {
			for (const x of c) {
				xs.add(x);
			}
		}
		return Array.from<Variable>(xs);
	}

	exec(): boolean {
		const endTime: number = (this._timeLimit === null) ? Number.MAX_VALUE : (Date.now() + this._timeLimit);
		let iterCount: number = 0;

		for (const x of this._pro.variables()) {
			if (x.isEmpty()) {
				x.assign(x.domain().at(0));
			}
		}

		const canList = new AssignmentList();
		const p = this._pro as CrispProblem;

		while (true) {
			const vcs: Constraint[] = p.violatingConstraints();
			// Success if violation rate improves from specified
			if ((this._targetDeg ?? 1) <= p.satisfiedConstraintRate()) {
				this._debugOutput('stop: current degree is above the target');
				return true;
			}
			// Failure if repeated a specified number
			if (this._iterLimit && this._iterLimit < iterCount++) {
				this._debugOutput('stop: number of iterations has reached the limit');
				return false;
			}
			// Failure if time limit is exceeded
			if (endTime < Date.now()) {
				this._debugOutput('stop: time limit has been reached');
				return false;
			}

			this._debugOutput(vcs.length + ' violations');
			this.#findCandidates(this.#listViolatingVariables(vcs), canList);

			if (0 < canList.size()) {
				const a: Assignment = this.#isRandom ? canList.random() : canList.at(0);
				a.apply();
				canList.clear();
				this._debugOutput('\t' + a);
			} else {
				for (const c of vcs) {
					this.#ws[c.index()] += 1;
				}
				this._debugOutput('breakout');
			}
		}
	}

}
