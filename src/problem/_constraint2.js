/**
 * The class represents an binary constraint.
 * The constructor is not called directly, since it is created by the Problem.
 *
 * @author Takuto Yanagida
 * @version 2023-03-26
 */

class Constraint2 extends Constraint {

	#v1;
	#v2;

	// Called only from Problem.
	constructor(r, v1, v2) {
		super(r);
		this.#v1 = v1;
		this.#v2 = v2;
	}

	/**
	 * {@inheritDoc}
	 */
	size() {
		return 2;
	}

	/**
	 * {@inheritDoc}
	 */
	at(index) {
		if (index === 0) return this.#v1;
		if (index === 1) return this.#v2;
		throw new IndexOutOfBoundsException();
	}

	/**
	 * {@inheritDoc}
	 */
	constrains(v) {
		return this.#v1 === v || this.#v2 === v;
	}

	/**
	 * {@inheritDoc}
	 */
	indexOf(v) {
		if (v === this.#v1) return 0;
		if (v === this.#v2) return 1;
		return -1;
	}

	/**
	 * {@inheritDoc}
	 */
	emptyVariableSize() {
		let sum = 0;
		if (this.#v1.isEmpty()) ++sum;
		if (this.#v2.isEmpty()) ++sum;
		return sum;
	}

	/**
	 * {@inheritDoc}
	 */
	isDefined() {
		return !this.#v1.isEmpty() && !this.#v2.isEmpty();
	}

	/**
	 * {@inheritDoc}
	 */
	isSatisfied() {
		if (this.#v1.isEmpty() || this.#v2.isEmpty()) return Constraint.UNDEFINED;
		return this.crispRelation().isSatisfied(this.#v1.value(), this.#v2.value()) ? 1 : 0;
	}

	/**
	 * {@inheritDoc}
	 */
	satisfactionDegree() {
		if (this.#v1.isEmpty() || this.#v2.isEmpty()) return Constraint.UNDEFINED;
		return this.fuzzyRelation().satisfactionDegree(this.#v1.value(), this.#v2.value());
	}

	/**
	 * {@inheritDoc}
	 */
	neighbors(dest) {
		for (let i = 0, n = this.#v1.size(); i < n; ++i) {
			const c = this.#v1.at(i);
			if (c !== this) dest.push(c);
		}
		for (let i = 0, n = this.#v2.size(); i < n; ++i) {
			const c = this.#v2.at(i);
			if (c !== this) dest.push(c);
		}
		return dest;
	}

	/**
	 * {@inheritDoc}
	 */
	highestConsistencyDegree() {
		const sd = this.satisfactionDegree();
		if (sd !== Constraint.UNDEFINED) return sd;
		let cd = 0.0;
		const val1 = this.#v1.value();
		const val2 = this.#v2.value();
		const d1   = this.#v1.domain();
		const d2   = this.#v2.domain();
		const n1   = d1.size();
		const n2   = d2.size();

		if (!this.#v1.isEmpty() && this.#v2.isEmpty()) {
			for (let i = 0; i < n2; ++i) {
				const s = this.fuzzyRelation().satisfactionDegree(val1, d2.at(i));
				if (s > cd) cd = s;
				if (cd === 1.0) break;
			}
		} else if(this.#v1.isEmpty() && !this.#v2.isEmpty()) {
			for (let i = 0; i < n1; ++i) {
				const s = this.fuzzyRelation().satisfactionDegree(d1.at(i), val2);
				if (s > cd) cd = s;
				if (cd === 1.0) break;
			}
		} else {
			for (let i = 0; i < n1; ++i) {
				for (let j = 0; j < n2; ++j) {
					const s = this.fuzzyRelation().satisfactionDegree(d1.at(i), d2.at(j));
					if (s > cd) cd = s;
					if (cd === 1.0) break;
				}
			}
		}
		return cd;
	}

	/**
	 * {@inheritDoc}
	 */
	lowestConsistencyDegree() {
		const sd = this.satisfactionDegree();
		if(sd !== Constraint.UNDEFINED) return sd;
		let cd = 1.0;
		const val1 = this.#v1.value();
		const val2 = this.#v2.value();
		const d1   = this.#v1.domain();
		const d2   = this.#v2.domain();
		const n1   = d1.size();
		const n2   = d2.size();

		if (!this.#v1.isEmpty() && this.#v2.isEmpty()) {
			for (let i = 0; i < n2; ++i) {
				const s = this.fuzzyRelation().satisfactionDegree(val1, d2.at(i));
				if (s < cd) cd = s;
				if (cd === 0.0) break;
			}
		} else if (this.#v1.isEmpty() && !this.#v2.isEmpty()) {
			for (let i = 0; i < n1; ++i) {
				const s = this.fuzzyRelation().satisfactionDegree(d1.at(i), val2);
				if (s < cd) cd = s;
				if (cd === 0.0) break;
			}
		} else {
			for (let i = 0; i < n1; ++i) {
				for (let j = 0; j < n2; ++j) {
					const s = this.fuzzyRelation().satisfactionDegree(d1.at(i), d2.at(j));
					if (s < cd) cd = s;
					if (cd === 0.0) break;
				}
			}
		}
		return cd;
	}

}
