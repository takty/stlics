/**
 * Class implements the local changes method.
 * The implementation is optimized by converting recursive calls to loops.
 *
 * @author Takuto Yanagida
 * @version 2024-10-22
 */

import { Problem } from '../../problem/problem';
import { CrispProblem } from '../../problem/problem-crisp';
import { Variable } from '../../problem/variable';
import { Constraint } from '../../problem/constraint';
import { AssignmentList } from '../../util/assignment-list';
import { Solver } from '../solver';

export class LocalChangesEx extends Solver {

	static #setPlusElement<T>(s: Set<T>, e: T): Set<T> {
		return new Set(s).add(e);
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
		return 'Local Changes Ex';
	}

	#createNewV3(X1_X2: Set<Variable>, x: Variable, v: number): Set<Variable> {
		const newX3 = new Set<Variable>();
		const cs = new Set<Constraint>();

		for (const xa of X1_X2) {
			const temp: Constraint[] = this._pro.constraintsBetween(x, xa);
			for (const c of temp) {
				cs.add(c);
			}
		}
		const origV: number = x.value();  // Save the value.
		x.assign(v);

		for (const c of cs) {
			if (c.isSatisfied() === 0) {
				for (const xi of c) {
					newX3.add(xi);
				}
			}
		}
		x.assign(origV);  // Restore the value.
		newX3.delete(x);
		return newX3;
	}

	#isConsistent(A: Set<Variable>, x: Variable, v: number): boolean {
		const cs = new Set<Constraint>();

		for (const xa of A) {
			const temp: Constraint[] = this._pro.constraintsBetween(x, xa);
			for (const c of temp) {
				cs.add(c);
			}
		}
		const origV: number = x.value();  // Save the value.
		x.assign(v);

		for (const c of cs) {
			if (c.isSatisfied() === 0) {
				x.assign(origV);  // Restore the value.
				return false;
			}
		}
		x.assign(origV);  // Restore the value.
		return true;
	}

	#lcValue(X1: Set<Variable>, X2: Set<Variable>, x: Variable): boolean {
		if (!this.#isConsistent(X1, x, x.value())) {
			return false;
		}
		const X1_X2: Set<Variable> = X1.union(X2);
		if (this.#isConsistent(X1_X2, x, x.value())) {
			return true;
		}
		const X3: Set<Variable> = this.#createNewV3(X1_X2, x, x.value());

		X1 = LocalChangesEx.#setPlusElement(X1, x);
		X2 = X2.difference(X3);
		return this.#lcVariables(X1, X2, X3);
	}

	#lcVariable(X1: Set<Variable>, X2: Set<Variable>, x: Variable): boolean {
		for (const v of x.domain()) {
			const al: AssignmentList = AssignmentList.fromVariables(X2);
			x.assign(v);

			const ret: boolean = this.#lcValue(X1, X2, x);
			if (ret || this.#globalReturn) {
				return ret;
			}

			x.clear();
			al.apply();
		}
		return false;
	}

	#lcVariables(X1: Set<Variable>, X2: Set<Variable>, X3: Set<Variable>): boolean {
		X2 = new Set(X2);  // Clone
		X3 = new Set(X3);  // Clone

		while (true) {
			this._debugOutput(`X1 ${X1.size}, X2' ${X2.size}, X3' ${X3.size}`);

			// Success if violation rate improves from specified
			if ((this._targetDeg ?? 1) <= (this._pro as CrispProblem).satisfiedConstraintRate()) {
				this._debugOutput('stop: current degree is above the target');
				this.#globalReturn = true;
				return true;
			}
			// Failure if repeated a specified number
			if (this._iterLimit && this._iterLimit < this.#iterCount++) {
				this._debugOutput('stop: number of iterations has reached the limit');
				this.#globalReturn = true;
				return false;
			}
			// Failure if time limit is exceeded
			if (this.#endTime < Date.now()) {
				this._debugOutput('stop: time limit has been reached');
				this.#globalReturn = true;
				return false;
			}

			if (X3.size === 0) {
				return true;
			}
			const x = X3.values().next().value as Variable;
			const ret: boolean = this.#lcVariable(X1, X2, x);

			if (!ret || this.#globalReturn) {
				return ret;
			}
			X2.add(x);
			X3.delete(x);
		}
	}

	exec(): boolean {
		this.#endTime = (this._timeLimit === null) ? Number.MAX_VALUE : (Date.now() + this._timeLimit);
		this.#iterCount = 0;
		this.#globalReturn = false;

		if (this._pro.emptyVariableSize() === 0) {
			this._pro.clearAllVariables();
		}
		const notFixed = new Set<Variable>();
		const unassigned = new Set<Variable>();
		for (const x of this._pro.variables()) {
			(!x.isEmpty() ? notFixed : unassigned).add(x);
		}
		return this.#lcVariables(new Set(), notFixed, unassigned);
	}

}
