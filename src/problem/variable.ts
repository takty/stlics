/**
 * Class that represents a variable.
 *
 * @author Takuto Yanagida
 * @version 2023-04-18
 */

import { Problem } from './problem';
import { Element } from './element';
import { Constraint } from './constraint';
import { Domain } from './domain';

export class Variable extends Element {

	static #INVALID = Number.MIN_VALUE;

	#owner: Problem;
	#dom: Domain;
	#val: number  = Variable.#INVALID;
	#cons: Constraint[] = [];

	// Called only from Problem.
	constructor(owner: Problem, d: Domain) {
		super();
		this.#owner = owner;
		this.#dom   = d;
	}

	// Called only from Problem.
	connect(c: Constraint): void {
		if (this.has(c)) {
			throw new RangeError();
		}
		this.#cons.push(c);
	}

	// Called only from Problem.
	disconnect(c: Constraint): void {
		if (!this.has(c)) {
			throw new RangeError();
		}
		this.#cons = this.#cons.filter(n => n !== c);
	}

	/**
	 * Assign a value.
	 * @param value Value.
	 */
	assign(value: number): void {
		this.#val = value;  // Do not change #val except here.
	}

	/**
	 * Sets the state of the variable to unassigned.
	 */
	clear(): void {
		this.assign(Variable.#INVALID);  // Do not use the invalid value except here and below (isEmpty).
	}

	/**
	 * Checks whether the value is unassigned or not.
	 * @return True if unassigned.
	 */
	isEmpty(): boolean {
		return this.value() === Variable.#INVALID;
	}

	/**
	 * Assign the domain.
	 * The variable will be in unassigned state.
	 * @param d Domain to be assigned.
	 */
	setDomain(d: Domain): void {
		this.#dom = d;
		this.clear();
	}

	/**
	 * Gets the problem that owns this variable.
	 * @return Owner.
	 */
	owner(): Problem {
		return this.#owner;
	}

	/**
	 * Gets the number of associated constraints.
	 * @return Number of constraints.
	 */
	size(): number {
		return this.#cons.length;
	}

	/**
	 * Gets the associated constraints by specifying their indices.
	 * @param index Index.
	 * @return A constraint.
	 */
	at(index: number): Constraint {
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
	domain(): Domain {
		return this.#dom;
	}

	/**
	 * Checks whether or not the variable is associated with the specified constraint.
	 * @param c A constraint.
	 * @return True if associated.
	 */
	has(c: Constraint): boolean {
		return this.#cons.includes(c);
	}

	/**
	 * Gets a string representation.
	 * @return A string representation.
	 */
	toString(): string {
		return `x${this.index()}${this.name() === '' ? '' : `(${this.name()})`} = ${this.isEmpty() ? '<empty>' : this.value()}`;
	}

	/**
	 * Gets the value of the variable.
	 * @returnThe value of the variable.
	 */
	value(): number {
		return this.#val;
	}

	/**
	 * Collects the variables connected via the associated constraints.
	 * @return An array of variables
	 */
	neighbors(): Variable[] {
		const vs: Variable[] = [];
		for (const c of this.#cons) {
			for (const v of c) {
				if (v !== this) vs.push(v);
			}
		}
		return vs;
	}

}
