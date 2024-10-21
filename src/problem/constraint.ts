/**
 * The class represents a constraint.
 *
 * @author Takuto Yanagida
 * @version 2024-10-21
 */

import { Element } from './element';
import { Variable } from './variable';
import { Relation } from './relation';
import { CrispRelation, FuzzyRelation } from './relation';

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
	 * Returns the crisp relation between variables.
	 * @return Relation.
	 */
	crispRelation(): CrispRelation {
		return this.rel as CrispRelation;
	}

	/**
	 * Returns the fuzzy relation between variables.
	 * @return Relation.
	 */
	fuzzyRelation(): FuzzyRelation {
		return this.rel as FuzzyRelation;
	}

	/**
	 * Returns whether this is a fuzzy constraint.
	 * @return True if it is fuzzy constraint.
	 */
	isFuzzy(): boolean {
		return 'satisfactionDegree' in this.rel;
	}

	/**
	 * Returns a string representation.
	 * @return A string representation.
	 */
	toString(): string {
		const n = this.name();
		const np = n ? `(${n})` : '';
		const s = this.satisfactionDegree();
		const sn = s === Constraint.UNDEFINED ? 'UNDEFINED' : ('' + s);

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
	abstract satisfactionDegree(): number;

	/**
	 * Calculates the highest consistency degree.
	 * That is, it seeks the highest satisfaction degree of the possible combinations of variable assignments for a given constraint.
	 * When all associated variables have been assigned values, it returns the same value as getSatisfactionDegree().
	 * @return The highest consistency degree.
	 */
	abstract highestConsistencyDegree(): number;

	/**
	 * Calculates the lowest consistency degree.
	 * That is, it seeks the lowest satisfaction degree of the possible combinations of variable assignments for a given constraint.
	 * When all associated variables have been assigned values, it returns the same value as getSatisfactionDegree().
	 * @return The lowest consistency degree.
	 */
	abstract lowestConsistencyDegree(): number;

}
