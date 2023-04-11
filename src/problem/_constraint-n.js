/**
 * The class represents an n-ary constraint.
 * The constructor is not called directly, since it is created by the Problem.
 *
 * @author Takuto Yanagida
 * @version 2023-04-11
 */

class ConstraintN extends Constraint {

	#vars;
	#vals;  // For reuse.

	// Called only from Problem.
	constructor(r, ...vs) {
		super(r);
		this.#vars = [...vs];
		this.#vals = new Array(this.#vars.length);
	}

	/**
	 * {@inheritDoc}
	 */
	size() {
		return this.#vars.length;
	}

	/**
	 * {@inheritDoc}
	 */
	at(index) {
		return this.#vars[index];
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
		return this.#vars.includes(v);
	}

	/**
	 * {@inheritDoc}
	 */
	indexOf(v) {
		return this.#vars.indexOf(v);
	}

	/**
	 * {@inheritDoc}
	 */
	emptyVariableSize() {
		let sum = 0;
		for (const v of this.#vars) {
			if (v.isEmpty()) ++sum;
		}
		return sum;
	}

	/**
	 * {@inheritDoc}
	 */
	isDefined() {
		for (const v of this.#vars) {
			if (v.isEmpty()) return false;
		}
		return true;
	}

	/**
	 * {@inheritDoc}
	 */
	isSatisfied() {
		for (let i = 0; i < this.#vars.length; ++i) {
			if (this.#vars[i].isEmpty()) return -1;
			this.#vals[i] = this.#vars[i].value();
		}
		return this.crispRelation().isSatisfied(...this.#vals) ? 1 : 0;
	}

	/**
	 * {@inheritDoc}
	 */
	satisfactionDegree() {
		for (let i = 0; i < this.#vars.length; ++i) {
			const v = this.#vars[i];
			if (v.isEmpty()) return Constraint.UNDEFINED;
			this.#vals[i] = v.value();
		}
		return this.fuzzyRelation().satisfactionDegree(...this.#vals);
	}

	/**
	 * {@inheritDoc}
	 */
	neighbors() {
		const cs = [];
		for (const v of this.#vars) {
			for (const c of v) {
				if (c !== this) cs.push(c);
			}
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
		const emptyIndices = new Array(this.emptyVariableSize());
		let c = 0;

		for (let i = 0; i < this.#vars.length; ++i) {
			if (this.#vars[i].isEmpty()) {
				emptyIndices[c++] = i;
			} else {
				this.#vals[i] = this.#vars[i].value();
			}
		}
		return this.checkHCD(emptyIndices, 0, 0);
	}

	/**
	 * {@inheritDoc}
	 */
	lowestConsistencyDegree() {
		const sd = this.satisfactionDegree();
		if (sd !== Constraint.UNDEFINED) {
			return sd;
		}
		const emptyIndices = new Array(this.emptyVariableSize());
		let c = 0;

		for (let i = 0; i < this.#vars.length; ++i) {
			if (this.#vars[i].isEmpty()) {
				emptyIndices[c++] = i;
			} else {
				this.#vals[i] = this.#vars[i].value();
			}
		}
		return this.checkLCD(emptyIndices, 0, 1);
	}

	checkHCD(emptyIndices, currentStep, cd) {
		const index = emptyIndices[currentStep];
		const d     = this.#vars[index].domain();

		if (currentStep === emptyIndices.length - 1) {
			for (const val of d) {
				this.#vals[index] = val;
				const s = this.fuzzyRelation().satisfactionDegree(this.#vals);
				if (s > cd) cd = s;
				if (cd === 1) break;
			}
		} else {
			for (const val of d) {
				this.#vals[index] = val;
				cd = this.checkLCD(emptyIndices, currentStep + 1, cd);
			}
		}
		return cd;
	}

	checkLCD(emptyIndices, currentStep, cd) {
		const index = emptyIndices[currentStep];
		const d     = this.#vars[index].domain();

		if (currentStep === emptyIndices.length - 1) {
			for (const val of d) {
				this.#vals[index] = val;
				const s = this.fuzzyRelation().satisfactionDegree(this.#vals);
				if (s < cd) cd = s;
				if (cd === 0) break;
			}
		} else {
			for (const val of d) {
				this.#vals[index] = val;
				cd = this.checkLCD(emptyIndices, currentStep + 1, cd);
			}
		}
		return cd;
	}

}
