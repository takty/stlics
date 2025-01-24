/**
 * An abstract class that represents a variable domain.
 * The domain is immutable.
 *
 * @author Takuto Yanagida
 * @version 2025-01-24
 */

export abstract class Domain {

	/**
	 * Generates a domain.
	 * @param vs Multiple values.
	 * @return A domain.
	 */
	static create(vs: number[]): Domain;

	/**
	 * Generates a domain.
	 * @param min Minimum value.
	 * @param max Maximum value.
	 * @return A domain.
	 */
	static create(min: number, max: number): Domain;

	static create(vs_min: number[] | number, max: number | null = null): Domain {
		if (Array.isArray(vs_min)) {
			return new DomainArbitrary(vs_min);
		} else if (null !== max) {
			return new DomainRanged(vs_min, max);
		}
		throw new RangeError();
	}

	/**
	 * Checks whether the specified value is included as an element of the domain.
	 *
	 * @param v A value.
	 * @return True if the value is included.
	 */
	abstract contains(v: number): boolean;

	/**
	 * Gets the index of the specified value. If it does not exist, -1 is returned.
	 *
	 * @param v A value.
	 * @return The index.
	 */
	abstract indexOf(v: number): number;

	/**
	 * Gets the size of the domain, including the pruned elements.
	 *
	 * @return The size.
	 */
	abstract size(): number;

	/**
	 * Gets the value at the specified index. The retrieved value may have been pruned.
	 *
	 * @param index An index.
	 * @return The value.
	 */
	abstract at(index: number): number;

	/**
	 * Gets the iterator of the values of the domain.
	 */
	abstract [Symbol.iterator](): Iterator<number>;

}


// -----------------------------------------------------------------------------


class DomainArbitrary extends Domain {

	#vs: number[];

	constructor(vs: number[]) {
		super();
		this.#vs = [...vs];
	}

	contains(v: number): boolean {
		return this.#vs.includes(v);
	}

	indexOf(v: number): number {
		return this.#vs.indexOf(v);
	}

	size(): number {
		return this.#vs.length;
	}

	at(index: number): number {
		return this.#vs[index];
	}

	[Symbol.iterator](): Iterator<number> {
		return this.#vs[Symbol.iterator]();
	}

}


// -----------------------------------------------------------------------------


class DomainRanged extends Domain {

	#min: number;
	#max: number;

	constructor(min: number, max: number) {
		super();
		this.#min = min | 0;
		this.#max = max | 0;
	}

	contains(v: number): boolean {
		return this.#min <= v && v <= this.#max;
	}

	indexOf(v: number): number {
		return (this.#min <= v && v <= this.#max) ? (v - this.#min) : -1;
	}

	size(): number {
		return this.#max - this.#min + 1;
	}

	at(index: number): number {
		return this.#min + index;
	}

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
