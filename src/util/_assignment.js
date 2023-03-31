/**
 * The class represents a pair of variables and the values to be assigned to them.
 *
 * @author Takuto Yanagida
 * @version 2023-03-25
 */

class Assignment {

	#variable;
	#value;

	constructor(args) {
		if (args.assignment) {
			this.#variable = args.assignment.variable();
			this.#value    = args.assignment.value();
		} else if (args.variable) {
			this.#variable = args.variable;
			this.#value    = args.value ?? args.variable.value();
		}
	}

	/**
	 * Assigns a value to a stored variable.
	 */
	apply() {
		this.#variable.assign(this.#value);
	}

	/**
	 * Returns a string representation.
	 * @return A string representation.
	 */
	toString() {
		return `v${this.#variable.index()} <- ${this.#value}`;
	}

	/**
	 * Gets the value.
	 * @return Value.
	 */
	value() {
		return this.#value;
	}

	/**
	 * Gets the variable.
	 * @return Variable.
	 */
	variable() {
		return this.#variable;
	}

}
