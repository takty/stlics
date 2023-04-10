/**
 * A variable domain with contiguous integer elements.
 *
 * @author Takuto Yanagida
 * @version 2023-04-10
 */

class DomainRanged extends Domain {

	#min;
	#max;

	constructor(min, max) {
		super();
		this.#min = min | 0;
		this.#max = max | 0;
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
	[Symbol.iterator]() {
		let val = this.#min;
		return {
			next: () => (val <= this.#max ? { value: val++, done: false } : { done: true }),
		};
	}

}
