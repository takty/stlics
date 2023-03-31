/**
 * Class implements a solver using the breakout method.
 * Solves a problem as a maximum CSP.
 *
 * @author Takuto Yanagida
 * @version 2023-03-31
 */

class Breakout extends Solver {

	#weights;

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
			const v_c   = v.constraints();
			const v_d   = v.domain();

			let nowVio = 0;
			for (const c of v_c) {
				nowVio += (1 - c.isSatisfied()) * this.#weights[c.index()];
			}
			out: for (let i = 0; i < v_d.size(); ++i) {
				const d = v_d.at(i);
				if (v_val === d) continue;
				v.assign(d);
				let diff = nowVio;
				for (const c of v_c) {
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
		for (let i = 0; i < vioCons.length; ++i) {
			const c = vioCons[i];
			for (let j = 0; j < c.size(); ++j) vvs.add(c.at(j));
		}
		return Array.from(vvs);
	}

	exec() {
		const endTime = (this._timeLimit === null) ? Number.MAX_VALUE : (Date.now() + this._timeLimit);
		let iterCount = 0;

		for (const v of this._pro.variables()) {
			if (v.isEmpty()) v.assign(v.domain().at(0));
		}

		const vc      = [];
		const canList = new AssignmentList();

		while (true) {
			this._pro.violatingConstraints(vc);
			if ((this._targetDeg ?? 1) <= this._pro.satisfiedConstraintRate()) {  // Success if violation rate improves from specified
				if (this._debug) console.log('stop: current degree is above the target');
				return true;
			}
			if (this._iterLimit && this._iterLimit < iterCount++) {  // Failure if repeated a specified number
				if (this._debug) console.log('stop: number of iterations has reached the limit');
				return false;
			}
			if (endTime < Date.now()) {  // Failure if time limit is exceeded
				if (this._debug) console.log('stop: time limit has been reached');
				return false;
			}

			if (this._debug) console.log(vc.length + ' violations');
			this.#findCandidates(this.#listViolatingVariables(vc), canList);

			if (0 < canList.size()) {
				const e = canList.arbitraryAssignment();
				e.apply();
				canList.clear();
				if (this._debug) console.log("\t" + e);
			} else {
				for (let i = 0; i < vc.length; ++i) this.#weights[vc[i].index()]++;
				if (this._debug) console.log('breakout');
			}
		}
	}

}
