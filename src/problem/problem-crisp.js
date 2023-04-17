/**
 * The class represents a crisp constraint satisfaction problem.
 *
 * @author Takuto Yanagida
 * @version 2023-04-16
 */

import { Problem } from './problem.js';
import { FuzzyRelation } from './relation-fuzzy.js';

export class CrispProblem extends Problem {

	/**
	 * Generates a crisp constraint.
	 * @param Array args {
	 *   @type string   'name'      Display name.
	 *   @type Array    'variables' Variables.
	 *   @type Relation 'relation'  A relation.
	 * }
	 * @return A constraint.
	 */
	createConstraint(args) {
		if (args.relation instanceof FuzzyRelation) throw new Error();
		return super.createConstraint(args);
	}

	/**
	 * Returns whether the problem is a fuzzy constraint satisfaction problem, i.e., whether it contains fuzzy constraints.
	 * @return Always returns false.
	 */
	isFuzzy() {
		return false;
	}

	/**
	 * Returns the rate of constraints that are satisfied out of all constraints.
	 * @return Rate of satisfied constraints.
	 */
	satisfiedConstraintRate() {
		return this.satisfiedConstraintSize() / this._cons.length;
	}

	/**
	 * Returns the number of satisfied constraints.
	 * Undefined constraints are ignored.
	 * @return Number of satisfied constraints.
	 */
	satisfiedConstraintSize() {
		let count = 0;
		for (const c of this._cons) {
			if (c.isSatisfied() === 1) ++count;
		}
		return count;
	}

	/**
	 * Returns a list of violating constraints.
	 * Undefined constraints are ignored.
	 * @return Array of constraints.
	 */
	violatingConstraints() {
		const cs = [];
		for (const c of this._cons) {
			if (c.isSatisfied() === 0) cs.push(c);
		}
		return cs;
	}

	/**
	 * Returns the number of violating constraints.
	 * Undefined constraints are ignored.
	 * @return Number of violating constraints.
	 */
	violatingConstraintSize() {
		let count = 0;
		for (const c of this._cons) {
			if (c.isSatisfied() === 0) ++count;
		}
		return count;
	}

}
