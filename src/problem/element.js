/**
 * The common class of variables and constraints.
 *
 * @author Takuto Yanagida
 * @version 2022-08-15
 */

export class Element {

	#index = -1;
	#name  = '';

	/**
	 * It is used when the user wishes to associate an arbitrary object with each element.
	 */
	userObject = null;

	/**
	 * Used when the solver wants to associate an arbitrary object with each element.
	 */
	solverObject = null;

	// Called only from Problem.
	setIndex(index) {
		this.#index = index;
	}

	/**
	 * Sets the name.
	 *
	 * @param name String representing the name.
	 */
	setName(name) {
		this.#name = name;
	}

	/**
	 * Get the index on the owned problem.
	 * Each variable and constraint is assigned a serial number as an index, which is used to access it through the problem.
	 *
	 * @return Integer value representing the index.
	 */
	index() {
		return this.#index;
	}

	/**
	 * Gets the name.
	 *
	 * @return String representing the name.
	 */
	name() {
		return this.#name;
	}

}
