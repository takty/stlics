/**
 * The class represents a pair of variables and the values to be assigned to them.
 *
 * @author Takuto Yanagida
 * @version 2023-03-25
 */

import { Variable } from '../problem/variable';

export class Assignment {

	#variable: Variable;
	#value: number;

	constructor(args: { assignment: Assignment; } | { variable: Variable; value?: number|null }) {
		if ('assignment' in args) {
			this.#variable = args.assignment.variable();
			this.#value = args.assignment.value();
		} else if ('variable' in args) {
			this.#variable = args.variable;
			this.#value = args.value ?? args.variable.value();
		} else {
			throw new RangeError();
		}
	}

	/**
	 * Assigns a value to a stored variable.
	 */
	apply(): void {
		this.#variable.assign(this.#value);
	}

	/**
	 * Returns a string representation.
	 * @return A string representation.
	 */
	toString(): string {
		return `v${this.#variable.index()} <- ${this.#value}`;
	}

	/**
	 * Gets the value.
	 * @return Value.
	 */
	value(): number {
		return this.#value;
	}

	/**
	 * Gets the variable.
	 * @return Variable.
	 */
	variable(): Variable {
		return this.#variable;
	}

}
