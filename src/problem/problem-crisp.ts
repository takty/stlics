/**
 * The class represents a crisp constraint satisfaction problem.
 *
 * @author Takuto Yanagida
 * @version 2024-10-22
 */

import { Problem } from './problem';
import { Variable } from './variable';
import { Constraint } from './constraint';
import { Relation } from './relation';

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
	createConstraint(args: { name?: string, variables: Variable[], relation: Relation; }): Constraint | null {
		if ('satisfactionDegree' in args.relation) throw new Error();
		return super.createConstraint(args);
	}

	/**
	 * Returns whether the problem is a fuzzy constraint satisfaction problem, i.e., whether it contains fuzzy constraints.
	 * @return Always returns false.
	 */
	isFuzzy(): boolean {
		return false;
	}

	/**
	 * Returns the rate of constraints that are satisfied out of all constraints.
	 * @return Rate of satisfied constraints.
	 */
	satisfiedConstraintRate(): number {
		return this.satisfiedConstraintSize() / this.constraintSize();
	}

	/**
	 * Returns the number of satisfied constraints.
	 * Undefined constraints are ignored.
	 * @return Number of satisfied constraints.
	 */
	satisfiedConstraintSize(): number {
		let count: number = 0;

		for (const c of this.constraints()) {
			if (c.isSatisfied() === 1) {
				++count;
			}
		}
		return count;
	}

	/**
	 * Returns a list of violating constraints.
	 * Undefined constraints are ignored.
	 * @return Array of constraints.
	 */
	violatingConstraints(): Constraint[] {
		const cs: Constraint[] = [];

		for (const c of this.constraints()) {
			if (c.isSatisfied() === 0) {
				cs.push(c);
			}
		}
		return cs;
	}

	/**
	 * Returns the number of violating constraints.
	 * Undefined constraints are ignored.
	 * @return Number of violating constraints.
	 */
	violatingConstraintSize(): number {
		let size: number = 0;

		for (const c of this.constraints()) {
			if (c.isSatisfied() === 0) {
				++size;
			}
		}
		return size;
	}

}
