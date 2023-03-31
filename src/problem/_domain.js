/**
 * An abstract class that represents a variable domain. It also provides factory methods.
 * The domain is immutable.
 *
 * @author Takuto Yanagida
 * @version 2023-03-26
 */

class Domain {

	/**
	 * Returns whether the specified value is included as an element of the domain.
	 *
	 * @param val A value.
	 * @return True if the value included, false otherwise.
	 */
	contains(val) {}

	/**
	 * Returns the index of the specified value. If it does not exist, -1 is returned.
	 *
	 * @param val A value.
	 * @return The index.
	 */
	indexOf(val) {}

	/**
	 * Returns the size of the domain, including the pruned elements.
	 *
	 * @return The size.
	 */
	size() {}

	/**
	 * Returns the value at the specified index. The retrieved value may have been pruned.
	 *
	 * @param index An index.
	 * @return The value.
	 */
	at(index) {}

	/**
	 * Returns an arbitrary value, regardless of whether it has been pruned or not.
	 *
	 * @return A value.
	 */
	random() {}

}
