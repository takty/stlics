/**
 * Class implements the local changes method.
 * The implementation is optimized by converting recursive calls to loops.
 *
 * @author Takuto Yanagida
 * @version 2023-04-16
 */

import { AssignmentList } from '../../util/assignment-list.js';
import { Solver } from '../solver.js';

export class LocalChangesEx extends Solver {

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

	#iterCount;
	#endTime;
	#globalReturn;

	constructor(p, unassignAll = false) {
		super(p);
		if (unassignAll) {
			this._pro.clearAllVariables();
		}
	}

	name() {
		return 'Local Changes Ex';
	}

	#createNewV3(V1_V2, v, val) {
		const newV3 = new Set();
		const cs    = new Set();

		for (const va of V1_V2) {
			const temp = this._pro.constraintsBetween(v, va);
			for (const c of temp) cs.add(c);
		}
		const origVal = v.value();  // Save the value.
		v.assign(val);

		for (const c of cs) {
			if (c.isSatisfied() === 0) {
				for (const vi of c) {
					newV3.add(vi);
				}
			}
		}
		v.assign(origVal);  // Restore the value.
		newV3.delete(v);
		return newV3;
	}

	#isConsistent(A, v, val) {
		const cs = new Set();

		for (const va of A) {
			const temp = this._pro.constraintsBetween(v, va);
			for (const c of temp) cs.add(c);
		}
		const origVal = v.value();  // Save the value.
		v.assign(val);

		for (const c of cs) {
			if (c.isSatisfied() === 0) {
				v.assign(origVal);  // Restore the value.
				return false;
			}
		}
		v.assign(origVal);  // Restore the value.
		return true;
	}

	#lcValue(V1, V2, v) {
		if (!this.#isConsistent(V1, v, v.value())) {
			return false;
		}
		const V1_V2 = LocalChangesEx.#setPlusSet(V1, V2);
		if (this.#isConsistent(V1_V2, v, v.value())) {
			return true;
		}
		const V3 = this.#createNewV3(V1_V2, v, v.value());

		V2 = LocalChangesEx.#setMinusSet(V2, V3);
		V1 = LocalChangesEx.#setPlusElement(V1, v);
		return this.#lcVariables(V1, V2, V3);
	}

	#lcVariable(V1, V2, v) {
		for (const val of v.domain()) {
			const s = AssignmentList.fromVariables(V2);
			v.assign(val);

			const ret = this.#lcValue(V1, V2, v);
			if (ret || this.#globalReturn) {
				return ret;
			}

			v.clear();
			s.apply();
		}
		return false;
	}

	#lcVariables(V1, V2, V3) {
		V2 = new Set(V2);  // Clone
		V3 = new Set(V3);  // Clone

		while (true) {
			this._debugOutput(`V1 ${V1.size}, V2' ${V2.size}, V3' ${V3.size}`);

			if ((this._targetDeg ?? 1) <= this._pro.satisfiedConstraintRate()) {  // Success if violation rate improves from specified
				this._debugOutput('stop: current degree is above the target');
				this.#globalReturn = true;
				return true;
			}
			if (this._iterLimit && this._iterLimit < this.#iterCount++) {  // Failure if repeated a specified number
				this._debugOutput('stop: number of iterations has reached the limit');
				this.#globalReturn = true;
				return false;
			}
			if (this.#endTime < Date.now()) {  // Failure if time limit is exceeded
				this._debugOutput('stop: time limit has been reached');
				this.#globalReturn = true;
				return false;
			}

			if (V3.size === 0) {
				return true;
			}
			const v   = V3.values().next().value;
			const ret = this.#lcVariable(V1, V2, v);

			if (!ret || this.#globalReturn) {
				return ret;
			}
			V2.add(v);
			V3.delete(v);
		}
	}

	exec() {
		this.#endTime      = (this._timeLimit === null) ? Number.MAX_VALUE : (Date.now() + this._timeLimit);
		this.#iterCount    = 0;
		this.#globalReturn = false;

		if (this._pro.emptyVariableSize() === 0) {
			this._pro.clearAllVariables();
		}
		const notFixed   = new Set();
		const unassigned = new Set();
		for (const v of this._pro.variables()) {
			(!v.isEmpty() ? notFixed : unassigned).add(v);
		}
		return this.#lcVariables(new Set(), notFixed, unassigned);
	}

}
