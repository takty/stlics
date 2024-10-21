/**
 * A class that implements the flexible local changes method.
 * The implementation is optimized by converting recursive calls to loops.
 *
 * @author Takuto Yanagida
 * @version 2023-04-11
 */

import { Constraint } from '../../problem/constraint';
import { AssignmentList } from '../../util/assignment-list';
import { Solver } from '../solver';
import { Problem } from '../../problem/problem';
import { Variable } from '../../problem/variable';

export class FlexibleLocalChangesEx extends Solver {

	static #setPlusSet<T>(s1: Set<T>, s2: Set<T>) {
		const sn = new Set(s1);
		for (const v of s2) sn.add(v);
		return sn;
	}

	static #setMinusSet<T>(s1: Set<T>, s2: Set<T>) {
		const sn = new Set(s1);
		for (const v of s2) sn.delete(v);
		return sn;
	}

	static #setPlusElement<T>(s: Set<T>, e: T) {
		const sn = new Set(s);
		sn.add(e);
		return sn;
	}

	#lt: number = 0;
	#lb: number = 0;

	#iterCount: number = 0;
	#endTime: number = 0;
	#globalReturn: number = 0;

	constructor(p: Problem) {
		super(p);
		this.#computeHighestAndLowestConsistencyDegree();
	}

	name() {
		return 'Flexible Local Changes Ex';
	}

	#choose(x2: Set<Variable>, cr: Set<Constraint>): Set<Variable> {
		const res = new Map();

		for (const c of cr) {
			if (!c.isDefined()) {
				continue;
			}
			for (const v of c) {
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

		const ret = new Set<Variable>();

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
			for (const c of v) {
				const l = c.lowestConsistencyDegree();
				const h = c.highestConsistencyDegree();
				if (l < low)  low  = l;
				if (h > high) high = h;
			}
		}
		this.#lb = low;
		this.#lt = high;
	}

	#flcRepair(X1: Set<Variable>, X2: Set<Variable>, xi: Variable, consX1xi: number, consX12: number, cr: Set<Constraint>, rc: number): number {
		const X3p = this.#choose(X2, cr);
		const X1p = FlexibleLocalChangesEx.#setPlusElement(X1, xi);
		const X2p = FlexibleLocalChangesEx.#setMinusSet(X2, X3p);
		return this.#flcVariables(X1p, X2p, X3p, consX1xi, Math.min(consX12, consX1xi), rc);
	}

	#flcVariable(X1: Set<Variable>, X2: Set<Variable>, xi: Variable, consX1: number, consX12: number, rc: number): number {
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
				const crNew = new Set<Constraint>();
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

	#flcVariables(X1: Set<Variable>, X2: Set<Variable>, X3: Set<Variable>, consX1: number, consX12: number, rc: number): number {
		X2 = new Set<Variable>(X2);  // Clone
		X3 = new Set<Variable>(X3);  // Clone

		while (true) {
			this._debugOutput(`X1 ${X1.size}, X2' ${X2.size}, X3' ${X3.size}`);

			if (this._targetDeg !== null && this._targetDeg <= this._pro.worstSatisfactionDegree()) {  // Success if the degree improves from specified
				this._debugOutput('stop: current degree is above the target');
				this.#globalReturn = 1;
				return consX12;
			}
			if (this._iterLimit && this._iterLimit < this.#iterCount++) {  // Failure if repeated a specified number
				this._debugOutput('stop: number of iterations has reached the limit');
				this.#globalReturn = 0;
				return consX12;
			}
			if (this.#endTime < Date.now()) {  // Failure if time limit is exceeded
				this._debugOutput('stop: time limit has been reached');
				this.#globalReturn = 0;
				return consX12;
			}
			if (X3.size === 0) {
				return consX12;
			}
			const xi        = X3.values().next().value as Variable;
			const consX12xi = this.#flcVariable(X1, X2, xi, consX1, consX12, rc);

			if (this.#globalReturn !== -1) {
				return consX12;
			}
			if (consX12xi < rc) {
				return this.#lb;
			}
			X2.add(xi);
			X3.delete(xi);
			consX12 = consX12xi;
		}
	}

	#initTest(X: Set<Variable>, cr: Set<Constraint>): number {
		const cs = new Set<Constraint>();
		for (const v of X) {
			for (const c of v) {
				cs.add(c);  // All variables in X have been assigned.
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

	#testX1(X1: Set<Variable>, xi: Variable, bestCons: number, rc: number): number {
		let cd = 1;
		const cs = new Set<Constraint>();

		for (const v of X1) {
			const temp = this._pro.constraintsBetween(v, xi);
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

	#testX12(X1: Set<Variable>, X2: Set<Variable>, xi: Variable, consX1xi: number, consX12: number, cr: Set<Constraint>) {
		let csd = 1;
		const cs = new Set<Constraint>();

		for (const v of X1) {
			const temp = this._pro.constraintsBetween(v, xi);
			for (const c of temp) cs.add(c);
		}
		for (const v of X2) {
			const temp = this._pro.constraintsBetween(v, xi);
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

	exec(): boolean {
		this.#endTime      = (this._timeLimit === null) ? Number.MAX_VALUE : (Date.now() + this._timeLimit);
		this.#iterCount    = 0;
		this.#globalReturn = -1;

		const wsd = this._pro.worstSatisfactionDegree();
		if (this._pro.emptyVariableSize() === 0) {
			this._pro.clearAllVariables();
		}
		const X1 = new Set<Variable>();
		const X2 = new Set<Variable>();  // Currently assigned variables.
		const X3 = new Set<Variable>();  // Currently unassigned variables.
		for (const v of this._pro.variables()) {
			(!v.isEmpty() ? X2 : X3).add(v);
		}

		const cr       = new Set<Constraint>();
		const initCons = this.#initTest(X2, cr);
		let rc;
		let initSol: AssignmentList|null = null;

		if (X3.size === 0) {
			rc      = initCons;
			initSol = AssignmentList.fromVariables(X2);
		} else {
			rc = this.#lb;
		}
		const X3p = FlexibleLocalChangesEx.#setPlusSet(this.#choose(X2, cr), X3);
		const X2p = FlexibleLocalChangesEx.#setMinusSet(X2, X3p);
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
