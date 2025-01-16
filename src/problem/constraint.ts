/**
 * The class represents a constraint.
 *
 * @author Takuto Yanagida
 * @version 2025-01-16
 */

import { Element } from './element';
import { Variable } from './variable';
import { Relation } from './relation';
import { FuzzyRelation } from './relation';

export abstract class Constraint extends Element {

	static create(r: Relation, xs: Variable[]): Constraint {
		if (xs.length === 1) {
			return new Constraint1(r, xs[0]);
		}
		if (xs.length === 2) {
			return new Constraint2(r, xs[0], xs[1]);
		}
		if (xs.length === 3) {
			return new Constraint3(r, xs[0], xs[1], xs[2]);
		}
		return new ConstraintN(r, ...xs);
	}

	rel: Relation;

	// Called only from Problem.
	constructor(r: Relation) {
		super();
		this.rel = r;
	}

	/**
	 * Returns the relation between variables.
	 * @return Relation.
	 */
	relation(): Relation {
		return this.rel;
	}

	/**
	 * Returns whether this is a fuzzy constraint.
	 * @return True if it is fuzzy constraint.
	 */
	isFuzzy(): boolean {
		return this.rel instanceof FuzzyRelation;
	}

	/**
	 * Returns a string representation.
	 * @return A string representation.
	 */
	toString(): string {
		const n : string = this.name();
		const np: string = n ? `(${n})` : '';
		const d : number = this.degree();
		const sn: string = d < 0 /* d === UNDEFINED */ ? 'UNDEFINED' : ('' + d);

		return `c${this.index()}${np} = ${sn}`;
	}

	/**
	 * Returns the order of the constraint, i.e., the number of (associated) variables in the scope.
	 * @return Order.
	 */
	abstract size(): number;

	/**
	 * Gets the associated variable by specifying its index.
	 * @param index Index.
	 * @return A variable.
	 */
	abstract at(index: number): Variable | undefined;

	/**
	 * Returns whether the specified variable is associated or not.
	 * @param x A variable.
	 * @return True if it is associated.
	 */
	abstract has(x: Variable): boolean;

	/**
	 * Gets the index of a specified variable.
	 * If not found, returns -1.
	 * @param x A variable.
	 * @return Index.
	 */
	abstract indexOf(x: Variable): number;

	/**
	 * Returns the set of constraints connected via the associated variables.
	 * @return A set of constraints.
	 */
	abstract neighbors(): Constraint[];

	/**
	 * Gets the iterator of the associated variables.
	 */
	abstract [Symbol.iterator](): Iterator<Variable>;


	// ----


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

	#xs: [Variable] = [] as unknown as [Variable];

	// Called only from Problem.
	constructor(r: Relation, x: Variable) {
		super(r);
		this.#xs = [x];
	}

	size(): number {
		return 1;
	}

	at(index: number): Variable | undefined {
		return this.#xs.at(index);
	}

	has(x: Variable): boolean {
		return x === this.#xs[0];
	}

	indexOf(x: Variable): number {
		return (x === this.#xs[0]) ? 0 : -1;
	}

	neighbors(): Constraint[] {
		const cs: Constraint[] = [];

		for (const c of this.#xs[0]) {
			if (c !== this) {
				cs.push(c);
			}
		}
		return cs;
	}

	[Symbol.iterator](): Iterator<Variable> {
		return this.#xs[Symbol.iterator]();
	}


	// ----


	emptyVariableSize(): number {
		return this.#xs[0].isEmpty() ? 1 : 0;
	}

	isDefined(): boolean {
		return !this.#xs[0].isEmpty();
	}

	isSatisfied(): -1 | 0 | 1 {
		if (this.#xs[0].isEmpty()) {
			return -1;  // UNDEFINED
		}
		return this.rel.isSatisfied(this.#xs[0].value()) ? 1 : 0;
	}

	degree(): number {
		if (this.#xs[0].isEmpty()) {
			return -1;  // UNDEFINED
		}
		return this.rel.degree(this.#xs[0].value());
	}

}


// -----------------------------------------------------------------------------


class Constraint2 extends Constraint {

	#xs: [Variable, Variable] = [] as unknown as [Variable, Variable];

	// Called only from Problem.
	constructor(r: Relation, x1: Variable, x2: Variable) {
		super(r);
		this.#xs = [x1, x2];
	}

	size(): number {
		return 2;
	}

	at(index: number): Variable | undefined {
		return this.#xs.at(index);
	}

	has(x: Variable): boolean {
		return this.#xs[0] === x || this.#xs[1] === x;
	}

	indexOf(x: Variable): number {
		if (x === this.#xs[0]) return 0;
		if (x === this.#xs[1]) return 1;
		return -1;
	}

	neighbors(): Constraint[] {
		const cs: Constraint[] = [];

		for (const x of this.#xs) {
			for (const c of x) {
				if (c !== this) {
					cs.push(c);
				}
			}
		}
		return cs;
	}

	[Symbol.iterator](): Iterator<Variable> {
		return this.#xs[Symbol.iterator]();
	}


	// ----


	emptyVariableSize(): number {
		let n: number = 0;
		if (this.#xs[0].isEmpty()) ++n;
		if (this.#xs[1].isEmpty()) ++n;
		return n;
	}

	isDefined(): boolean {
		return !this.#xs[0].isEmpty() && !this.#xs[1].isEmpty();
	}

	isSatisfied(): -1 | 0 | 1 {
		if (this.#xs[0].isEmpty() || this.#xs[1].isEmpty()) {
			return -1;  // UNDEFINED
		}
		return this.rel.isSatisfied(this.#xs[0].value(), this.#xs[1].value()) ? 1 : 0;
	}

	degree(): number {
		if (this.#xs[0].isEmpty() || this.#xs[1].isEmpty()) {
			return -1;  // UNDEFINED
		}
		return this.rel.degree(this.#xs[0].value(), this.#xs[1].value());
	}

}


// -----------------------------------------------------------------------------


class Constraint3 extends Constraint {

	#xs: [Variable, Variable, Variable] = [] as unknown as [Variable, Variable, Variable];

	// Called only from Problem.
	constructor(r: Relation, x1: Variable, x2: Variable, x3: Variable) {
		super(r);
		this.#xs = [x1, x2, x3];
	}

	size(): number {
		return 3;
	}

	at(index: number): Variable | undefined {
		return this.#xs.at(index);
	}

	has(x: Variable): boolean {
		return this.#xs[0] === x || this.#xs[1] === x || this.#xs[2] === x;
	}

	indexOf(x: Variable): number {
		if (x === this.#xs[0]) return 0;
		if (x === this.#xs[1]) return 1;
		if (x === this.#xs[2]) return 2;
		return -1;
	}

	neighbors(): Constraint[] {
		const cs: Constraint[] = [];

		for (const x of this.#xs) {
			for (const c of x) {
				if (c !== this) {
					cs.push(c);
				}
			}
		}
		return cs;
	}

	[Symbol.iterator](): Iterator<Variable> {
		return this.#xs[Symbol.iterator]();
	}


	// ----


	emptyVariableSize(): number {
		let n: number = 0;
		if (this.#xs[0].isEmpty()) ++n;
		if (this.#xs[1].isEmpty()) ++n;
		if (this.#xs[2].isEmpty()) ++n;
		return n;
	}

	isDefined(): boolean {
		return !this.#xs[0].isEmpty() && !this.#xs[1].isEmpty() && !this.#xs[2].isEmpty();
	}

	isSatisfied(): -1 | 0 | 1 {
		if (this.#xs[0].isEmpty() || this.#xs[1].isEmpty() || this.#xs[2].isEmpty()) {
			return -1;  // UNDEFINED
		}
		return this.rel.isSatisfied(this.#xs[0].value(), this.#xs[1].value(), this.#xs[2].value()) ? 1 : 0;
	}

	degree(): number {
		if (this.#xs[0].isEmpty() || this.#xs[1].isEmpty() || this.#xs[2].isEmpty()) {
			return -1;  // UNDEFINED
		}
		return this.rel.degree(this.#xs[0].value(), this.#xs[1].value(), this.#xs[2].value());
	}

}


// -----------------------------------------------------------------------------


class ConstraintN extends Constraint {

	#xs: Variable[];
	#vs: number[];  // For reuse.

	// Called only from Problem.
	constructor(r: Relation, ...xs: Variable[]) {
		super(r);
		this.#xs = [...xs];
		this.#vs = new Array(this.#xs.length);
	}

	size(): number {
		return this.#xs.length;
	}

	at(index: number): Variable | undefined {
		return this.#xs.at(index);
	}

	has(x: Variable): boolean {
		return this.#xs.includes(x);
	}

	indexOf(x: Variable): number {
		return this.#xs.indexOf(x);
	}

	neighbors(): Constraint[] {
		const cs: Constraint[] = [];

		for (const x of this.#xs) {
			for (const c of x) {
				if (c !== this) {
					cs.push(c);
				}
			}
		}
		return cs;
	}

	[Symbol.iterator](): Iterator<Variable> {
		return this.#xs[Symbol.iterator]();
	}


	// ----


	emptyVariableSize(): number {
		let n: number = 0;
		for (const x of this.#xs) {
			n += x.isEmpty() ? 1 : 0;
		}
		return n;
	}

	isDefined(): boolean {
		for (const x of this.#xs) {
			if (x.isEmpty()) {
				return false;
			}
		}
		return true;
	}

	isSatisfied(): -1 | 0 | 1 {
		for (let i: number = 0; i < this.#xs.length; ++i) {
			const x: Variable = this.#xs[i];
			if (x.isEmpty()) {
				return -1;  // UNDEFINED
			}
			this.#vs[i] = x.value();
		}
		return this.rel.isSatisfied(...this.#vs) ? 1 : 0;
	}

	degree(): number {
		for (let i: number = 0; i < this.#xs.length; ++i) {
			const x: Variable = this.#xs[i];
			if (x.isEmpty()) {
				return -1;  // UNDEFINED
			}
			this.#vs[i] = x.value();
		}
		return this.rel.degree(...this.#vs);
	}

}
