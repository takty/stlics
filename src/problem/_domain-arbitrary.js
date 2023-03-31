/**
 * A variable domain with arbitrary integer elements.
 *
 * @author Takuto Yanagida
 * @version 2022-08-15
 */

class DomainArbitrary extends Domain {

	#vals;

	constructor(vals) {
		super();
		this.#vals = [...vals];
	}

	/**
	 * {@inheritDoc}
	 */
	contains(val) {
		return this.#vals.includes(val);
	}

	/**
	 * {@inheritDoc}
	 */
	indexOf(val) {
		return this.#vals.indexOf(val);
	}

	/**
	 * {@inheritDoc}
	 */
	size() {
		return this.#vals.length;
	}

	/**
	 * {@inheritDoc}
	 */
	at(index) {
		return this.#vals[index];
	}

	/**
	 * {@inheritDoc}
	 */
	random() {
		return this.#vals[Math.floor(Math.random() * this.#vals.length)];
	}

}
