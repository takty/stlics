/**
 * A variable domain with contiguous integer elements.
 *
 * @author Takuto Yanagida
 * @version 2023-04-10
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
	 * {@inheritDoc}
	 */
	contains(val: number): boolean {
		return this.#min <= val && val <= this.#max;
	}

	/**
	 * {@inheritDoc}
	 */
	indexOf(val: number): number {
		return (this.#min <= val && val <= this.#max) ? (val - this.#min) : -1;
	}

	/**
	 * {@inheritDoc}
	 */
	size(): number {
		return this.#max - this.#min + 1;
	}

	/**
	 * {@inheritDoc}
	 */
	at(index: number): number {
		return this.#min + index;
	}

	/**
	 * {@inheritDoc}
	 */
	[Symbol.iterator](): Iterator<number> {
		let val = this.#min;
		const max = this.#max;
		return {
			next(): IteratorResult<number> {
				if (val <= max) {
					return { value: val++, done: false };
				} else {
					return { value: null, done: true };
				}
			},
		};
	}

}
