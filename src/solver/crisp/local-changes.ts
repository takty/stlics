/**
 * Class implements the local changes method.
 * The implementation is optimized by converting recursive calls to loops.
 *
 * @author Takuto Yanagida
 * @version 2025-01-23
 */

import { Variable } from '../../problem/variable';
import { Constraint } from '../../problem/constraint';
import { AssignmentList } from '../misc/assignment-list';
import { Solver } from '../solver';

export class LocalChanges extends Solver {

	#globalRet!: boolean;

	/**
	 * Generates a solver.
	 */
	constructor() {
		super();
	}

	/**
	 * {@override}
	 */
	override name(): string {
		return 'Local Changes';
	}

	/**
	 * {@override}
	 */
	protected override preprocess(): void {
		if (this.pro.emptySize() === 0) {
			this.pro.clearAllVariables();
		}
		this.#globalRet = false;

		this.monitor.initialize();
	}

	/**
	 * {@override}
	 */
	protected override exec(): boolean {
		const notFixed   = new Set<Variable>();
		const unassigned = new Set<Variable>();
		for (const x of this.pro.variables()) {
			(!x.isEmpty() ? notFixed : unassigned).add(x);
		}

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
		X2 = new Set(X2);  // Clone
		X3 = new Set(X3);  // Clone

		while (true) {
			this.monitor.outputDebugString(`X1 ${X1.size}, X2' ${X2.size}, X3' ${X3.size}`);

			const r: boolean | null = this.monitor.check(this.pro.degree());
			if (r !== null) {
				this.#globalRet = true;
				return r;
			}
			if (0 === X3.size) {
				return true;
			}
			const x = X3.values().next().value as Variable;
			const ret: boolean = this.#lcVariable(X1, X2, x);

			if (!ret || this.#globalRet) {
				return ret;
			}
			X2.add(x);
			X3.delete(x);
		}
	}

	#lcVariable(X1: Set<Variable>, X2: Set<Variable>, x: Variable): boolean {
		for (const v of x.domain()) {
			const al: AssignmentList = AssignmentList.fromVariables(X2);
			x.assign(v);

			const ret: boolean = this.#lcValue(X1, X2, x);
			if (ret || this.#globalRet) {
				return ret;
			}
			x.clear();
			al.apply();
		}
		return false;
	}

	#lcValue(X1: Set<Variable>, X2: Set<Variable>, x: Variable): boolean {
		if (!this.#isConsistent(X1, x, x.value())) {
			return false;
		}
		const X12: Set<Variable> = X1.union(X2);
		if (this.#isConsistent(X12, x, x.value())) {
			return true;
		}
		const X3: Set<Variable> = this.#createX3(X12, x, x.value());

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
			if (c.status() !== 1) {
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
			if (c.status() !== 1) {
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
