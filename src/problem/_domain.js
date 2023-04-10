/**
 * An abstract class that represents a variable domain.
 * The domain is immutable.
 *
 * @author Takuto Yanagida
 * @version 2023-04-10
 */

class Domain {

	/**
	 * Checks whether the specified value is included as an element of the domain.
	 *
	 * @param val A value.
	 * @return True if the value is included.
	 */
	contains(val) {}

	/**
	 * Gets the index of the specified value. If it does not exist, -1 is returned.
	 *
	 * @param val A value.
	 * @return The index.
	 */
	indexOf(val) {}

	/**
	 * Gets the size of the domain, including the pruned elements.
	 *
	 * @return The size.
	 */
	size() {}

	/**
	 * Gets the value at the specified index. The retrieved value may have been pruned.
	 *
	 * @param index An index.
	 * @return The value.
	 */
	at(index) {}

	/**
	 * Gets the iterator of the values of the domain.
	 */
	[Symbol.iterator]() {}

	/**
	 * Gets an arbitrary value, regardless of whether it has been pruned or not.
	 *
	 * @return A value.
	 */
	random() {
		return this.at(Math.floor(Math.random() * this.size()));
	}

}
