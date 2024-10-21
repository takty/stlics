/**
 * The common class of variables and constraints.
 *
 * @author Takuto Yanagida
 * @version 2024-10-21
 */

export class Element {

	#index: number = -1;
	#name: string = '';

	/**
	 * It is used when the user wishes to associate an arbitrary object with each element.
	 */
	userObject: any = null;

	/**
	 * Used when the solver wants to associate an arbitrary object with each element.
	 */
	solverObject: any = null;

	// Called only from Problem.
	setIndex(index: number): void {
		this.#index = index;
	}

	/**
	 * Sets the name.
	 *
	 * @param name string representing the name.
	 */
	setName(name: string): void {
		this.#name = name;
	}

	/**
	 * Get the index on the owned problem.
	 * Each variable and constraint is assigned a serial number as an index, which is used to access it through the problem.
	 *
	 * @return Integer value representing the index.
	 */
	index(): number {
		return this.#index;
	}

	/**
	 * Gets the name.
	 *
	 * @return String representing the name.
	 */
	name(): string {
		return this.#name;
	}

}
