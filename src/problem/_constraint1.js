/**
 * The class represents an unary constraint.
 * The constructor is not called directly, since it is created by the Problem.
 *
 * @author Takuto Yanagida
 * @version 2023-04-10
 */

class Constraint1 extends Constraint {

	#v;

	// Called only from Problem.
	constructor(r, v) {
		super(r);
		this.#v = v;
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
		if (index === 0) return this.#v;
		throw new IndexOutOfBoundsException();
	}

	/**
	 * {@inheritDoc}
	 */
	constrains(v) {
		return v === this.#v;
	}

	/**
	 * {@inheritDoc}
	 */
	indexOf(v) {
		return (v === this.#v) ? 0 : -1;
	}

	/**
	 * {@inheritDoc}
	 */
	emptyVariableSize() {
		return this.#v.isEmpty() ? 1 : 0;
	}

	/**
	 * {@inheritDoc}
	 */
	isDefined() {
		return !this.#v.isEmpty();
	}

	/**
	 * {@inheritDoc}
	 */
	isSatisfied() {
		if (this.#v.isEmpty()) return Constraint.UNDEFINED;
		return this.crispRelation().isSatisfied(this.#v.value()) ? 1 : 0;
	}

	/**
	 * {@inheritDoc}
	 */
	satisfactionDegree() {
		if (this.#v.isEmpty()) return Constraint.UNDEFINED;
		return this.fuzzyRelation().satisfactionDegree(this.#v.value());
	}

	/**
	 * {@inheritDoc}
	 */
	neighbors() {
		const cs = [];
		for (let i = 0, n = this.#v.size(); i < n; ++i) {
			const c = this.#v.at(i);
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

		for (const val of this.#v.domain()) {
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

		for (const val of this.#v.domain()) {
			const s = this.fuzzyRelation().satisfactionDegree(val);
			if (s < cd) cd = s;
			if (cd === 0) break;
		}
		return cd;
	}

}
