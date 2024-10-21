/**
 * A variable domain with arbitrary elements.
 *
 * @author Takuto Yanagida
 * @version 2023-04-10
 */

import { Domain } from './domain';

export class DomainArbitrary extends Domain {

	#vals: number[];

	constructor(vals: number[]) {
		super();
		this.#vals = [...vals];
	}

	/**
	 * {@inheritDoc}
	 */
	contains(val: number): boolean {
		return this.#vals.includes(val);
	}

	/**
	 * {@inheritDoc}
	 */
	indexOf(val: number): number {
		return this.#vals.indexOf(val);
	}

	/**
	 * {@inheritDoc}
	 */
	size(): number {
		return this.#vals.length;
	}

	/**
	 * {@inheritDoc}
	 */
	at(index: number): number {
		return this.#vals[index];
	}

	/**
	 * {@inheritDoc}
	 */
	[Symbol.iterator](): Iterator<number> {
		return this.#vals[Symbol.iterator]();
	}

}
