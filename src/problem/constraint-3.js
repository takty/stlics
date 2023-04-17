/**
 * The class represents an 3-ary constraint.
 * The constructor is not called directly, since it is created by the Problem.
 *
 * @author Takuto Yanagida
 * @version 2023-04-11
 */

import { Constraint } from './constraint.js';

export class Constraint3 extends Constraint {

	#vars = [null, null, null];

	// Called only from Problem.
	constructor(r, v1, v2, v3) {
		super(r);
		this.#vars[0] = v1;
		this.#vars[1] = v2;
		this.#vars[2] = v3;
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
		if (index === 0) return this.#vars[0];
		if (index === 1) return this.#vars[1];
		if (index === 2) return this.#vars[2];
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
		return this.#vars[0] === v || this.#vars[1] === v || this.#vars[2] === v;
	}

	/**
	 * {@inheritDoc}
	 */
	indexOf(v) {
		if (v === this.#vars[0]) return 0;
		if (v === this.#vars[1]) return 1;
		if (v === this.#vars[2]) return 2;
		return -1;
	}

	/**
	 * {@inheritDoc}
	 */
	emptyVariableSize() {
		let sum = 0;
		if (this.#vars[0].isEmpty()) ++sum;
		if (this.#vars[1].isEmpty()) ++sum;
		if (this.#vars[2].isEmpty()) ++sum;
		return sum;
	}

	/**
	 * {@inheritDoc}
	 */
	isDefined() {
		return !this.#vars[0].isEmpty() && !this.#vars[1].isEmpty() && !this.#vars[2].isEmpty();
	}

	/**
	 * {@inheritDoc}
	 */
	isSatisfied() {
		if (this.#vars[0].isEmpty() || this.#vars[1].isEmpty() || this.#vars[2].isEmpty()) return -1;
		return this.crispRelation().isSatisfied(this.#vars[0].value(), this.#vars[1].value(), this.#vars[2].value()) ? 1 : 0;
	}

	/**
	 * {@inheritDoc}
	 */
	satisfactionDegree() {
		if (this.#vars[0].isEmpty() || this.#vars[1].isEmpty() || this.#vars[2].isEmpty()) return Constraint.UNDEFINED;
		return this.fuzzyRelation().satisfactionDegree(this.#vars[0].value(), this.#vars[1].value(), this.#vars[2].value());
	}

	/**
	 * {@inheritDoc}
	 */
	neighbors() {
		const cs = [];
		for (const c of this.#vars[0]) {
			if (c !== this) cs.push(c);
		}
		for (const c of this.#vars[1]) {
			if (c !== this) cs.push(c);
		}
		for (const c of this.#vars[2]) {
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
		let cd = 1;
		const val1 = this.#vars[0].value();
		const val2 = this.#vars[1].value();
		const val3 = this.#vars[2].value();
		const d1   = this.#vars[0].domain();
		const d2   = this.#vars[1].domain();
		const d3   = this.#vars[2].domain();

		if (this.#vars[0].isEmpty() && !this.#vars[1].isEmpty() && !this.#vars[2].isEmpty()) {
			for (const val1 of d1) {
				const s = this.fuzzyRelation().satisfactionDegree(val1, val2, val3);
				if (s > cd) cd = s;
				if (cd === 1) break;
			}
		} else if (!this.#vars[0].isEmpty() && this.#vars[1].isEmpty() && !this.#vars[2].isEmpty()) {
			for (const val2 of d2) {
				const s = this.fuzzyRelation().satisfactionDegree(val1, val2, val3);
				if (s > cd) cd = s;
				if (cd === 1) break;
			}
		} else if (!this.#vars[0].isEmpty() && !this.#vars[1].isEmpty() && this.#vars[2].isEmpty()) {
			for (const val3 of d3) {
				const s = this.fuzzyRelation().satisfactionDegree(val1, val2, val3);
				if (s > cd) cd = s;
				if (cd === 1) break;
			}

		} else if (this.#vars[0].isEmpty() && this.#vars[1].isEmpty() && !this.#vars[2].isEmpty()) {
			for (const val1 of d1) {
				for (const val2 of d2) {
					const s = this.fuzzyRelation().satisfactionDegree(val1, val2, val3);
					if (s > cd) cd = s;
					if (cd === 1) break;
				}
			}
		} else if (this.#vars[0].isEmpty() && !this.#vars[1].isEmpty() && this.#vars[2].isEmpty()) {
			for (const val1 of d1) {
				for (const val3 of d3) {
					const s = this.fuzzyRelation().satisfactionDegree(val1, val2, val3);
					if (s > cd) cd = s;
					if (cd === 1) break;
				}
			}
		} else if (!this.#vars[0].isEmpty() && this.#vars[1].isEmpty() && this.#vars[2].isEmpty()) {
			for (const val2 of d2) {
				for (const val3 of d3) {
					const s = this.fuzzyRelation().satisfactionDegree(val1, val2, val3);
					if (s > cd) cd = s;
					if (cd === 1) break;
				}
			}
		} else {
			for (const val1 of d1) {
				for (const val2 of d2) {
					for (const val3 of d3) {
						const s = this.fuzzyRelation().satisfactionDegree(val1, val2, val3);
						if (s > cd) cd = s;
						if (cd === 1) break;
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
		if (sd !== Constraint.UNDEFINED) {
			return sd;
		}
		let cd = 1;
		const val1 = this.#vars[0].value();
		const val2 = this.#vars[1].value();
		const val3 = this.#vars[2].value();
		const d1   = this.#vars[0].domain();
		const d2   = this.#vars[1].domain();
		const d3   = this.#vars[2].domain();

		if (this.#vars[0].isEmpty() && !this.#vars[1].isEmpty() && !this.#vars[2].isEmpty()) {
			for (const val1 of d1) {
				const s = this.fuzzyRelation().satisfactionDegree(val1, val2, val3);
				if (s < cd) cd = s;
				if (cd === 0) break;
			}
		} else if (!this.#vars[0].isEmpty() && this.#vars[1].isEmpty() && !this.#vars[2].isEmpty()) {
			for (const val2 of d2) {
				const s = this.fuzzyRelation().satisfactionDegree(val1, val2, val3);
				if (s < cd) cd = s;
				if (cd === 0) break;
			}
		} else if (!this.#vars[0].isEmpty() && !this.#vars[1].isEmpty() && this.#vars[2].isEmpty()) {
			for (const val3 of d3) {
				const s = this.fuzzyRelation().satisfactionDegree(val1, val2, val3);
				if (s < cd) cd = s;
				if (cd === 0) break;
			}
		} else if (this.#vars[0].isEmpty() && this.#vars[1].isEmpty() && !this.#vars[2].isEmpty()) {
			for (const val1 of d1) {
				for (const val2 of d2) {
					const s = this.fuzzyRelation().satisfactionDegree(val1, val2, val3);
					if (s < cd) cd = s;
					if (cd === 0) break;
				}
			}
		} else if (this.#vars[0].isEmpty() && !this.#vars[1].isEmpty() && this.#vars[2].isEmpty()) {
			for (const val1 of d1) {
				for (const val3 of d3) {
					const s = this.fuzzyRelation().satisfactionDegree(val1, val2, val3);
					if (s < cd) cd = s;
					if (cd === 0) break;
				}
			}
		} else if (!this.#vars[0].isEmpty() && this.#vars[1].isEmpty() && this.#vars[2].isEmpty()) {
			for (const val2 of d2) {
				for (const val3 of d3) {
					const s = this.fuzzyRelation().satisfactionDegree(val1, val2, val3);
					if (s < cd) cd = s;
					if (cd === 0) break;
				}
			}
		} else {
			for (const val1 of d1) {
				for (const val2 of d2) {
					for (const val3 of d3) {
						const s = this.fuzzyRelation().satisfactionDegree(val1, val2, val3);
						if (s < cd) cd = s;
						if (cd === 0) break;
					}
				}
			}
		}
		return cd;
	}

}
