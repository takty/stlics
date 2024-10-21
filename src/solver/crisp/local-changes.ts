/**
 * Class implements the local changes method.
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

export class LocalChanges extends Solver {

	static #setPlusSet<T>(s1: Set<T>, s2: Set<T>): Set<T> {
		const sn = new Set(s1);
		for (const v of s2) sn.add(v);
		return sn;
	}

	static #setMinusSet<T>(s1: Set<T>, s2: Set<T>): Set<T> {
		const sn = new Set(s1);
		for (const v of s2) sn.delete(v);
		return sn;
	}

	static #setPlusElement<T>(s: Set<T>, e: T): Set<T> {
		const sn = new Set(s);
		sn.add(e);
		return sn;
	}

	static #setMinusElement<T>(s: Set<T>, e: T): Set<T> {
		const sn = new Set(s);
		sn.delete(e);
		return sn;
	}

	#iterCount: number = 0;
	#endTime: number = 0;
	#globalReturn: boolean = false;

	constructor(p: Problem, unassignAll: boolean = false) {
		super(p);
		if (unassignAll) {
			this._pro.clearAllVariables();
		}
	}

	name(): string {
		return 'Local Changes';
	}

	#createNewV3(V1_V2: Set<Variable>, v: Variable, val: number): Set<Variable> {
		const newV3 = new Set<Variable>();
		const cs    = new Set<Constraint>();

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

	#isConsistent(A: Set<Variable>, v: Variable, val: number) {
		const cs = new Set<Constraint>();

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

	#lcValue(V1: Set<Variable>, V2: Set<Variable>, v: Variable, val: number): boolean {
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
			this._debugOutput('bug');
		}

		for (const vv of V3) {
			vv.clear();
		}
		V1 = LocalChanges.#setPlusElement(V1, v);
		V2 = LocalChanges.#setMinusSet(V2, V3);
		return this.#lcVariables(V1, V2, V3);
	}

	#lcVariable(V1: Set<Variable>, V2: Set<Variable>, v: Variable, d: Set<number>): boolean {
		if (d.size === 0) {
			return false;
		}
		const val = d.values().next().value as number;
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

	#lcVariables(V1: Set<Variable>, V2: Set<Variable>, V3: Set<Variable>): boolean {
		this._debugOutput(`V1 ${V1.size}, V2' ${V2.size}, V3' ${V3.size}`);

		if ((this._targetDeg ?? 1) <= (this._pro as CrispProblem).satisfiedConstraintRate()) {  // Success if violation rate improves from specified
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
		const v = V3.values().next().value as Variable;
		const d = new Set<number>();
		for (const val of v.domain()) {
			d.add(val);
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
		const notFixed   = new Set<Variable>();
		const unassigned = new Set<Variable>();
		for (const v of this._pro.variables()) {
			(!v.isEmpty() ? notFixed : unassigned).add(v);
		}
		return this.#lcVariables(new Set(), notFixed, unassigned);
	}

}
