/**
 * Class implements a solver using the breakout method for fuzzy CSP.
 *
 * @author Takuto Yanagida
 * @version 2024-10-22
 */

import { Problem } from '../../problem/problem';
import { Variable } from '../../problem/variable';
import { Constraint } from '../../problem/constraint';
import { Assignment } from '../../util/assignment';
import { AssignmentList } from '../../util/assignment-list';
import { Solver } from '../solver';

export class FuzzyBreakout extends Solver {

	#isRandom: boolean = true;

	#ws: number[];
	#lastSolDeg: number = 0;

	constructor(p: Problem) {
		super(p);

		this.#ws = new Array(this._pro.constraintSize());
		this.#ws.fill(1);
	}

	name(): string {
		return 'Fuzzy Breakout';
	}

	/**
	 * Sets the randomness of the algorithm.
	 * Enabling randomness reduces the risk of local solutions, but makes the solution unrepeatable.
	 * @param flag Whether the randomness is enabled.
	 */
	setRandomness(flag: boolean): void {
		this.#isRandom = flag;
	}

	#findCandidates(worstXs: Iterable<Variable>, canList: AssignmentList): void {
		let maxDiff: number = 0;

		for (const x of worstXs) {
			const x_v: number = x.value();  // Save the value

			let nowVio: number = 0;
			for (const c of x) {
				nowVio += (1 - c.satisfactionDegree()) * this.#ws[c.index()];
			}
			out: for (const v of x.domain()) {
				if (x_v === v) {
					continue;
				}
				x.assign(v);
				let diff: number = nowVio;

				for (const c of x) {
					diff -= (1 - c.satisfactionDegree()) * this.#ws[c.index()];
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

	#listWorstVariables(worstCs: Iterable<Constraint>): Iterable<Variable> {
		const xs = new Set<Variable>();

		for (const c of worstCs) {
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

		const deg: number = this._pro.worstSatisfactionDegree();
		const canList = new AssignmentList();

		const sol = new AssignmentList();

		while (true) {
			const [vcs, wsd] = this._pro.constraintsWithWorstSatisfactionDegree();
			// Success if the degree improves from specified
			if (this._targetDeg !== null && this._targetDeg <= wsd) {
				this._debugOutput('stop: current degree is above the target');
				return true;
			}
			// Failure if repeated a specified number
			if (this._iterLimit && this._iterLimit < iterCount++) {
				this._debugOutput('stop: number of iterations has reached the limit');
				break;
			}
			// Failure if time limit is exceeded
			if (endTime < Date.now()) {
				this._debugOutput('stop: time limit has been reached');
				break;
			}

			this._debugOutput('worst satisfaction degree: ' + wsd);

			if (this.#lastSolDeg < wsd) {
				sol.setProblem(this._pro);
				this.#lastSolDeg = wsd;

				if (this.foundSolution(sol, this.#lastSolDeg)) {  // Call hook
					return true;
				}
			}

			this.#findCandidates(this.#listWorstVariables(vcs), canList);

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
		if (this._targetDeg === null && deg < this._pro.worstSatisfactionDegree()) return true;
		return false;
	}

}
