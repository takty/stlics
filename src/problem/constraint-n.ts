/**
 * The class represents an n-ary constraint.
 * The constructor is not called directly, since it is created by the Problem.
 *
 * @author Takuto Yanagida
 * @version 2025-01-16
 */

import { Constraint } from './constraint';
import { Relation } from './relation';
import { Variable } from './variable';

export class ConstraintN extends Constraint {

	#xs: Variable[];
	#vs: number[];  // For reuse.

	// Called only from Problem.
	constructor(r: Relation, ...xs: Variable[]) {
		super(r);
		this.#xs = [...xs];
		this.#vs = new Array(this.#xs.length);
	}

	/**
	 * {@override}
	 */
	size(): number {
		return this.#xs.length;
	}

	/**
	 * {@override}
	 */
	at(index: number): Variable | undefined {
		return this.#xs.at(index);
	}

	/**
	 * {@override}
	 */
	has(x: Variable): boolean {
		return this.#xs.includes(x);
	}

	/**
	 * {@override}
	 */
	indexOf(x: Variable): number {
		return this.#xs.indexOf(x);
	}

	/**
	 * {@override}
	 */
	neighbors(): Constraint[] {
		const cs: Constraint[] = [];

		for (const x of this.#xs) {
			for (const c of x) {
				if (c !== this) {
					cs.push(c);
				}
			}
		}
		return cs;
	}

	/**
	 * {@override}
	 */
	[Symbol.iterator](): Iterator<Variable> {
		return this.#xs[Symbol.iterator]();
	}


	// -------------------------------------------------------------------------


	/**
	 * {@override}
	 */
	emptyVariableSize(): number {
		let n: number = 0;

		for (const x of this.#xs) {
			n += x.isEmpty() ? 1 : 0;
		}
		return n;
	}

	/**
	 * {@override}
	 */
	isDefined(): boolean {
		for (const x of this.#xs) {
			if (x.isEmpty()) {
				return false;
			}
		}
		return true;
	}

	/**
	 * {@override}
	 */
	isSatisfied(): -1 | 0 | 1 {
		for (let i: number = 0; i < this.#xs.length; ++i) {
			const x: Variable = this.#xs[i];
			if (x.isEmpty()) {
				return Constraint.UNDEFINED;
			}
			this.#vs[i] = x.value();
		}
		return this.rel.isSatisfied(...this.#vs) ? 1 : 0;
	}

	/**
	 * {@override}
	 */
	degree(): number {
		for (let i: number = 0; i < this.#xs.length; ++i) {
			const x: Variable = this.#xs[i];
			if (x.isEmpty()) {
				return Constraint.UNDEFINED;
			}
			this.#vs[i] = x.value();
		}
		return this.rel.degree(...this.#vs);
	}

}
