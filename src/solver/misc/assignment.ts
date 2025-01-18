/**
 * The class represents a pair of variables and the values to be assigned to them.
 *
 * @author Takuto Yanagida
 * @version 2025-01-18
 */

import { Variable } from '../../problem/variable';

export class Assignment {

	#x: Variable;
	#v: number;

	/**
	 * Create an assignment.
	 * @param a_x An assignment or a variable.
	 */
	constructor(a_x: Assignment | Variable);

	/**
	 * Create an assignment.
	 * @param x Variable.
	 * @param value A value to be assigned.
	 */
	constructor(x: Variable, value: number | null);

	constructor(a_x: Assignment | Variable, value: number | null = null) {
		if (a_x instanceof Assignment) {
			this.#x = (a_x as Assignment).variable();
			this.#v = (a_x as Assignment).value();
		} else if (a_x instanceof Variable) {
			this.#x = (a_x as Variable);
			this.#v = value ?? (a_x as Variable).value();
		} else {
			throw new RangeError();
		}
	}

	/**
	 * Assigns a value to a stored variable.
	 */
	apply(): void {
		this.#x.assign(this.#v);
	}

	/**
	 * Returns a string representation.
	 * @return A string representation.
	 */
	toString(): string {
		return `v${this.#x.index()} <- ${this.#v}`;
	}

	/**
	 * Gets the value.
	 * @return Value.
	 */
	value(): number {
		return this.#v;
	}

	/**
	 * Gets the variable.
	 * @return Variable.
	 */
	variable(): Variable {
		return this.#x;
	}

}
