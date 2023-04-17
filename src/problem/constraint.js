/**
 * The class represents a constraint.
 *
 * @author Takuto Yanagida
 * @version 2023-04-11
 */

import { Element } from './element.js';
import { FuzzyRelation } from './relation-fuzzy.js';

export class Constraint extends Element {

	/**
	 * The constant indicating that the satisfaction degree is not defined.
	 */
	static UNDEFINED = -1;

	rel;

	// Called only from Problem.
	constructor(r) {
		super();
		this.rel = r;
	}

	/**
	 * Returns the crisp relation between variables.
	 * @return Relation.
	 */
	crispRelation() {
		return this.rel;
	}

	/**
	 * Returns the fuzzy relation between variables.
	 * @return Relation.
	 */
	fuzzyRelation() {
		return this.rel;
	}

	/**
	 * Returns whether this is a fuzzy constraint.
	 * @return True if it is fuzzy constraint.
	 */
	isFuzzy() {
		return this.rel instanceof FuzzyRelation;
	}

	/**
	 * Returns a string representation.
	 * @return A string representation.
	 */
	toString() {
		const s = this.satisfactionDegree();
		return `c${this.index()}${this.name() === '' ? '' : `(${this.name()})`} = ${s === Constraint.UNDEFINED ? 'UNDEFINED' : s}`;
	}

	/**
	 * Returns the order of the constraint, i.e., the number of (associated) variables in the scope.
	 * @return Order.
	 */
	size() {}

	/**
	 * Gets the associated variable by specifying its index.
	 * @param index Index.
	 * @return A variable.
	 */
	at(index) {}

	/**
	 * Gets the iterator of the associated variables.
	 */
	[Symbol.iterator]() {}

	/**
	 * Returns whether the specified variable is associated or not.
	 * @param v A variable.
	 * @return True if it is associated.
	 */
	has(v) {}

	/**
	 * Gets the index of a specified variable.
	 * If not found, returns -1.
	 * @param v A variable.
	 * @return Index.
	 */
	indexOf(v) {}

	/**
	 * Returns the number of scope variables that have not been assigned a value.
	 * @return Number of variables
	 */
	emptyVariableSize() {}

	/**
	 * Returns whether or not the satisfaction (degree) is defined.
	 * Satisfaction (degree) is defined when all associated variables have values assigned to them.
	 * @return True if it is defined.
	 */
	isDefined() {}

	/**
	 * Returns whether or not this constraint is satisfied.
	 * @return 1 if satisfied, 0 if not, UNDEFINED if undefined
	 */
	isSatisfied() {}

	/**
	 * Gets the current satisfaction degree.
	 * @return Degree 0 - 1, UNDEFINED if undefined.
	 */
	satisfactionDegree() {}

	/**
	 * Returns the set of constraints connected via the associated variables.
	 * @return A set of constraints.
	 */
	neighbors() {}

	/**
	 * Calculates the highest consistency degree.
	 * That is, it seeks the highest satisfaction degree of the possible combinations of variable assignments for a given constraint.
	 * When all associated variables have been assigned values, it returns the same value as getSatisfactionDegree().
	 * @return The highest consistency degree.
	 */
	highestConsistencyDegree() {}

	/**
	 * Calculates the lowest consistency degree.
	 * That is, it seeks the lowest satisfaction degree of the possible combinations of variable assignments for a given constraint.
	 * When all associated variables have been assigned values, it returns the same value as getSatisfactionDegree().
	 * @return The lowest consistency degree.
	 */
	lowestConsistencyDegree() {}

}
