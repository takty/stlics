/**
 * Class implements a solver using the breakout method.
 * Solves a problem as a maximum CSP.
 *
 * @author Takuto Yanagida
 * @version 2023-04-16
 */

import { AssignmentList } from '../../util/_assignment-list.js';
import { Solver } from '../_solver.js';

export class Breakout extends Solver {

	#weights;

	#isRandom = true;

	constructor(p) {
		super(p);
		this.#weights = new Array(this._pro.constraintSize());
		this.#weights.fill(1);
	}

	name() {
		return 'Breakout';
	}

	#findCandidates(vioVars, canList) {
		let maxDiff = 0;

		for (const v of vioVars) {
			const v_val = v.value();  // Save the value

			let nowVio = 0;
			for (const c of v) {
				nowVio += (1 - c.isSatisfied()) * this.#weights[c.index()];
			}
			out: for (const d of v.domain()) {
				if (v_val === d) continue;
				v.assign(d);
				let diff = nowVio;
				for (const c of v) {
					diff -= (1 - c.isSatisfied()) * this.#weights[c.index()];
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

	#listViolatingVariables(vioCons) {
		const vvs = new Set();
		for (const c of vioCons) {
			for (const v of c) {
				vvs.add(v);
			}
		}
		return Array.from(vvs);
	}

	exec() {
		const endTime = (this._timeLimit === null) ? Number.MAX_VALUE : (Date.now() + this._timeLimit);
		let iterCount = 0;

		for (const v of this._pro.variables()) {
			if (v.isEmpty()) v.assign(v.domain().at(0));
		}

		const canList = new AssignmentList();

		while (true) {
			const vc = this._pro.violatingConstraints();
			if ((this._targetDeg ?? 1) <= this._pro.satisfiedConstraintRate()) {  // Success if violation rate improves from specified
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
	setRandomness(flag) {
		this.#isRandom = flag;
	}

}
