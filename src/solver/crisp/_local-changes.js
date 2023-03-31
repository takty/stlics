/**
 * Class implements the local changes method.
 *
 * @author Takuto Yanagida
 * @version 2023-03-31
 */

class LocalChanges extends Solver {

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
		return 'Local Changes';
	}

	#createNewV3(V1_V2, v, val) {
		const newV3 = new Set();
		const cs    = new Set();
		const temp  = [];

		for (const va of V1_V2) {
			this._pro.constraintsBetween(v, va, temp);
			for (const c of temp) cs.add(c);
		}
		const origVal = v.value();  // Save the value.
		v.assign(val);

		for (const c of cs) {
			if (c.isSatisfied() === 0) {
				for (let i = 0; i < c.size(); ++i) {
					newV3.add(c.at(i));
				}
			}
		}
		v.assign(origVal);  // Restore the value.
		newV3.delete(v);
		return newV3;
	}

	#isConsistent(A, v, val) {
		const cs   = new Set();
		const temp = [];

		for (const va of A) {
			this._pro.constraintsBetween(v, va, temp);
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

	#lcValue(V1, V2, v, val) {
		if (!this.#isConsistent(V1, v, val)) {
			return false;
		}
		const V1_V2 = LocalChanges.#setPlusSet(V1, V2);
		if (this.#isConsistent(V1_V2, v, val)) {
			return true;
		}
		const V3 = this.#createNewV3(V1_V2, v, val);

		const T = LocalChanges.#setMinusSet(V1_V2, V3);
		if (!this.#isConsistent(T, v, val)) {
			if (this._debug) console.log('bug');
		}

		for (const vv of V3) {
			vv.clear();
		}
		V1 = LocalChanges.#setPlusElement(V1, v);
		V2 = LocalChanges.#setMinusSet(V2, V3);
		return this.#lcVariables(V1, V2, V3);
	}

	#lcVariable(V1, V2, v, d) {
		if (d.size === 0) {
			return false;
		}
		const val = d.values().next().value;
		const  al = AssignmentList.fromVariables(V2);
		v.assign(val);

		const ret = this.#lcValue(V1, V2, v, val);
		if (ret || this.#globalReturn) {
			return ret;
		}

		v.clear();
		al.apply();

		return this.#lcVariable(V1, V2, v, LocalChanges.#setMinusElement(d, val));
	}

	#lcVariables(V1, V2, V3) {
		if (this._debug) {
			console.log(`V1 ${V1.size}, V2' ${V2.size}, V3' ${V3.size}`);
		}
		if ((this._targetDeg ?? 1) <= this._pro.satisfiedConstraintRate()) {  // Success if violation rate improves from specified
			if (this._debug) console.log('stop: current degree is above the target');
			this.#globalReturn = true;
			return true;
		}
		if (this._iterLimit && this._iterLimit < this.#iterCount++) {  // Failure if repeated a specified number
			if (this._debug) console.log('stop: number of iterations has reached the limit');
			this.#globalReturn = true;
			return false;
		}
		if (this.#endTime < Date.now()) {  // Failure if time limit is exceeded
			if (this._debug) console.log('stop: time limit has been reached');
			this.#globalReturn = true;
			return false;
		}

		if (V3.size === 0) {
			return true;
		}
		const v    = V3.values().next().value;
		const dom  = v.domain();
		const d    = new Set();
		for (let i = 0; i < dom.size(); ++i) {
			d.add(dom.at(i));
		}

		const ret = this.#lcVariable(V1, V2, v, d);
		if (!ret || this.#globalReturn) {
			return ret;
		}
		V2 = LocalChanges.#setPlusElement(V2, v);
		V3 = LocalChanges.#setMinusElement(V3, v);
		return this.#lcVariables(V1, V2, V3);
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
