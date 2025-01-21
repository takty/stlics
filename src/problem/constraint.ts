/**
 * The class that represents a constraint.
 *
 * @author Takuto Yanagida
 * @version 2025-01-21
 */

import { Element } from './element';
import { Variable } from './variable';
import { Relation } from './relation';
import { FuzzyRelation } from './relation';

export abstract class Constraint extends Element {

	static create(r: Relation, xs: Variable[]): Constraint {
		if (1 === xs.length) {
			return new Constraint1(r, xs[0]);
		}
		if (2 === xs.length) {
			return new Constraint2(r, xs[0], xs[1]);
		}
		if (3 === xs.length) {
			return new Constraint3(r, xs[0], xs[1], xs[2]);
		}
		return new ConstraintN(r, ...xs);
	}

	protected r : Relation;
	protected xs: Variable[] = [];

	// Called only from Problem.
	constructor(r: Relation) {
		super();
		this.r = r;
	}

	/**
	 * Gets a string representation.
	 * @return A string representation.
	 */
	toString(): string {
		const n : string = this.name();
		const np: string = n ? `(${n})` : '';
		const ev: number = this.degree();
		const sn: string = ev < 0 /* ev === UNDEFINED */ ? 'UNDEFINED' : ('' + ev);

		return `c${this.index()}${np} = ${sn}`;
	}

	/**
	 * Gets the order of the constraint, i.e., the number of (associated) variables in the scope.
	 * @return Order.
	 */
	size(): number {
		return this.xs.length;
	}

	/**
	 * Gets the associated variable by specifying its index.
	 * @param index Index.
	 * @return A variable.
	 */
	at(index: number): Variable | undefined {
		return this.xs.at(index);
	}

	/**
	 * Checks whether or not the specified variable is associated.
	 * @param x A variable.
	 * @return True if associated.
	 */
	has(x: Variable): boolean {
		return this.xs.includes(x);
	}

	/**
	 * Gets the index of a specified variable.
	 * If not found, returns -1.
	 * @param x A variable.
	 * @return Index.
	 */
	indexOf(x: Variable): number {
		return this.xs.indexOf(x);
	}

	/**
	 * Collects the constraints connected via the associated variables.
	 * @return An array of constraints.
	 */
	neighbors(): Constraint[] {
		const cs: Constraint[] = [];

		for (const x of this.xs) {
			for (const c of x) {
				if (c !== this) {
					cs.push(c);
				}
			}
		}
		return cs;
	}

	/**
	 * Gets the iterator of the associated variables.
	 */
	[Symbol.iterator](): Iterator<Variable> {
		return this.xs[Symbol.iterator]();
	}


	// ----


	/**
	 * Returns the relation between variables.
	 * @return Relation.
	 */
	relation(): Relation {
		return this.r;
	}

	/**
	 * Returns whether this is a fuzzy constraint.
	 * @return True if it is fuzzy constraint.
	 */
	isFuzzy(): boolean {
		return this.r instanceof FuzzyRelation;
	}

	/**
	 * Returns the number of scope variables that have not been assigned a value.
	 * @return Number of variables
	 */
	abstract emptyVariableSize(): number;

	/**
	 * Returns whether or not the satisfaction (degree) is defined.
	 * Satisfaction (degree) is defined when all associated variables have values assigned to them.
	 * @return True if it is defined.
	 */
	abstract isDefined(): boolean;

	/**
	 * Returns whether or not this constraint is satisfied.
	 * @return 1 if satisfied, 0 if not, UNDEFINED if undefined
	 */
	abstract isSatisfied(): -1 | 0 | 1;

	/**
	 * Gets the current satisfaction degree.
	 * @return Degree 0 - 1, UNDEFINED if undefined.
	 */
	abstract degree(): number;

}


// -----------------------------------------------------------------------------


class Constraint1 extends Constraint {

	// Called only from Problem.
	constructor(r: Relation, x: Variable) {
		super(r);
		this.xs = [x];
	}

	emptyVariableSize(): number {
		return this.xs[0].isEmpty() ? 1 : 0;
	}

	isDefined(): boolean {
		return !this.xs[0].isEmpty();
	}

	isSatisfied(): -1 | 0 | 1 {
		if (this.xs[0].isEmpty()) {
			return -1;  // UNDEFINED
		}
		return this.r.isSatisfied(this.xs[0].value()) ? 1 : 0;
	}

	degree(): number {
		if (this.xs[0].isEmpty()) {
			return -1;  // UNDEFINED
		}
		return this.r.degree(this.xs[0].value());
	}

}


// -----------------------------------------------------------------------------


class Constraint2 extends Constraint {

	// Called only from Problem.
	constructor(r: Relation, x1: Variable, x2: Variable) {
		super(r);
		this.xs = [x1, x2];
	}

	emptyVariableSize(): number {
		let n: number = 0;
		if (this.xs[0].isEmpty()) ++n;
		if (this.xs[1].isEmpty()) ++n;
		return n;
	}

	isDefined(): boolean {
		return !this.xs[0].isEmpty() && !this.xs[1].isEmpty();
	}

	isSatisfied(): -1 | 0 | 1 {
		if (this.xs[0].isEmpty() || this.xs[1].isEmpty()) {
			return -1;  // UNDEFINED
		}
		return this.r.isSatisfied(this.xs[0].value(), this.xs[1].value()) ? 1 : 0;
	}

	degree(): number {
		if (this.xs[0].isEmpty() || this.xs[1].isEmpty()) {
			return -1;  // UNDEFINED
		}
		return this.r.degree(this.xs[0].value(), this.xs[1].value());
	}

}


// -----------------------------------------------------------------------------


class Constraint3 extends Constraint {

	// Called only from Problem.
	constructor(r: Relation, x1: Variable, x2: Variable, x3: Variable) {
		super(r);
		this.xs = [x1, x2, x3];
	}

	emptyVariableSize(): number {
		let n: number = 0;
		if (this.xs[0].isEmpty()) ++n;
		if (this.xs[1].isEmpty()) ++n;
		if (this.xs[2].isEmpty()) ++n;
		return n;
	}

	isDefined(): boolean {
		return !this.xs[0].isEmpty() && !this.xs[1].isEmpty() && !this.xs[2].isEmpty();
	}

	isSatisfied(): -1 | 0 | 1 {
		if (this.xs[0].isEmpty() || this.xs[1].isEmpty() || this.xs[2].isEmpty()) {
			return -1;  // UNDEFINED
		}
		return this.r.isSatisfied(this.xs[0].value(), this.xs[1].value(), this.xs[2].value()) ? 1 : 0;
	}

	degree(): number {
		if (this.xs[0].isEmpty() || this.xs[1].isEmpty() || this.xs[2].isEmpty()) {
			return -1;  // UNDEFINED
		}
		return this.r.degree(this.xs[0].value(), this.xs[1].value(), this.xs[2].value());
	}

}


// -----------------------------------------------------------------------------


class ConstraintN extends Constraint {

	#vs: number[];  // For reuse.

	// Called only from Problem.
	constructor(r: Relation, ...xs: Variable[]) {
		super(r);
		this.xs = [...xs];
		this.#vs = new Array(this.xs.length);
	}

	emptyVariableSize(): number {
		let n: number = 0;
		for (const x of this.xs) {
			n += x.isEmpty() ? 1 : 0;
		}
		return n;
	}

	isDefined(): boolean {
		for (const x of this.xs) {
			if (x.isEmpty()) {
				return false;
			}
		}
		return true;
	}

	isSatisfied(): -1 | 0 | 1 {
		for (let i: number = 0; i < this.xs.length; ++i) {
			const x: Variable = this.xs[i];
			if (x.isEmpty()) {
				return -1;  // UNDEFINED
			}
			this.#vs[i] = x.value();
		}
		return this.r.isSatisfied(...this.#vs) ? 1 : 0;
	}

	degree(): number {
		for (let i: number = 0; i < this.xs.length; ++i) {
			const x: Variable = this.xs[i];
			if (x.isEmpty()) {
				return -1;  // UNDEFINED
			}
			this.#vs[i] = x.value();
		}
		return this.r.degree(...this.#vs);
	}

}
