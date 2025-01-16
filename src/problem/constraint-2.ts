/**
 * The class represents an binary constraint.
 * The constructor is not called directly, since it is created by the Problem.
 *
 * @author Takuto Yanagida
 * @version 2025-01-16
 */

import { Constraint } from './constraint';
import { Relation } from './relation';
import { Variable } from './variable';

export class Constraint2 extends Constraint {

	#xs: [Variable, Variable] = [] as unknown as [Variable, Variable];

	// Called only from Problem.
	constructor(r: Relation, x1: Variable, x2: Variable) {
		super(r);
		this.#xs = [x1, x2];
	}

	/**
	 * {@override}
	 */
	size(): number {
		return 2;
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
		return this.#xs[0] === x || this.#xs[1] === x;
	}

	/**
	 * {@override}
	 */
	indexOf(x: Variable): number {
		if (x === this.#xs[0]) return 0;
		if (x === this.#xs[1]) return 1;
		return -1;
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

		if (this.#xs[0].isEmpty()) ++n;
		if (this.#xs[1].isEmpty()) ++n;
		return n;
	}

	/**
	 * {@override}
	 */
	isDefined(): boolean {
		return !this.#xs[0].isEmpty() && !this.#xs[1].isEmpty();
	}

	/**
	 * {@override}
	 */
	isSatisfied(): -1 | 0 | 1 {
		if (this.#xs[0].isEmpty() || this.#xs[1].isEmpty()) {
			return Constraint.UNDEFINED;
		}
		return this.rel.isSatisfied(this.#xs[0].value(), this.#xs[1].value()) ? 1 : 0;
	}

	/**
	 * {@override}
	 */
	degree(): number {
		if (this.#xs[0].isEmpty() || this.#xs[1].isEmpty()) {
			return Constraint.UNDEFINED;
		}
		return this.rel.degree(this.#xs[0].value(), this.#xs[1].value());
	}

}
