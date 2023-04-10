/**
 * A class that implements the flexible local changes method.
 *
 * @author Takuto Yanagida
 * @version 2023-04-10
 */

class FlexibleLocalChanges extends Solver {

	static #setPlusSet(s1, s2) {
		const sn = new Set(s1);
		for (const v of s2) sn.add(v);
		return sn;
	}

	static #setMinusSet(s1, s2) {
		const sn = new Set(s1);
		for (const v of s2) sn.delete(v);
		return sn;
	}

	static #setPlusElement(s, e) {
		const sn = new Set(s);
		sn.add(e);
		return sn;
	}

	static #setMinusElement(s, e) {
		const sn = new Set(s);
		sn.delete(e);
		return sn;
	}

	#lt;
	#lb;

	#iterCount;
	#endTime;
	#globalReturn;

	constructor(p) {
		super(p);
		this.#computeHighestAndLowestConsistencyDegree();
	}

	name() {
		return 'Flexible Local Changes';
	}

	#choose(x2, cr) {
		const res = new Map();

		for (const c of cr) {
			if (!c.isDefined()) {
				continue;
			}
			for (let i = 0; i < c.size(); ++i) {
				const v = c.at(i);
				if (!res.has(v)) {
					res.set(v, 1);
				} else {
					res.set(v, res.get(v) + 1);
				}
			}
		}
		const vs = [...x2];
		vs.sort((o1, o2) => {
			let res1 = 0;
			let res2 = 0;
			if (res.has(o1)) res1 = res.get(o1);
			if (res.has(o2)) res2 = res.get(o2);

			if (res1 < res2) return 1;
			if (res1 > res2) return -1;
			return 0;
		});

		const ret = new Set();

		for (const v of vs) {
			let remain = false;
			for (const c of cr) {
				if (c.isDefined()) {
					remain = true;
					break;
				}
			}
			if (!remain) break;
			v.clear();
			ret.add(v);
		}
		return ret;
	}

	#computeHighestAndLowestConsistencyDegree() {
		let low  = 1;
		let high = 0;

		for (const v of this._pro.variables()) {
			for (let i = 0; i < v.size(); ++i) {
				const c = v.at(i);

				const l = c.lowestConsistencyDegree();
				const h = c.highestConsistencyDegree();
				if (l < low)  low  = l;
				if (h > high) high = h;
			}
		}
		this.#lb = low;
		this.#lt = high;
	}

	#flcRepair(X1, X2, xi, consX1xi, consX12, cr, rc) {
		const X3p = this.#choose(X2, cr);
		const X1p = FlexibleLocalChanges.#setPlusElement(X1, xi);
		const X2p = FlexibleLocalChanges.#setMinusSet(X2, X3p);
		return this.#flcVariables(X1p, X2p, X3p, consX1xi, Math.min(consX12, consX1xi), rc);
	}

	#flcVariable(X1, X2, xi, consX1, consX12, rc) {
		let bestCons = this.#lb;
		if (xi.domain().size() === 0) {
			return bestCons;
		}
		let bestX2  = AssignmentList.fromVariables(X2);
		let bestDij = xi.domain().at(0);

		const x2Store = AssignmentList.fromVariables(X2);

		for (let j = 0; j < xi.domain().size() && bestCons < consX12; ++j) {
			const dij = xi.domain().at(j);
			xi.assign(dij);
			const consX1_xi = Math.min(consX1, this.#testX1(X1, xi, bestCons, rc));

			if (consX1_xi > Math.max(bestCons, rc)) {
				const crNew = new Set();
				const consX12_xi = Math.min(Math.min(consX1_xi, consX12), this.#testX12(X1, X2, xi, consX1_xi, consX12, crNew));

				if (consX12_xi > bestCons) {
					bestCons = consX12_xi;
					bestDij  = dij;
					bestX2   = AssignmentList.fromVariables(X2);
				}
				if (crNew.size) {
					const repairCons = this.#flcRepair(X1, X2, xi, consX1_xi, consX12, crNew, Math.max(rc, bestCons));
					if (this.#globalReturn !== -1) {
						return bestCons;
					}
					if (repairCons > bestCons) {
						bestCons = repairCons;
						bestDij  = dij;
						bestX2   = AssignmentList.fromVariables(X2);
					}
					x2Store.apply();
				}
			}
		}
		bestX2.apply();
		xi.assign(bestDij);
		return bestCons;
	}

	#flcVariables(X1, X2, X3, consX1, consX12, rc) {
		if (this._debug) {
			console.log(`X1 ${X1.size}, X2' ${X2.size}, X3' ${X3.size}`);
		}
		if (this._targetDeg !== null && this._targetDeg <= this._pro.worstSatisfactionDegree()) {  // Success if the degree improves from specified
			if (this._debug) console.log('stop: current degree is above the target');
			this.#globalReturn = 1;
			return consX12;
		}
		if (this._iterLimit && this._iterLimit < this.#iterCount++) {  // Failure if repeated a specified number
			if (this._debug) console.log('stop: number of iterations has reached the limit');
			this.#globalReturn = 0;
			return consX12;
		}
		if (this.#endTime < Date.now()) {  // Failure if time limit is exceeded
			if (this._debug) console.log('stop: time limit has been reached');
			this.#globalReturn = 0;
			return consX12;
		}
		if (X3.size === 0) {
			return consX12;
		}
		const xi        = X3.values().next().value;
		const consX12xi = this.#flcVariable(X1, X2, xi, consX1, consX12, rc);

		if (this.#globalReturn !== -1) {
			return consX12;
		}
		if (consX12xi < rc) {
			return this.#lb;
		}
		X2 = FlexibleLocalChanges.#setPlusElement(X2, xi);
		X3 = FlexibleLocalChanges.#setMinusElement(X3, xi);
		return this.#flcVariables(X1, X2, X3, consX1, consX12xi, rc);
	}

	#initTest(X, cr) {
		const cs = new Set();
		for (const v of X) {
			for (let i = 0; i < v.size(); ++i) {
				cs.add(v.at(i));  // All variables in X have been assigned.
			}
		}
		let ret = 1;
		for (const c of cs) {
			const sd = c.satisfactionDegree();
			if (sd === Constraint.UNDEFINED) continue;
			if (sd < ret) ret = sd;
		}
		for (const c of this._pro.constraints()) {
			const cd = c.lowestConsistencyDegree();
			if (cd < this.#lt) cr.add(c);
		}
		return ret;
	}

	#testX1(X1, xi, bestCons, rc) {
		let cd = 1;
		const cs   = new Set();
		const temp = [];

		for (const v of X1) {
			this._pro.constraintsBetween(v, xi, temp);
			for (const c of temp) cs.add(c);
		}
		for (const c of cs) {
			const d = c.satisfactionDegree();
			if (d === Constraint.UNDEFINED) continue;
			if (d < cd) cd = d;
			if (cd <= bestCons || cd <= rc) return cd;  // If it is determined that a better solution than the current solution cannot be obtained
		}
		return cd;
	}

	#testX12(X1, X2, xi, consX1xi, consX12, cr) {
		let csd = 1;
		const cs   = new Set();
		const temp = [];

		for (const v of X1) {
			this._pro.constraintsBetween(v, xi, temp);
			for (const c of temp) cs.add(c);
		}
		for (const v of X2) {
			this._pro.constraintsBetween(v, xi, temp);
			for (const c of temp) cs.add(c);
		}
		for (const c of cs) {
			const sd = c.satisfactionDegree();
			if (sd === Constraint.UNDEFINED) continue;
			if (sd < csd) csd = sd;
		}
		for (const c of cs) {
			const sd = c.satisfactionDegree();
			if (sd === Constraint.UNDEFINED) continue;
			if (sd < consX1xi || sd < consX12) cr.add(c);
		}
		return csd;
	}

	exec() {
		this.#endTime      = (this._timeLimit === null) ? Number.MAX_VALUE : (Date.now() + this._timeLimit);
		this.#iterCount    = 0;
		this.#globalReturn = -1;

		const wsd = this._pro.worstSatisfactionDegree();
		if (this._pro.emptyVariableSize() === 0) {
			this._pro.clearAllVariables();
		}
		const X1 = new Set();
		const X2 = new Set();  // Currently assigned variables.
		const X3 = new Set();  // Currently unassigned variables.
		for (const v of this._pro.variables()) {
			(!v.isEmpty() ? X2 : X3).add(v);
		}

		const cr       = new Set();
		const initCons = this.#initTest(X2, cr);
		let rc;
		let initSol = null;

		if (X3.size === 0) {
			rc      = initCons;
			initSol = AssignmentList.fromVariables(X2);
		} else {
			rc = this.#lb;
		}
		const X3p = FlexibleLocalChanges.#setPlusSet(this.#choose(X2, cr), X3);
		const X2p = FlexibleLocalChanges.#setMinusSet(X2, X3p);
		let result = this.#flcVariables(X1, X2p, X3p, this.#lt, this.#lt, rc);
		if (result < rc) {
			if (initSol !== null) {
				initSol.apply();
			}
		}
		result = this._pro.worstSatisfactionDegree();
		return result > wsd && result > 0 && (this.#globalReturn !== 0 || this._targetDeg === null);
	}

}
