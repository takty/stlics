/**
 * Class implements a solver using the breakout method for fuzzy CSP.
 *
 * @author Takuto Yanagida
 * @version 2023-04-16
 */

import { AssignmentList } from '../../util/_assignment-list.js';
import { Solver } from '../_solver.js';

export class FuzzyBreakout extends Solver {

	#weights;
	#lastSolDeg;

	#isRandom = true;

	constructor(p) {
		super(p);
		this.#weights = new Array(this._pro.constraintSize());
		this.#weights.fill(1);
	}

	name() {
		return 'Fuzzy Breakout';
	}

	foundSolution() {
		return false;
	}

	#findCandidates(worstVars, canList) {
		let maxDiff = 0;

		for (const v of worstVars) {
			const v_val = v.value();  // Save the value

			let nowVio = 0;
			for (const c of v) {
				nowVio += (1 - c.satisfactionDegree()) * this.#weights[c.index()];
			}
			out: for (const d of v.domain()) {
				if (v_val === d) continue;
				v.assign(d);
				let diff = nowVio;
				for (const c of v) {
					diff -= (1 - c.satisfactionDegree()) * this.#weights[c.index()];
					// If the improvement is less than the previous improvement, try the next variable.
					if (diff < maxDiff) {
						continue out;
					}
				}
				if (diff > maxDiff) {  // Found assignments that are better than ever before.
					maxDiff = diff;
					canList.clear();
					canList.addVariable(v, d);
				} else if (maxDiff !== 0) {  // Found assignments that can be improved to the same level as before.
					canList.addVariable(v, d);
				}
			}
			v.assign(v_val);  // Restore the value.
		}
	}

	#listWorstVariables(worstCons) {
		const wvs = new Set();
		for (const c of worstCons) {
			for (const v of c) wvs.add(v);
		}
		return Array.from(wvs);
	}

	exec() {
		const endTime = (this._timeLimit === null) ? Number.MAX_VALUE : (Date.now() + this._timeLimit);
		let iterCount = 0;

		for (const v of this._pro.variables()) {
			if (v.isEmpty()) v.assign(v.domain().at(0));
		}

		const deg     = this._pro.worstSatisfactionDegree();
		const canList = new AssignmentList();

		const sol = new AssignmentList();

		while (true) {
			const [vc, wsd] = this._pro.constraintsWithWorstSatisfactionDegree();
			if (this._targetDeg !== null && this._targetDeg <= wsd) {  // Success if the degree improves from specified
				this._debugOutput('stop: current degree is above the target');
				return true;
			}
			if (this._iterLimit && this._iterLimit < iterCount++) {  // Failure if repeated a specified number
				this._debugOutput('stop: number of iterations has reached the limit');
				break;
			}
			if (endTime < Date.now()) {  // Failure if time limit is exceeded
				this._debugOutput('stop: time limit has been reached');
				break;
			}

			this._debugOutput('worst satisfaction degree: ' + wsd);

			if (this.#lastSolDeg < wsd) {
				sol.setProblem(this._pro);
				this.#lastSolDeg = wsd;
				if (foundSolution(sol, this.#lastSolDeg)) {  // Call hook
					return true;
				}
			}

			this.#findCandidates(this.#listWorstVariables(vc), canList);

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
		if (this._targetDeg === null && deg < this._pro.worstSatisfactionDegree()) return true;
		return false;
	}

	/**
	 * Sets the randomness of the algorithm.
	 * Enabling randomness reduces the risk of local solutions, but makes the solution unrepeatable.
	 * @param flag Whether the randomness is enabled.
	 */
	setRandomness(flag) {
		this.#isRandom = flag;
	}

}
