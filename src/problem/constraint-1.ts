/**
 * The class represents an unary constraint.
 * The constructor is not called directly, since it is created by the Problem.
 *
 * @author Takuto Yanagida
 * @version 2023-04-11
 */

import { Constraint } from './constraint';
import { Variable } from './variable';
import { Relation } from './relation';

export class Constraint1 extends Constraint {

	#vars: [Variable] = [] as unknown as [Variable];

	// Called only from Problem.
	constructor(r: Relation, v: Variable) {
		super(r);
		this.#vars = [v];
	}

	/**
	 * {@inheritDoc}
	 */
	size(): number {
		return 1;
	}

	/**
	 * {@inheritDoc}
	 */
	at(index: number): Variable {
		if (index === 0) return this.#vars[0];
		throw new RangeError();
	}

	/**
	 * {@inheritDoc}
	 */
	[Symbol.iterator](): Iterator<Variable> {
		return this.#vars[Symbol.iterator]();
	}

	/**
	 * {@inheritDoc}
	 */
	has(v: Variable) {
		return v === this.#vars[0];
	}

	/**
	 * {@inheritDoc}
	 */
	indexOf(v: Variable) {
		return (v === this.#vars[0]) ? 0 : -1;
	}

	/**
	 * {@inheritDoc}
	 */
	emptyVariableSize() {
		return this.#vars[0].isEmpty() ? 1 : 0;
	}

	/**
	 * {@inheritDoc}
	 */
	isDefined(): boolean {
		return !this.#vars[0].isEmpty();
	}

	/**
	 * {@inheritDoc}
	 */
	isSatisfied(): -1|0|1 {
		if (this.#vars[0].isEmpty()) return Constraint.UNDEFINED;
		return this.crispRelation().isSatisfied(this.#vars[0].value()) ? 1 : 0;
	}

	/**
	 * {@inheritDoc}
	 */
	satisfactionDegree(): number {
		if (this.#vars[0].isEmpty()) return Constraint.UNDEFINED;
		return this.fuzzyRelation().satisfactionDegree(this.#vars[0].value());
	}

	/**
	 * {@inheritDoc}
	 */
	neighbors(): Constraint[] {
		const cs: Constraint[] = [];
		for (const c of this.#vars[0]) {
			if (c !== this as unknown as Constraint) cs.push(c);
		}
		return cs;
	}

	/**
	 * {@inheritDoc}
	 */
	highestConsistencyDegree(): number {
		const sd = this.satisfactionDegree();
		if (sd !== Constraint.UNDEFINED) {
			return sd;
		}
		let cd = 0;

		for (const val of this.#vars[0].domain()) {
			const s = this.fuzzyRelation().satisfactionDegree(val);
			if (s > cd) cd = s;
			if (cd === 1) break;
		}
		return cd;
	}

	/**
	 * {@inheritDoc}
	 */
	lowestConsistencyDegree(): number {
		const sd = this.satisfactionDegree();
		if (sd !== Constraint.UNDEFINED) {
			return sd;
		}
		let cd = 1;

		for (const val of this.#vars[0].domain()) {
			const s = this.fuzzyRelation().satisfactionDegree(val);
			if (s < cd) cd = s;
			if (cd === 0) break;
		}
		return cd;
	}

}
