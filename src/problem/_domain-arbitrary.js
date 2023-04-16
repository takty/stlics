/**
 * A variable domain with arbitrary elements.
 *
 * @author Takuto Yanagida
 * @version 2023-04-10
 */

import { Domain } from './_domain.js';

export class DomainArbitrary extends Domain {

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
	[Symbol.iterator]() {
		return this.#vals[Symbol.iterator]();
	}

}
