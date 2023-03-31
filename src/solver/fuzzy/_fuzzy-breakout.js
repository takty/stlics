/**
 * Class implements a solver using the breakout method for fuzzy CSP.
 *
 * @author Takuto Yanagida
 * @version 2023-03-25
 */

class FuzzyBreakout extends Solver {

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
			const v_c   = v.constraints();
			const v_d   = v.domain();

			let nowVio = 0;
			for (const c of v_c) {
				nowVio += (1 - c.satisfactionDegree()) * this.#weights[c.index()];
			}
			out: for (let i = 0; i < v_d.size(); ++i) {
				const d = v_d.at(i);
				if (v_val === d) continue;
				v.assign(d);
				let diff = nowVio;
				for (const c of v_c) {
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
		for (let i = 0; i < worstCons.length; ++i) {
			const c = worstCons[i];
			for (let j = 0; j < c.size(); ++j) wvs.add(c.at(j));
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
		const vc      = [];
		const canList = new AssignmentList();

		const sol = new AssignmentList();

		while (true) {
			const wsd = this._pro.constraintsWithWorstSatisfactionDegree(vc);
			if (this._targetDeg !== null && this._targetDeg <= wsd) {  // Success if the degree improves from specified
				if (this._debug) console.log('stop: current degree is above the target');
				return true;
			}
			if (this._iterLimit && this._iterLimit < iterCount++) {  // Failure if repeated a specified number
				if (this._debug) console.log('stop: number of iterations has reached the limit');
				break;
			}
			if (endTime < Date.now()) {  // Failure if time limit is exceeded
				if (this._debug) console.log('stop: time limit has been reached');
				break;
			}

			if (this._debug) console.log('worst satisfaction degree: ' + wsd);

			if (this.#lastSolDeg < wsd) {
				sol.setProblem(this._pro);
				this.#lastSolDeg = wsd;
				if (foundSolution(sol, this.#lastSolDeg)) {  // Call hook
					return true;
				}
			}

			this.#findCandidates(this.#listWorstVariables(vc), canList);

			if (0 < canList.size()) {
				const e = this.#isRandom ? canList.arbitraryAssignment() : canList.get(0);
				e.apply();
				canList.clear();
				if (this._debug) console.log("\t" + e);
			} else {
				for (let i = 0; i < vc.length; ++i) this.#weights[vc[i].index()]++;
				if (this._debug) console.log("breakout");
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
