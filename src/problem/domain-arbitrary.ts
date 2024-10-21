/**
 * A variable domain with arbitrary elements.
 *
 * @author Takuto Yanagida
 * @version 2024-10-21
 */

import { Domain } from './domain';

export class DomainArbitrary extends Domain {

	#vs: number[];

	constructor(vs: number[]) {
		super();
		this.#vs = [...vs];
	}

	/**
	 * {@inheritDoc}
	 */
	contains(v: number): boolean {
		return this.#vs.includes(v);
	}

	/**
	 * {@inheritDoc}
	 */
	indexOf(v: number): number {
		return this.#vs.indexOf(v);
	}

	/**
	 * {@inheritDoc}
	 */
	size(): number {
		return this.#vs.length;
	}

	/**
	 * {@inheritDoc}
	 */
	at(index: number): number {
		return this.#vs[index];
	}

	/**
	 * {@inheritDoc}
	 */
	[Symbol.iterator](): Iterator<number> {
		return this.#vs[Symbol.iterator]();
	}

}
