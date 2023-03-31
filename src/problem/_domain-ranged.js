/**
 * A variable domain with contiguous integer elements.
 *
 * @author Takuto Yanagida
 * @version 2022-08-15
 */

class DomainRanged extends Domain {

	#min;
	#max;

	constructor(min, max) {
		super();
		this.#min = min;
		this.#max = max;
	}

	/**
	 * {@inheritDoc}
	 */
	contains(val) {
		return this.#min <= val && val <= this.#max;
	}

	/**
	 * {@inheritDoc}
	 */
	indexOf(val) {
		return (this.#min <= val && val <= this.#max) ? (val - this.#min) : -1;
	}

	/**
	 * {@inheritDoc}
	 */
	size() {
		return this.#max - this.#min + 1;
	}

	/**
	 * {@inheritDoc}
	 */
	at(index) {
		return this.#min + index;
	}

	/**
	 * {@inheritDoc}
	 */
	random() {
		return Math.floor(Math.random() * (this.#max - this.#min + 1) + this.#min);
	}

}
