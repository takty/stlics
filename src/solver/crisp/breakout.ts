/**
 * Class implements a solver using the breakout method.
 * Solves a problem as a maximum CSP.
 *
 * @author Takuto Yanagida
 * @version 2023-04-16
 */

import { Problem } from '../../problem/problem';
import { CrispProblem } from '../../problem/problem-crisp';
import { Variable } from '../../problem/variable';
import { Constraint } from '../../problem/constraint';
import { AssignmentList } from '../../util/assignment-list';
import { Solver } from '../solver';

export class Breakout extends Solver {

	#weights: number[];

	#isRandom: boolean = true;

	constructor(p: Problem) {
		super(p);
		this.#weights = new Array(this._pro.constraintSize());
		this.#weights.fill(1);
	}

	name(): string {
		return 'Breakout';
	}

	#findCandidates(vioXs: Variable[], canList: AssignmentList): void {
		let maxDiff = 0;

		for (const x of vioXs) {
			const x_v = x.value();  // Save the value

			let nowVio = 0;
			for (const c of x) {
				nowVio += (1 - c.isSatisfied()) * this.#weights[c.index()];
			}
			out: for (const d of x.domain()) {
				if (x_v === d) continue;
				x.assign(d);
				let diff: number = nowVio;
				for (const c of x) {
					diff -= (1 - c.isSatisfied()) * this.#weights[c.index()];
					// If the improvement is less than the previous improvement, try the next variable.
					if (diff < maxDiff) {
						continue out;
					}
				}
				if (diff > maxDiff) {  // Found assignments that are better than ever before.
					maxDiff = diff;
					canList.clear();
					canList.addVariable(x, d);
				} else if (maxDiff !== 0) {  // Found assignments that can be improved to the same level as before.
					canList.addVariable(x, d);
				}
			}
			x.assign(x_v);  // Restore the value.
		}
	}

	#listViolatingVariables(vioCs: Constraint[]): Variable[] {
		const xxs = new Set<Variable>();
		for (const c of vioCs) {
			for (const x of c) {
				xxs.add(x);
			}
		}
		return Array.from<Variable>(xxs);
	}

	exec(): boolean {
		const endTime = (this._timeLimit === null) ? Number.MAX_VALUE : (Date.now() + this._timeLimit);
		let iterCount = 0;

		for (const x of this._pro.variables()) {
			if (x.isEmpty()) {
				x.assign(x.domain().at(0));
			}
		}

		const canList = new AssignmentList();

		while (true) {
			const vc: Constraint[] = (this._pro as CrispProblem).violatingConstraints();
			if ((this._targetDeg ?? 1) <= (this._pro as CrispProblem).satisfiedConstraintRate()) {  // Success if violation rate improves from specified
				this._debugOutput('stop: current degree is above the target');
				return true;
			}
			if (this._iterLimit && this._iterLimit < iterCount++) {  // Failure if repeated a specified number
				this._debugOutput('stop: number of iterations has reached the limit');
				return false;
			}
			if (endTime < Date.now()) {  // Failure if time limit is exceeded
				this._debugOutput('stop: time limit has been reached');
				return false;
			}

			this._debugOutput(vc.length + ' violations');
			this.#findCandidates(this.#listViolatingVariables(vc), canList);

			if (0 < canList.size()) {
				const e = this.#isRandom ? canList.random() : canList.at(0);
				e.apply();
				canList.clear();
				this._debugOutput('\t' + e);
			} else {
				for (const c of vc) {
					this.#weights[c.index()] += 1;
				}
				this._debugOutput('breakout');
			}
		}
	}

	/**
	 * Sets the randomness of the algorithm.
	 * Enabling randomness reduces the risk of local solutions, but makes the solution unrepeatable.
	 * @param flag Whether the randomness is enabled.
	 */
	setRandomness(flag: boolean): void {
		this.#isRandom = flag;
	}

}
