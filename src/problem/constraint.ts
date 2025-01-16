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

	/**
	 * The constant indicating that the satisfaction degree is not defined.
	 */
	static UNDEFINED: -1 = -1;

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
		const s : number = this.degree();
		const sn: string = s === Constraint.UNDEFINED ? 'UNDEFINED' : ('' + s);

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


	// -------------------------------------------------------------------------


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
