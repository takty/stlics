/**
 * Class that represents a variable.
 *
 * @author Takuto Yanagida
 * @version 2023-04-16
 */

import { Element } from './_element.js';

export class Variable extends Element {

	static #INVALID = Number.MIN_VALUE;

	#owner;
	#dom;
	#val  = Variable.#INVALID;
	#cons = [];

	// Called only from Problem.
	constructor(owner, d) {
		super();
		this.#owner = owner;
		this.#dom   = d;
	}

	// Called only from Problem.
	connect(c) {
		if (this.has(c)) {
			throw new IllegalArgumentException();
		}
		this.#cons.push(c);
	}

	// Called only from Problem.
	disconnect(c) {
		if (!this.has(c)) {
			throw new IllegalArgumentException();
		}
		this.#cons = this.#cons.filter(n => n !== c);
	}

	/**
	 * Assign a value.
	 * @param value Value.
	 */
	assign(value) {
		this.#val = value;  // Do not change val_ except here.
	}

	/**
	 * Sets the state of the variable to unassigned.
	 */
	clear() {
		this.assign(Variable.#INVALID);  // Do not use the invalid value except here and below (isEmpty).
	}

	/**
	 * Checks whether the value is unassigned or not.
	 * @return True if unassigned.
	 */
	isEmpty() {
		return this.value() === Variable.#INVALID;
	}

	/**
	 * Assign the domain.
	 * The variable will be in unassigned state.
	 * @param d Domain to be assigned.
	 */
	setDomain(d) {
		this.#dom = d;
		this.clear();
	}

	/**
	 * Gets the problem that owns this variable.
	 * @return Owner.
	 */
	owner() {
		return this.#owner;
	}

	/**
	 * Gets the number of associated constraints.
	 * @return Number of constraints.
	 */
	size() {
		return this.#cons.length;
	}

	/**
	 * Gets the associated constraints by specifying their indices.
	 * @param index Index.
	 * @return A constraint.
	 */
	at(index) {
		return this.#cons[index];
	}

	/**
	 * Gets the iterator of the associated constraints.
	 */
	[Symbol.iterator]() {
		return this.#cons[Symbol.iterator]();
	}

	/**
	 * Gets the domain of the variable.
	 * @return The domain.
	 */
	domain() {
		return this.#dom;
	}

	/**
	 * Checks whether or not the variable is associated with the specified constraint.
	 * @param c A constraint.
	 * @return True if associated.
	 */
	has(c) {
		return this.#cons.includes(c);
	}

	/**
	 * Gets a string representation.
	 * @return A string representation.
	 */
	toString() {
		return `x${this.index()}${this.name() === '' ? '' : `(${this.name()})`} = ${this.isEmpty() ? '<empty>' : this.value()}`;
	}

	/**
	 * Gets the value of the variable.
	 * @returnThe value of the variable.
	 */
	value() {
		return this.#val;
	}

	/**
	 * Collects the variables connected via the associated constraints.
	 * @return An array of variables
	 */
	neighbors() {
		const vs = [];
		for (const c of this.#cons) {
			for (const v of c) {
				if (v !== this) vs.push(v);
			}
		}
		return vs;
	}

}
