/**
 * The class represents an unary constraint.
 * The constructor is not called directly, since it is created by the Problem.
 *
 * @author Takuto Yanagida
 * @version 2024-12-17
 */

import { Constraint } from './constraint';
import { Relation } from './relation';
import { Variable } from './variable';

export class Constraint1 extends Constraint {

	#xs: [Variable] = [] as unknown as [Variable];

	// Called only from Problem.
	constructor(r: Relation, x: Variable) {
		super(r);
		this.#xs = [x];
	}

	/**
	 * {@override}
	 */
	size(): number {
		return 1;
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
	has(x: Variable) {
		return x === this.#xs[0];
	}

	/**
	 * {@override}
	 */
	indexOf(x: Variable): number {
		return (x === this.#xs[0]) ? 0 : -1;
	}

	/**
	 * {@override}
	 */
	neighbors(): Constraint[] {
		const cs: Constraint[] = [];

		for (const c of this.#xs[0]) {
			if (c !== this) {
				cs.push(c);
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
		return this.#xs[0].isEmpty() ? 1 : 0;
	}

	/**
	 * {@override}
	 */
	isDefined(): boolean {
		return !this.#xs[0].isEmpty();
	}

	/**
	 * {@override}
	 */
	isSatisfied(): -1 | 0 | 1 {
		if (this.#xs[0].isEmpty()) {
			return Constraint.UNDEFINED;
		}
		return this.rel.isSatisfied(this.#xs[0].value()) ? 1 : 0;
	}

	/**
	 * {@override}
	 */
	degree(): number {
		if (this.#xs[0].isEmpty()) {
			return Constraint.UNDEFINED;
		}
		return this.rel.degree(this.#xs[0].value());
	}

	/**
	 * {@override}
	 */
	highestConsistencyDegree(): number {
		const d: number = this.degree();
		if (d !== Constraint.UNDEFINED) {
			return d;
		}
		let cd: number = 0;
		const fn = (v: number): boolean => {
			const d: number = this.rel.degree(v);
			if (d > cd) {
				cd = d;
			}
			return (cd === 1);
		}
		for (const v of this.#xs[0].domain()) {
			if (fn(v)) break;
		}
		return cd;
	}

	/**
	 * {@override}
	 */
	lowestConsistencyDegree(): number {
		const d: number = this.degree();
		if (d !== Constraint.UNDEFINED) {
			return d;
		}
		let cd: number = 1;
		const fn = (v: number): boolean => {
			const d: number = this.rel.degree(v);
			if (d < cd) {
				cd = d;
			}
			return (cd === 0);
		}
		for (const v of this.#xs[0].domain()) {
			if (fn(v)) break;
		}
		return cd;
	}

}
