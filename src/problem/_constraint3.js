/**
 * The class represents an 3-ary constraint.
 * The constructor is not called directly, since it is created by the Problem.
 *
 * @author Takuto Yanagida
 * @version 2023-03-26
 */

class Constraint3 extends Constraint {

	#v1;
	#v2;
	#v3;

	// Called only from Problem.
	constructor(r, v1, v2, v3) {
		super(r);
		this.#v1 = v1;
		this.#v2 = v2;
		this.#v3 = v3;
	}

	/**
	 * {@inheritDoc}
	 */
	size() {
		return 3;
	}

	/**
	 * {@inheritDoc}
	 */
	at(index) {
		if (index === 0) return this.#v1;
		if (index === 1) return this.#v2;
		if (index === 2) return this.#v3;
		throw new IndexOutOfBoundsException();
	}

	/**
	 * {@inheritDoc}
	 */
	constrains(v) {
		return this.#v1 === v || this.#v2 === v || this.#v3 === v;
	}

	/**
	 * {@inheritDoc}
	 */
	indexOf(v) {
		if (v === this.#v1) return 0;
		if (v === this.#v2) return 1;
		if (v === this.#v3) return 2;
		return -1;
	}

	/**
	 * {@inheritDoc}
	 */
	emptyVariableSize() {
		let sum = 0;
		if (this.#v1.isEmpty()) ++sum;
		if (this.#v2.isEmpty()) ++sum;
		if (this.#v3.isEmpty()) ++sum;
		return sum;
	}

	/**
	 * {@inheritDoc}
	 */
	isDefined() {
		return !this.#v1.isEmpty() && !this.#v2.isEmpty() && !this.#v3.isEmpty();
	}

	/**
	 * {@inheritDoc}
	 */
	isSatisfied() {
		if (this.#v1.isEmpty() || this.#v2.isEmpty() || this.#v3.isEmpty()) return -1;
		return this.crispRelation().isSatisfied(this.#v1.value(), this.#v2.value(), this.#v3.value()) ? 1 : 0;
	}

	/**
	 * {@inheritDoc}
	 */
	satisfactionDegree() {
		if (this.#v1.isEmpty() || this.#v2.isEmpty() || this.#v3.isEmpty()) return Constraint.UNDEFINED;
		return this.fuzzyRelation().satisfactionDegree(this.#v1.value(), this.#v2.value(), this.#v3.value());
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
		for (let i = 0, n = this.#v3.size(); i < n; ++i) {
			const c = this.#v3.at(i);
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
		let cd = 1.0;
		const val1 = this.#v1.value();
		const val2 = this.#v2.value();
		const val3 = this.#v3.value();
		const d1   = this.#v1.domain();
		const d2   = this.#v2.domain();
		const d3   = this.#v3.domain();
		const n1   = d1.size();
		const n2   = d2.size();
		const n3   = d3.size();

		if (this.#v1.isEmpty() && !this.#v2.isEmpty() && !this.#v3.isEmpty()) {
			for (let i = 0; i < n1; ++i) {
				const s = this.fuzzyRelation().satisfactionDegree(d1.at(i), val2, val3);
				if (s > cd) cd = s;
				if (cd === 1.0) break;
			}
		} else if (!this.#v1.isEmpty() && this.#v2.isEmpty() && !this.#v3.isEmpty()) {
			for (let i = 0; i < n2; ++i) {
				const s = this.fuzzyRelation().satisfactionDegree(val1, d2.at(i), val3);
				if (s > cd) cd = s;
				if (cd === 1.0) break;
			}
		} else if (!this.#v1.isEmpty() && !this.#v2.isEmpty() && this.#v3.isEmpty()) {
			for (let i = 0; i < n3; ++i) {
				const s = this.fuzzyRelation().satisfactionDegree(val1, val2, d3.at(i));
				if (s > cd) cd = s;
				if (cd === 1.0) break;
			}

		} else if (this.#v1.isEmpty() && this.#v2.isEmpty() && !this.#v3.isEmpty()) {
			for (let i = 0; i < n1; ++i) {
				for (let j = 0; j < n2; ++j) {
					const s = this.fuzzyRelation().satisfactionDegree(d1.at(i), d2.at(j), val3);
					if (s > cd) cd = s;
					if (cd === 1.0) break;
				}
			}
		} else if (this.#v1.isEmpty() && !this.#v2.isEmpty() && this.#v3.isEmpty()) {
			for (let i = 0; i < n1; ++i) {
				for (let j = 0; j < n3; ++j) {
					const s = this.fuzzyRelation().satisfactionDegree(d1.at(i), val2, d3.at(j));
					if (s > cd) cd = s;
					if (cd === 1.0) break;
				}
			}
		} else if (!this.#v1.isEmpty() && this.#v2.isEmpty() && this.#v3.isEmpty()) {
			for (let i = 0; i < n2; ++i) {
				for (let j = 0; j < n3; ++j) {
					const s = this.fuzzyRelation().satisfactionDegree(val1, d2.at(i), d3.at(j));
					if (s > cd) cd = s;
					if (cd === 1.0) break;
				}
			}
		} else {
			for (let i = 0; i < n1; ++i) {
				for (let j = 0; j < n2; ++j) {
					for(let k = 0; k < n3; ++k) {
						const s = this.fuzzyRelation().satisfactionDegree(d1.at(i), d2.at(j), d3.at(k));
						if (s > cd) cd = s;
						if (cd === 1.0) break;
					}
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
		if (sd !== Constraint.UNDEFINED) return sd;
		let cd = 1.0;
		const val1 = this.#v1.value();
		const val2 = this.#v2.value();
		const val3 = this.#v3.value();
		const d1   = this.#v1.domain();
		const d2   = this.#v2.domain();
		const d3   = this.#v3.domain();
		const n1   = d1.size();
		const n2   = d2.size();
		const n3   = d3.size();

		if (this.#v1.isEmpty() && !this.#v2.isEmpty() && !this.#v3.isEmpty()) {
			for (let i = 0; i < n1; ++i) {
				const s = this.fuzzyRelation().satisfactionDegree(d1.at(i), val2, val3);
				if (s < cd) cd = s;
				if (cd === 0.0) break;
			}
		} else if (!this.#v1.isEmpty() && this.#v2.isEmpty() && !this.#v3.isEmpty()) {
			for (let i = 0; i < n2; ++i) {
				const s = this.fuzzyRelation().satisfactionDegree(val1, d2.at(i), val3);
				if (s < cd) cd = s;
				if (cd === 0.0) break;
			}
		} else if (!this.#v1.isEmpty() && !this.#v2.isEmpty() && this.#v3.isEmpty()) {
			for (let i = 0; i < n3; ++i) {
				const s = this.fuzzyRelation().satisfactionDegree(val1, val2, d3.at(i));
				if (s < cd) cd = s;
				if (cd === 0.0) break;
			}
		} else if (this.#v1.isEmpty() && this.#v2.isEmpty() && !this.#v3.isEmpty()) {
			for (let i = 0; i < n1; ++i) {
				for (let j = 0; j < n2; ++j) {
					const s = this.fuzzyRelation().satisfactionDegree(d1.at(i), d2.at(j), val3);
					if (s < cd) cd = s;
					if (cd === 0.0) break;
				}
			}
		} else if (this.#v1.isEmpty() && !this.#v2.isEmpty() && this.#v3.isEmpty()) {
			for (let i = 0; i < n1; ++i) {
				for (let j = 0; j < n3; ++j) {
					const s = this.fuzzyRelation().satisfactionDegree(d1.at(i), val2, d3.at(j));
					if (s < cd) cd = s;
					if (cd === 0.0) break;
				}
			}
		} else if (!this.#v1.isEmpty() && this.#v2.isEmpty() && this.#v3.isEmpty()) {
			for (let i = 0; i < n2; ++i) {
				for (let j = 0; j < n3; ++j) {
					const s = this.fuzzyRelation().satisfactionDegree(val1, d2.at(i), d3.at(j));
					if (s < cd) cd = s;
					if (cd === 0.0) break;
				}
			}
		} else {
			for (let i = 0; i < n1; ++i) {
				for (let j = 0; j < n2; ++j) {
					for(let k = 0; k < n3; ++k) {
						const s = this.fuzzyRelation().satisfactionDegree(d1.at(i), d2.at(j), d3.at(k));
						if (s < cd) cd = s;
						if (cd === 0.0) break;
					}
				}
			}
		}
		return cd;
	}

}
