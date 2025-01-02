/**
 * The class represents a pair of variables and the values to be assigned to them.
 *
 * @author Takuto Yanagida
 * @version 2025-01-02
 */

import { Variable } from '../problem/variable';

export class Assignment {

	#x: Variable;
	#v: number;

	/**
	 * Creates an assignment.
	 * @param args Arguments.
	 */
	constructor(args: { assignment: Assignment; } | { variable: Variable; value?: number|null }) {
		if ('assignment' in args) {
			this.#x = args.assignment.variable();
			this.#v = args.assignment.value();
		} else if ('variable' in args) {
			this.#x = args.variable;
			this.#v = args.value ?? args.variable.value();
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
