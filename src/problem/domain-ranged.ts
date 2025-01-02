/**
 * A variable domain with contiguous integer elements.
 *
 * @author Takuto Yanagida
 * @version 2024-12-17
 */

import { Domain } from './domain';

export class DomainRanged extends Domain {

	#min: number;
	#max: number;

	constructor(min: number, max: number) {
		super();
		this.#min = min | 0;
		this.#max = max | 0;
	}

	/**
	 * {@override}
	 */
	contains(v: number): boolean {
		return this.#min <= v && v <= this.#max;
	}

	/**
	 * {@override}
	 */
	indexOf(v: number): number {
		return (this.#min <= v && v <= this.#max) ? (v - this.#min) : -1;
	}

	/**
	 * {@override}
	 */
	size(): number {
		return this.#max - this.#min + 1;
	}

	/**
	 * {@override}
	 */
	at(index: number): number {
		return this.#min + index;
	}

	/**
	 * {@override}
	 */
	[Symbol.iterator](): Iterator<number> {
		let v: number = this.#min;
		const max: number = this.#max;
		return {
			next(): IteratorResult<number> {
				if (v <= max) {
					return { value: v++, done: false };
				} else {
					return { value: null, done: true };
				}
			},
		};
	}

}
