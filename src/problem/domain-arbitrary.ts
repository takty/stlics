/**
 * A variable domain with arbitrary elements.
 *
 * @author Takuto Yanagida
 * @version 2024-12-17
 */

import { Domain } from './domain';

export class DomainArbitrary extends Domain {

	#vs: number[];

	constructor(vs: number[]) {
		super();
		this.#vs = [...vs];
	}

	/**
	 * {@override}
	 */
	contains(v: number): boolean {
		return this.#vs.includes(v);
	}

	/**
	 * {@override}
	 */
	indexOf(v: number): number {
		return this.#vs.indexOf(v);
	}

	/**
	 * {@override}
	 */
	size(): number {
		return this.#vs.length;
	}

	/**
	 * {@override}
	 */
	at(index: number): number {
		return this.#vs[index];
	}

	/**
	 * {@override}
	 */
	[Symbol.iterator](): Iterator<number> {
		return this.#vs[Symbol.iterator]();
	}

}
