/**
 * The class represents an unary constraint.
 * The constructor is not called directly, since it is created by the Problem.
 *
 * @author Takuto Yanagida
 * @version 2023-04-11
 */

import { Constraint } from './constraint.js';

export class Constraint1 extends Constraint {

	#vars = [null];

	// Called only from Problem.
	constructor(r, v) {
		super(r);
		this.#vars[0] = v;
	}

	/**
	 * {@inheritDoc}
	 */
	size() {
		return 1;
	}

	/**
	 * {@inheritDoc}
	 */
	at(index) {
		if (index === 0) return this.#vars[0];
		throw new IndexOutOfBoundsException();
	}

	/**
	 * {@inheritDoc}
	 */
	[Symbol.iterator]() {
		return this.#vars[Symbol.iterator]();
	}

	/**
	 * {@inheritDoc}
	 */
	has(v) {
		return v === this.#vars[0];
	}

	/**
	 * {@inheritDoc}
	 */
	indexOf(v) {
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
	isDefined() {
		return !this.#vars[0].isEmpty();
	}

	/**
	 * {@inheritDoc}
	 */
	isSatisfied() {
		if (this.#vars[0].isEmpty()) return Constraint.UNDEFINED;
		return this.crispRelation().isSatisfied(this.#vars[0].value()) ? 1 : 0;
	}

	/**
	 * {@inheritDoc}
	 */
	satisfactionDegree() {
		if (this.#vars[0].isEmpty()) return Constraint.UNDEFINED;
		return this.fuzzyRelation().satisfactionDegree(this.#vars[0].value());
	}

	/**
	 * {@inheritDoc}
	 */
	neighbors() {
		const cs = [];
		for (const c of this.#vars[0]) {
			if (c !== this) cs.push(c);
		}
		return cs;
	}

	/**
	 * {@inheritDoc}
	 */
	highestConsistencyDegree() {
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
	lowestConsistencyDegree() {
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
