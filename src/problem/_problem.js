/**
 * The class represents a constraint satisfaction problem.
 *
 * @author Takuto Yanagida
 * @version 2023-04-11
 */

class Problem {

	_isFuzzy = false;
	_vars    = [];
	_cons    = [];

	// Generation Methods --------

	/**
	 * Adds a variable to this problem.
	 * @param Variable v A variable.
	 */
	addVariable(v) {
		v.setIndex(this._vars.length);
		this._vars.push(v);
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
	createDomain(args) {
		if (args.values) {
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
	createVariable(args) {
		if (args.value && !args.domain.contains(args.value)) {
			throw new Error();
		}
		const v = new Variable(this, args.domain);
		this.addVariable(v);
		if (args.name) v.setName(args.name);
		if (args.value) v.assign(args.value);
		return v;
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
	createConstraint(args) {
		for (const v of args.variables) {
			if (v.owner() !== this) return null;
		}
		let c;
		if (args.variables.length === 1)      c = new Constraint1(args.relation, ...args.variables);
		else if (args.variables.length === 2) c = new Constraint2(args.relation, ...args.variables);
		else if (args.variables.length === 3) c = new Constraint3(args.relation, ...args.variables);
		else c = new ConstraintN(args.relation, args.variables);
		c.setIndex(this._cons.length);
		this._cons.push(c);
		for (const v of args.variables) v.connect(c);
		if (c.isFuzzy()) this._isFuzzy = true;
		if (args.name) c.setName(args.name);
		return c;
	}

	//  Modification Methods --------

	/**
	 * Remove the constraint.
	 * @param c Constraints to be removed.
	 */
	removeConstraint(c) {
		const index = this._cons.indexOf(c);
		this._cons.remove(c);
		for (let i = index; i < this._cons.length; ++i) {
			this._cons[i].setIndex(i);
		}
		for (let i = 0; i < c.size(); ++i) {
			c.at(i).disconnect(c);
		}
		this._isFuzzy = false;
		for (let i = 0, n = this._cons.length; i < n; ++i) {
			if (this._cons[i].isFuzzy()) {
				this._isFuzzy = true;
				break;
			}
		}
	}

	/**
	 * Changes the status of all variables to unassigned.
	 */
	clearAllVariables() {
		for (const v of this._vars) {
			v.clear();
		}
	}

	/**
	 * Reverse the order of variables.
	 * The index of each variable is reassigned.
	 */
	reverseVariables() {
		this._vars.reverse();
		for (let i = 0, n = this._vars.length; i < n; ++i) {
			this._vars[i].setIndex(i);
		}
	}

	/**
	 * Sorts variables using a specified comparator.
	 * The index of each variable is reassigned.
	 * @param comparator A comparator.
	 */
	sortVariables(comparator) {
		this._vars.sort(comparator);
		for (let i = 0, n = this._vars.length; i < n; ++i) {
			this._vars[i].setIndex(i);
		}
	}

	// Methods for Variables --------

	/**
	 * Returns the number of variables in the problem.
	 * @return Number of variables
	 */
	variableSize() {
		return this._vars.length;
	}

	/**
	 * Returns a variable by index.
	 * @param index Index (0 <= index < getVariableSize()).
	 * @return A variable
	 */
	variableAt(index) {
		return this._vars[index];
	}

	/**
	 * Returns a variable by name.
	 * @param name Name.
	 * @return A variable.
	 */
	variableOf(name) {
		for (const v of this._vars) {
			if (v.name() === name) return v;
		}
		return null;
	}

	/**
	 * Returns whether the variable is contained or not.
	 * @param v A variable.
	 * @return True if contained.
	 */
	hasVariable(v) {
		return this._vars.includes(v);
	}

	/**
	 * Returns the list of variables.
	 * The returned list is not allowed to be modified.
	 * @return The variable list.
	 */
	variables() {
		return this._vars;
	}

	// Methods for Constraints --------

	/**
	 * Gets the number of constraints in the problem.
	 * @return Number of constraints
	 */
	constraintSize() {
		return this._cons.length;
	}

	/**
	 * Returns a constraint with an index.
	 * @param index Index (0 <= index < constraintSize()).
	 * @return A constraint.
	 */
	constraintAt(index) {
		return this._cons[index];
	}

	/**
	 * Returns a constraint by name.
	 * @param name Name.
	 * @return A constraint.
	 */
	constraintOf(name) {
		for (const c of this._cons) {
			if (c.name() === name) return c;
		}
		return null;
	}

	/**
	 * Returns whether the constraint is contained or not.
	 * @param c A constraint
	 * @return True if contained.
	 */
	hasConstraint(c) {
		return this._cons.includes(c);
	}

	/**
	 * Returns the list of constraint.
	 * The returned list is not allowed to be modified.
	 * @return The constraint list.
	 */
	constraints() {
		return this._cons;
	}

	/**
	 * Gets the constraints that exist between the specified variables.
	 * Returns an empty array if no constraints exist.
	 * If there are multiple constraints between two variables (including the case of n-ary constraints (2 < n)), they will be included in the return array.
	 * @param v1 Variable 1
	 * @param v2 Variable 2
	 * @return Constraints.
	 */
	constraintsBetween(v1, v2) {
		const cs = [];
		for (const c of v1) {
			if (c.has(v2)) cs.push(c);
		}
		return cs;
	}

	/**
	 * Finds the set of worst satisfiable constraints in a fuzzy constraint satisfaction problem.
	 * @return Array of constraints and worst satisfaction degree.
	 */
	constraintsWithWorstSatisfactionDegree() {
		const cs = [];
		let cur = 1;
		for (const c of this._cons) {
			const s = c.satisfactionDegree();
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
	worstSatisfactionDegree() {
		let cs = 1;
		for (const c of this._cons) {
			const s = c.satisfactionDegree();
			if (s === Constraint.UNDEFINED) return Constraint.UNDEFINED;
			if (s < cs) cs = s;
		}
		return cs;
	}

	/**
	 * Gets the average of satisfaction degrees of the fuzzy constraints.
	 * @return Average of satisfaction degrees.
	 */
	averageSatisfactionDegree() {
		let ave = 0;
		for (const c of this._cons) {
			ave += c.satisfactionDegree();
		}
		ave = ave / this._cons.length;
		return ave;
	}

	/**
	 * Returns the number of variables in the problem that have not been assigned a value.
	 * @return Number of variables with no value assigned.
	 */
	emptyVariableSize() {
		let num = 0;
		for (const v of this._vars) {
			if (v.isEmpty()) num++;
		}
		return num;
	}

	/**
	 * Gets the constraint density (number of constraints/number of variables).
	 * @return Constraint density.
	 */
	constraintDensity() {
		return this.constraintSize() / this.variableSize();
	}

	/**
	 * Returns whether the constraint satisfaction problem has any variables with empty domain.
	 * @return True if it exists.
	 */
	hasEmptyDomain() {
		for (const v of this._vars) {
			if (v.domain().size() === 0) return true;
		}
		return false;
	}

	/**
	 * Returns whether the problem is a fuzzy constraint satisfaction problem, i.e., whether it contains fuzzy constraints.
	 * @return True if it is a fuzzy constraint satisfaction problem.
	 */
	isFuzzy() {
		return this._isFuzzy;
	}

}
