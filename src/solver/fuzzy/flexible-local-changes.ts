/**
 * A class that implements the flexible local changes method.
 *
 * @author Takuto Yanagida
 * @version 2024-10-22
 */

import { Constraint } from '../../problem/constraint';
import { AssignmentList } from '../../util/assignment-list';
import { Solver } from '../solver';
import { Problem } from '../../problem/problem';
import { Variable } from '../../problem/variable';

export class FlexibleLocalChanges extends Solver {

	static #setPlusElement<T>(s: Set<T>, e: T): Set<T> {
		const sn = new Set<T>(s);
		sn.add(e);
		return sn;
	}

	static #setMinusElement<T>(s: Set<T>, e: T): Set<T> {
		const sn = new Set<T>(s);
		sn.delete(e);
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

	name(): string {
		return 'Flexible Local Changes';
	}

	#choose(x2: Set<Variable>, cr: Set<Constraint>): Set<Variable> {
		const res = new Map<Variable, number>();

		for (const c of cr) {
			if (!c.isDefined()) {
				continue;
			}
			for (const x of c) {
				if (!res.has(x)) {
					res.set(x, 1);
				} else {
					res.set(x, (res.get(x) ?? 0) + 1);
				}
			}
		}
		const xs: Variable[] = [...x2];
		xs.sort((o1: Variable, o2: Variable): -1 | 0 | 1 => {
			let res1: number = 0;
			let res2: number = 0;
			if (res.has(o1)) res1 = res.get(o1) ?? 0;
			if (res.has(o2)) res2 = res.get(o2) ?? 0;

			if (res1 < res2) return 1;
			if (res1 > res2) return -1;
			return 0;
		});

		const ret = new Set<Variable>();

		for (const x of xs) {
			let remain: boolean = false;
			for (const c of cr) {
				if (c.isDefined()) {
					remain = true;
					break;
				}
			}
			if (!remain) break;
			x.clear();
			ret.add(x);
		}
		return ret;
	}

	#computeHighestAndLowestConsistencyDegree(): void {
		let low: number = 1;
		let high: number = 0;

		for (const x of this._pro.variables()) {
			for (const c of x) {
				const l: number = c.lowestConsistencyDegree();
				const h: number = c.highestConsistencyDegree();
				if (l < low) low = l;
				if (h > high) high = h;
			}
		}
		this.#lb = low;
		this.#lt = high;
	}

	#flcRepair(X1: Set<Variable>, X2: Set<Variable>, xi: Variable, consX1xi: number, consX12: number, cr: Set<Constraint>, rc: number): number {
		const X3p: Set<Variable> = this.#choose(X2, cr);
		const X1p: Set<Variable> = FlexibleLocalChanges.#setPlusElement(X1, xi);
		const X2p: Set<Variable> = X2.difference(X3p);
		return this.#flcVariables(X1p, X2p, X3p, consX1xi, Math.min(consX12, consX1xi), rc);
	}

	#flcVariable(X1: Set<Variable>, X2: Set<Variable>, xi: Variable, consX1: number, consX12: number, rc: number): number {
		let bestCons: number = this.#lb;
		if (xi.domain().size() === 0) {
			return bestCons;
		}
		let bestX2: AssignmentList = AssignmentList.fromVariables(X2);
		let bestDij: number = xi.domain().at(0);

		const x2Store: AssignmentList = AssignmentList.fromVariables(X2);

		for (let j: number = 0; j < xi.domain().size() && bestCons < consX12; ++j) {
			const dij: number = xi.domain().at(j);
			xi.assign(dij);
			const consX1_xi: number = Math.min(consX1, this.#testX1(X1, xi, bestCons, rc));

			if (consX1_xi > Math.max(bestCons, rc)) {
				const crNew = new Set<Constraint>();
				const consX12_xi: number = Math.min(Math.min(consX1_xi, consX12), this.#testX12(X1, X2, xi, consX1_xi, consX12, crNew));

				if (consX12_xi > bestCons) {
					bestCons = consX12_xi;
					bestDij = dij;
					bestX2 = AssignmentList.fromVariables(X2);
				}
				if (crNew.size) {
					const repairCons: number = this.#flcRepair(X1, X2, xi, consX1_xi, consX12, crNew, Math.max(rc, bestCons));
					if (this.#globalReturn !== -1) {
						return bestCons;
					}
					if (repairCons > bestCons) {
						bestCons = repairCons;
						bestDij = dij;
						bestX2 = AssignmentList.fromVariables(X2);
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
		this._debugOutput(`X1 ${X1.size}, X2' ${X2.size}, X3' ${X3.size}`);

		// Success if the degree improves from specified
		if (this._targetDeg !== null && this._targetDeg <= this._pro.worstSatisfactionDegree()) {
			this._debugOutput('stop: current degree is above the target');
			this.#globalReturn = 1;
			return consX12;
		}
		// Failure if repeated a specified number
		if (this._iterLimit && this._iterLimit < this.#iterCount++) {
			this._debugOutput('stop: number of iterations has reached the limit');
			this.#globalReturn = 0;
			return consX12;
		}
		// Failure if time limit is exceeded
		if (this.#endTime < Date.now()) {
			this._debugOutput('stop: time limit has been reached');
			this.#globalReturn = 0;
			return consX12;
		}
		if (X3.size === 0) {
			return consX12;
		}
		const xi = X3.values().next().value as Variable;
		const consX12xi: number = this.#flcVariable(X1, X2, xi, consX1, consX12, rc);

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

	#initTest(X: Set<Variable>, cr: Set<Constraint>): number {
		const cs = new Set<Constraint>();

		for (const x of X) {
			for (const c of x) {
				cs.add(c);  // All variables in X have been assigned.
			}
		}
		let ret: number = 1;
		for (const c of cs) {
			const sd: number = c.satisfactionDegree();
			if (sd === Constraint.UNDEFINED) {
				continue;
			}
			if (sd < ret) {
				ret = sd;
			}
		}
		for (const c of this._pro.constraints()) {
			const cd: number = c.lowestConsistencyDegree();
			if (cd < this.#lt) {
				cr.add(c);
			}
		}
		return ret;
	}

	#testX1(X1: Set<Variable>, xi: Variable, bestCons: number, rc: number): number {
		let cd: number = 1;
		const cs = new Set<Constraint>();

		for (const x of X1) {
		const temp: Constraint[] = this._pro.constraintsBetween(x, xi);
			for (const c of temp) {
				cs.add(c);
			}
		}
		for (const c of cs) {
			const d: number = c.satisfactionDegree();
			if (d === Constraint.UNDEFINED) {
				continue;
			}
			if (d < cd) {
				cd = d;
			}
			// If it is determined that a better solution than the current solution cannot be obtained
			if (cd <= bestCons || cd <= rc) {
				return cd;
			}
		}
		return cd;
	}

	#testX12(X1: Set<Variable>, X2: Set<Variable>, xi: Variable, consX1xi: number, consX12: number, cr: Set<Constraint>): number {
		let csd: number = 1;
		const cs = new Set<Constraint>();

		for (const x of X1) {
			const temp: Constraint[] = this._pro.constraintsBetween(x, xi);
			for (const c of temp) {
				cs.add(c);
			}
		}
		for (const x of X2) {
			const temp: Constraint[] = this._pro.constraintsBetween(x, xi);
			for (const c of temp) {
				cs.add(c);
			}
		}
		for (const c of cs) {
			const sd: number = c.satisfactionDegree();
			if (sd === Constraint.UNDEFINED) {
				continue;
			}
			if (sd < csd) {
				csd = sd;
			}
		}
		for (const c of cs) {
			const sd: number = c.satisfactionDegree();
			if (sd === Constraint.UNDEFINED) {
				continue;
			}
			if (sd < consX1xi || sd < consX12) {
				cr.add(c);
			}
		}
		return csd;
	}

	exec(): boolean {
		this.#endTime = (this._timeLimit === null) ? Number.MAX_VALUE : (Date.now() + this._timeLimit);
		this.#iterCount = 0;
		this.#globalReturn = -1;

		const wsd: number = this._pro.worstSatisfactionDegree();
		if (this._pro.emptyVariableSize() === 0) {
			this._pro.clearAllVariables();
		}
		const X1 = new Set<Variable>();
		const X2 = new Set<Variable>();  // Currently assigned variables.
		const X3 = new Set<Variable>();  // Currently unassigned variables.
		for (const x of this._pro.variables()) {
			(!x.isEmpty() ? X2 : X3).add(x);
		}

		const cr = new Set<Constraint>();
		const initCons: number = this.#initTest(X2, cr);
		let rc;
		let initSol: AssignmentList | null = null;

		if (X3.size === 0) {
			rc = initCons;
			initSol = AssignmentList.fromVariables(X2);
		} else {
			rc = this.#lb;
		}
		const X3p: Set<Variable> = this.#choose(X2, cr).union(X3);
		const X2p: Set<Variable> = X2.difference(X3p);
		let result: number = this.#flcVariables(X1, X2p, X3p, this.#lt, this.#lt, rc);
		if (result < rc) {
			if (initSol !== null) {
				initSol.apply();
			}
		}
		result = this._pro.worstSatisfactionDegree();
		return result > wsd && result > 0 && (this.#globalReturn !== 0 || this._targetDeg === null);
	}

}