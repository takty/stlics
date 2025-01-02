/**
 * Class implements the local changes method.
 *
 * @author Takuto Yanagida
 * @version 2025-01-03
 */

import { Problem } from '../../problem/problem';
import { Variable } from '../../problem/variable';
import { Constraint } from '../../problem/constraint';
import { AssignmentList } from '../misc/assignment-list';
import { Solver } from '../solver';

export class LocalChanges extends Solver {

	#globalReturn: boolean = false;

	constructor(p: Problem) {
		super(p);
	}

	name(): string {
		return 'Local Changes';
	}

	exec(): boolean {
		if (this.pro.emptyVariableSize() === 0) {
			this.pro.clearAllVariables();
		}
		this.#globalReturn = false;

		const notFixed   = new Set<Variable>();
		const unassigned = new Set<Variable>();
		for (const x of this.pro.variables()) {
			(!x.isEmpty() ? notFixed : unassigned).add(x);
		}

		this.monitor.initialize();

		const sol: AssignmentList = new AssignmentList();
		const ret: boolean        = this.#lcVariables(new Set(), notFixed, unassigned);

		const ev: number = this.pro.ratio();
		this.monitor.outputDebugString(`Evaluation: ${ev}`);

		if (ret) {
			sol.setProblem(this.pro);

			if (this.monitor.solutionFound(sol, ev)) {
				return true;
			}
		}
		return ret;
}

	#lcVariables(X1: Set<Variable>, X2: Set<Variable>, X3: Set<Variable>): boolean {
		{
			this.monitor.outputDebugString(`X1 ${X1.size}, X2' ${X2.size}, X3' ${X3.size}`);

			const r: boolean | null = this.monitor.check(this.pro.degree());
			if (r !== null) {
				this.#globalReturn = true;
				return r;
			}
			if (X3.size === 0) {
				return true;
			}
			const x = X3.values().next().value as Variable;
			const ret: boolean = this.#lcVariable(X1, X2, x, cloneDomain(x));

			if (!ret || this.#globalReturn) {
				return ret;
			}
			X2 = cloneAndAdd(X2, x);
			X3 = cloneAndDelete(X3, x);
			return this.#lcVariables(X1, X2, X3);
		}
	}

	#lcVariable(X1: Set<Variable>, X2: Set<Variable>, x: Variable, d: Set<number>): boolean {
		if (d.size) {
			const v = d.values().next().value as number;
			const al: AssignmentList = AssignmentList.fromVariables(X2);
			x.assign(v);

			const ret: boolean = this.#lcValue(X1, X2, x, v);
			if (ret || this.#globalReturn) {
				return ret;
			}
			x.clear();
			al.apply();
			return this.#lcVariable(X1, X2, x, cloneAndDelete(d, v));
		}
		return false;
	}

	#lcValue(X1: Set<Variable>, X2: Set<Variable>, x: Variable, v: number): boolean {
		if (!this.#isConsistent(X1, x, v)) {
			return false;
		}
		const X12: Set<Variable> = X1.union(X2);
		if (this.#isConsistent(X12, x, v)) {
			return true;
		}
		const X3: Set<Variable> = this.#createX3(X12, x, v);
		X1 = cloneAndAdd(X1, x);
		X2 = X2.difference(X3);
		return this.#lcVariables(X1, X2, X3);
	}

	#isConsistent(A: Set<Variable>, x: Variable, v: number): boolean {
		const cs = new Set<Constraint>();

		for (const xa of A) {
			const temp: Constraint[] = this.pro.constraintsBetween(x, xa);
			for (const c of temp) {
				cs.add(c);
			}
		}
		const origV: number = x.value();  // Save the value.
		x.assign(v);

		for (const c of cs) {
			if (c.isSatisfied() !== 1) {
				x.assign(origV);  // Restore the value.
				return false;
			}
		}
		x.assign(origV);  // Restore the value.
		return true;
	}

	#createX3(X12: Set<Variable>, x: Variable, v: number): Set<Variable> {
		const newX3 = new Set<Variable>();
		const cs    = new Set<Constraint>();

		for (const xa of X12) {
			for (const c of this.pro.constraintsBetween(x, xa)) {
				cs.add(c);
			}
		}
		const origV: number = x.value();  // Save the value.
		x.assign(v);

		for (const c of cs) {
			if (c.isSatisfied() !== 1) {
				for (const xi of c) {
					newX3.add(xi);
				}
			}
		}
		x.assign(origV);  // Restore the value.
		newX3.delete(x);
		return newX3;
	}

}

function cloneAndAdd<T>(s: Set<T>, e: T): Set<T> {
	return new Set<T>(s).add(e);
}

function cloneAndDelete<T>(s: Set<T>, e: T): Set<T> {
	const sn = new Set<T>(s);
	sn.delete(e);
	return sn;
}

function cloneDomain(x: Variable): Set<number> {
	return new Set<number>(x.domain());
}
