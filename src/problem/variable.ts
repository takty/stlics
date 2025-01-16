/**
 * Class that represents a variable.
 *
 * @author Takuto Yanagida
 * @version 2025-01-16
 */

import { Problem } from './problem';
import { Element } from './element';
import { Constraint } from './constraint';
import { Domain } from './domain';

export class Variable extends Element {

	static readonly #INVALID: number = Number.MIN_VALUE;

	#owner: Problem;

	#d: Domain;
	#v: number = Variable.#INVALID;
	#cs: Constraint[] = [];

	// Called only from Problem.
	constructor(owner: Problem, d: Domain) {
		super();
		this.#owner = owner;
		this.#d     = d;
	}

	/**
	 * Gets a string representation.
	 * @return A string representation.
	 */
	toString(): string {
		const n : string = this.name();
		const np: string = n ? `(${n})` : '';
		const v : string = this.isEmpty() ? '<empty>' : ('' + this.value());

		return `x${this.index()}${np} = ${v}`;
	}

	/**
	 * Gets the number of associated constraints.
	 * @return Number of constraints.
	 */
	size(): number {
		return this.#cs.length;
	}

	/**
	 * Gets the associated constraints by specifying their indices.
	 * @param index Index.
	 * @return A constraint.
	 */
	at(index: number): Constraint | undefined {
		return this.#cs.at(index);
	}

	/**
	 * Checks whether or not the variable is associated with the specified constraint.
	 * @param c A constraint.
	 * @return True if associated.
	 */
	has(c: Constraint): boolean {
		return this.#cs.includes(c);
	}

	/**
	 * Gets the index of a specified constraint.
	 * If not found, returns -1.
	 * @param c A constraint.
	 * @return Index.
	 */
	indexOf(c: Constraint): number {
		return this.#cs.indexOf(c);
	}

	/**
	 * Collects the variables connected via the associated constraints.
	 * @return An array of variables
	 */
	neighbors(): Variable[] {
		const xs: Variable[] = [];

		for (const c of this.#cs) {
			for (const x of c) {
				if (x !== this) {
					xs.push(x);
				}
			}
		}
		return xs;
	}

	/**
	 * Gets the iterator of the associated constraints.
	 */
	[Symbol.iterator](): Iterator<Constraint> {
		return this.#cs[Symbol.iterator]();
	}


	// -------------------------------------------------------------------------


	/**
	 * Gets the problem that owns this variable.
	 * @return Owner.
	 */
	owner(): Problem {
		return this.#owner;
	}

	// Called only from Problem.
	connect(c: Constraint): void {
		if (this.#cs.includes(c)) {
			throw new RangeError();
		}
		this.#cs.push(c);
	}

	// Called only from Problem.
	disconnect(c: Constraint): void {
		if (!this.#cs.includes(c)) {
			throw new RangeError();
		}
		this.#cs = this.#cs.filter(
			(i: Constraint): boolean => i !== c
		);
	}

	/**
	 * Gets the domain of the variable.
	 * @return The domain.
	 */
	domain(): Domain;

	/**
	 * Sets a new domain to the variable.
	 * The variable will be in unassigned state.
	 * @param d Domain to be assigned.
	 */
	domain(d: Domain): void;

	domain(d?: Domain): Domain | void {
		if (d === undefined) {
			return this.#d;
		} else {
			this.#d = d;
			this.clear();
		}
	}

	/**
	 * Assign a value.
	 * @param value Value.
	 */
	assign(value: number): void {
		this.#v = value;  // Do not change #val except here.
	}

	/**
	 * Sets the state of the variable to unassigned.
	 */
	clear(): void {
		// Do not use the invalid value except here and below (isEmpty).
		this.assign(Variable.#INVALID);
	}

	/**
	 * Gets the value of the variable.
	 * @returnThe value of the variable.
	 */
	value(): number {
		return this.#v;
	}

	/**
	 * Checks whether the value is unassigned or not.
	 * @return True if unassigned.
	 */
	isEmpty(): boolean {
		return this.value() === Variable.#INVALID;
	}

}
