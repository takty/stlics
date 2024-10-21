/**
 * An abstract class that represents a variable domain.
 * The domain is immutable.
 *
 * @author Takuto Yanagida
 * @version 2024-10-21
 */

export abstract class Domain {

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

	/**
	 * Gets an arbitrary value, regardless of whether it has been pruned or not.
	 *
	 * @return A value.
	 */
	random(): number {
		return this.at(Math.floor(Math.random() * this.size()));
	}

}
