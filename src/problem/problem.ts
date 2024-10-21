/**
 * The class represents a constraint satisfaction problem.
 *
 * @author Takuto Yanagida
 * @version 2024-10-21
 */

import { Variable } from './variable';
import { Domain } from './domain';
import { DomainRanged } from './domain-ranged';
import { DomainArbitrary } from './domain-arbitrary';
import { Constraint } from './constraint';
import { Constraint1 } from './constraint-1';
import { Constraint2 } from './constraint-2';
import { Constraint3 } from './constraint-3';
import { ConstraintN } from './constraint-n';
import { Relation } from './relation';

export class Problem {

	#fv: (o: Problem, d: Domain) => Variable = (o: Problem, d: Domain): Variable => new Variable(o, d);
	#fc: (r: Relation, xs: Variable[]) => Constraint = (r: Relation, xs: Variable[]): Constraint => {
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
	};

	#isFuzzy: boolean = false;
	#xs: Variable[] = [];
	#cs: Constraint[] = [];

	// Methods for Modifying Factories --------

	/**
	 * Sets a variable factory.
	 */
	setVariableFactory(fn: (o: Problem, d: Domain) => Variable): void {
		this.#fv = fn;
	}

	/**
	 * Sets a variable factory.
	 */
	setConstraintFactory(fn: (r: Relation, xs: Variable[]) => Constraint): void {
		this.#fc = fn;
	}

	// Generation Methods --------

	/**
	 * Adds a variable to this problem.
	 * @param Variable v A variable.
	 */
	addVariable(x: Variable): void {
		x.setIndex(this.#xs.length);
		this.#xs.push(x);
	}

	/**
	 * Generates a domain.
	 * @param args {
	 *   @type Array 'values' Multiple values.
	 *
	 *   @type Number 'min' Minimum value.
	 *   @type Number 'max' Maximum value.
	 * }
	 * @return A domain.
	 */
	createDomain(args: { values: number[]; } | { min: number, max: number; }): Domain | null {
		if ('values' in args) {
			return new DomainArbitrary(args.values);
		} else if ('min' in args && 'max' in args) {
			return new DomainRanged(args.min, args.max);
		}
		return null;
	}

	/**
	 * Generates a variable.
	 * @param Array args {
	 *   @type string 'name'   Display name.
	 *   @type Domain 'domain' A domain.
	 *   @type *      'value'  A value.
	 * }
	 * @return A variable.
	 */
	createVariable(args: { name: string, domain: Domain, value?: number; } | { variable: Variable; }): Variable {
		if ('variable' in args) {
			const x: Variable = this.#fv(this, args.variable.domain());
			this.addVariable(x);
			x.setName(x.name());
			x.assign(x.value());
			return x;
		} else {
			if (args.value !== undefined && !args.domain.contains(args.value)) {
				throw new Error();
			}
			const x: Variable = this.#fv(this, args.domain);
			this.addVariable(x);
			if (args.name) {
				x.setName(args.name);
			}
			if (args.value) {
				x.assign(args.value);
			}
			return x;
		}
	}

	/**
	 * Generates a constraint.
	 * @param Array args {
	 *   @type string   'name'      Display name.
	 *   @type Array    'variables' Variables.
	 *   @type Relation 'relation'  A relation.
	 * }
	 * @return A constraint.
	 */
	createConstraint(args: { name?: string, variables: Variable[], relation: Relation; }): Constraint | null {
		for (const x of args.variables) {
			if (x.owner() !== this) return null;
		}
		const c: Constraint = this.#fc(args.relation, args.variables);
		c.setIndex(this.#cs.length);
		this.#cs.push(c);
		for (const x of args.variables) {
			x.connect(c);
		}
		if (c.isFuzzy()) {
			this.#isFuzzy = true;
		}
		if ('name' in args) {
			c.setName(args.name as string);
		}
		return c;
	}

	//  Modification Methods --------

	/**
	 * Remove the constraint.
	 * @param c Constraints to be removed.
	 */
	removeConstraint(c: Constraint): void {
		const index: number = this.#cs.indexOf(c);
		this.#cs.splice(index, 1);
		for (let i: number = index; i < this.#cs.length; ++i) {
			this.#cs[i].setIndex(i);
		}
		for (const x of c) {
			x.disconnect(c);
		}
		this.#isFuzzy = false;
		for (const c of this.#cs) {
			if (c.isFuzzy()) {
				this.#isFuzzy = true;
				break;
			}
		}
	}

	/**
	 * Changes the status of all variables to unassigned.
	 */
	clearAllVariables(): void {
		for (const x of this.#xs) {
			x.clear();
		}
	}

	/**
	 * Reverse the order of variables.
	 * The index of each variable is reassigned.
	 */
	reverseVariables(): void {
		this.#xs.reverse();
		for (let i: number = 0; i < this.#xs.length; ++i) {
			this.#xs[i].setIndex(i);
		}
	}

	/**
	 * Sorts variables using a specified comparator.
	 * The index of each variable is reassigned.
	 * @param comparator A comparator.
	 */
	sortVariables(comparator: (a: Variable, b: Variable) => number): void {
		this.#xs.sort(comparator);
		for (let i: number = 0; i < this.#xs.length; ++i) {
			this.#xs[i].setIndex(i);
		}
	}

	// Methods for Variables --------

	/**
	 * Returns the number of variables in the problem.
	 * @return Number of variables
	 */
	variableSize(): number {
		return this.#xs.length;
	}

	/**
	 * Returns a variable by index.
	 * @param index Index (0 <= index < getVariableSize()).
	 * @return A variable
	 */
	variableAt(index: number): Variable {
		return this.#xs[index];
	}

	/**
	 * Returns a variable by name.
	 * @param name Name.
	 * @return A variable.
	 */
	variableOf(name: string): Variable | null {
		for (const x of this.#xs) {
			if (x.name() === name) {
				return x;
			}
		}
		return null;
	}

	/**
	 * Returns whether the variable is contained or not.
	 * @param x A variable.
	 * @return True if contained.
	 */
	hasVariable(x: Variable): boolean {
		return this.#xs.includes(x);
	}

	/**
	 * Returns the list of variables.
	 * The returned list is not allowed to be modified.
	 * @return The variable list.
	 */
	variables(): Variable[] {
		return this.#xs;
	}

	// Methods for Constraints --------

	/**
	 * Gets the number of constraints in the problem.
	 * @return Number of constraints
	 */
	constraintSize(): number {
		return this.#cs.length;
	}

	/**
	 * Returns a constraint with an index.
	 * @param index Index (0 <= index < constraintSize()).
	 * @return A constraint.
	 */
	constraintAt(index: number): Constraint {
		return this.#cs[index];
	}

	/**
	 * Returns a constraint by name.
	 * @param name Name.
	 * @return A constraint.
	 */
	constraintOf(name: string): Constraint | null {
		for (const c of this.#cs) {
			if (c.name() === name) {
				return c;
			}
		}
		return null;
	}

	/**
	 * Returns whether the constraint is contained or not.
	 * @param c A constraint
	 * @return True if contained.
	 */
	hasConstraint(c: Constraint): boolean {
		return this.#cs.includes(c);
	}

	/**
	 * Returns the list of constraint.
	 * The returned list is not allowed to be modified.
	 * @return The constraint list.
	 */
	constraints(): Constraint[] {
		return this.#cs;
	}

	/**
	 * Gets the constraints that exist between the specified variables.
	 * Returns an empty array if no constraints exist.
	 * If there are multiple constraints between two variables (including the case of n-ary constraints (2 < n)), they will be included in the return array.
	 * @param v1 Variable 1
	 * @param v2 Variable 2
	 * @return Constraints.
	 */
	constraintsBetween(v1: Variable, v2: Variable): Constraint[] {
		const cs: Constraint[] = [];
		for (const c of v1) {
			if (c.has(v2)) {
				cs.push(c);
			}
		}
		return cs;
	}

	/**
	 * Finds the set of worst satisfiable constraints in a fuzzy constraint satisfaction problem.
	 * @return Array of constraints and worst satisfaction degree.
	 */
	constraintsWithWorstSatisfactionDegree(): [Constraint[], number] {
		const cs: Constraint[] = [];
		let cur: number = 1;
		for (const c of this.#cs) {
			const s: number = c.satisfactionDegree();
			if (s < cur) {
				cur = s;
				cs.length = 0;
				cs.push(c);
			} else if (s - cur < Number.MIN_VALUE * 10) {
				cs.push(c);
			}
		}
		return [cs, cur];
	}

	// State acquisition methods --------

	/**
	 * Returns the worst satisfaction degree for the constraints contained in the fuzzy constraint satisfaction problem.
	 * If the degree cannot be determined because the variable has not yet been assigned a value or for some other reason, -1 is returned.
	 * @return Worst satisfaction degree.
	 */
	worstSatisfactionDegree(): number {
		let cs: number = 1;
		for (const c of this.#cs) {
			const s: number = c.satisfactionDegree();
			if (s === Constraint.UNDEFINED) return Constraint.UNDEFINED;
			if (s < cs) cs = s;
		}
		return cs;
	}

	/**
	 * Gets the average of satisfaction degrees of the fuzzy constraints.
	 * @return Average of satisfaction degrees.
	 */
	averageSatisfactionDegree(): number {
		let ave: number = 0;
		for (const c of this.#cs) {
			ave += c.satisfactionDegree();
		}
		ave = ave / this.#cs.length;
		return ave;
	}

	/**
	 * Returns the number of variables in the problem that have not been assigned a value.
	 * @return Number of variables with no value assigned.
	 */
	emptyVariableSize(): number {
		let n: number = 0;

		for (const x of this.#xs) {
			if (x.isEmpty()) {
				n++;
			}
		}
		return n;
	}

	/**
	 * Gets the constraint density (number of constraints/number of variables).
	 * @return Constraint density.
	 */
	constraintDensity(): number {
		return this.constraintSize() / this.variableSize();
	}

	/**
	 * Returns whether the constraint satisfaction problem has any variables with empty domain.
	 * @return True if it exists.
	 */
	hasEmptyDomain(): boolean {
		for (const x of this.#xs) {
			if (x.domain().size() === 0) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Returns whether the problem is a fuzzy constraint satisfaction problem, i.e., whether it contains fuzzy constraints.
	 * @return True if it is a fuzzy constraint satisfaction problem.
	 */
	isFuzzy(): boolean {
		return this.#isFuzzy;
	}

}
