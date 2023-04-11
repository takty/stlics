/**
 * This class implements the forward checking method for fuzzy CSP.
 * The minimum-remaining-values (MRV) heuristic can also be used by specifying the option.
 * Each variable must have its own domain because it hides domain elements as branch pruning.
 * Forward checking is also performed for problems with polynomial constraints.
 *
 * @author Takuto Yanagida
 * @version 2023-04-11
 */

class FuzzyForwardChecking extends Solver {

	static CONTINUE  = 0;
	static TERMINATE = 1;

	#vars;
	#sol = new AssignmentList();
	#relCons;  // Table to cache constraints between two variables.

	#solWorstDeg = 0;  // Degree of existing solutions (no need to find a solution less than this).

	#iterCount;
	#endTime;
	#useMRV = false;
	#degInc = 0;

	#sequence;
	#unaryCons;
	#checkedCons;
	#pruneIntensively = false;

	/**
	 * Generates the solver given a fuzzy constraint satisfaction problem.
	 * @param p A fuzzy problem.
	 * @param worstSatisfactionDegree Worst satisfaction degree.
	 */
	constructor(p, worstSatisfactionDegree = null) {
		super(p);
		this.#vars = [...this._pro.variables()];
		this.#sequence = new Array(this._pro.variableSize());
		this.#initializeRelatedConstraintTable();
		this.#checkedCons = new Array(this._pro.constraintSize());

		const temp = [];
		for (const c of this._pro.constraints()) {
			if (c.size() === 1) temp.push(c);
		}
		this.#unaryCons = [...temp];  // To make it even if it is empty.
		if (worstSatisfactionDegree) {
			this.#solWorstDeg = worstSatisfactionDegree;
		}
	}

	name() {
		return 'Forward Checking for Fuzzy CSPs';
	}

	// Initializes a table that caches constraints between two variables.
	#initializeRelatedConstraintTable() {
		this.#relCons = [];

		for (let j = 0; j < this.#vars.length; ++j) {
			this.#relCons.push(new Array(this.#vars.length));

			for (let i = 0; i < this.#vars.length; i++) {
				if (i < j) {
					this.#relCons[j][i] = this._pro.constraintsBetween(this.#vars[i], this.#vars[j]);
				}
			}
		}
	}

	// Retrieves an array of constraints from a table that caches constraints between two variables.
	#getConstraintsBetween(vi_index, vj_index) {
		if (vi_index < vj_index) {
			return this.#relCons[vj_index][vi_index];
		}
		return this.#relCons[vi_index][vj_index];
	}

	// Prune elements of the domain that make the unary constraint worse than the current worst degree.
	#pruneUnaryConstraints() {
		for (const c of this.#unaryCons) {
			const v      = c.at(0);
			const orgVal = v.value();  // Save the value.
			const d      = v.domain();
			const dc     = v.solverObject;

			for (let i = 0, n = d.size(); i < n; ++i) {
				v.assign(d.at(i));
				if (c.satisfactionDegree() <= this.#solWorstDeg) {
					dc.hide(i, -1);  // Here's a branch pruning!
				}
			}
			v.assign(orgVal);  // Restore the value.
			if (dc.isEmpty()) return false;
		}
		return true;
	}

	// Check for consistency between the current variable and one future variable, and prune elements of the domain that are inconsistent (when there is one unassigned variable in the scope of the constraint).
	#checkForwardConsistency(level, vi, c) {
		const di  = vi.domain();
		const dci = vi.solverObject;

		for (let i = 0, n = di.size(); i < n; ++i) {
			if (dci.isValueHidden(i)) continue;
			vi.assign(di.at(i));
			if (c.satisfactionDegree() <= this.#solWorstDeg) {  // It is not a solution when it is 'smaller than or equals'.
				dci.hide(i, level);  // Here's a branch pruning!
			}
		}
		vi.clear();
		return !dci.isEmpty();  // Succeeds if the domain di of the future variable vi is not empty.
	}

	// Check for consistency between the current variable and one future variable, and prune elements of the domain that are inconsistent (when there are two unassigned variables in the scope of the constraint).
	#checkForwardConsistency2(level, vi, c) {
		const di  = vi.domain();
		const dci = vi.solverObject;
		const vj  = null;

		for (const v of c) {
			if (v.isEmpty() && v !== vi) {
				vj = v;
				break;
			}
		}
		const dj  = vj.domain();
		const dcj = vj.solverObject;
		loop_i: for (let i = 0, ni = di.size(); i < ni; ++i) {
			if (dci.isValueHidden(i)) continue;
			vi.assign(di.at(i));  // Tentative assignment to vi
			for (let j = 0, nj = dj.size(); j < nj; ++j) {
				if (dcj.isValueHidden(j)) continue;
				vj.assign(dj.at(j));  // Tentative assignment to vj
				const s = c.satisfactionDegree();
				if (s > this.#solWorstDeg) continue loop_i;  // Tentative assignment to vi was OK -> next tentative assignment.
			}
			dci.hide(i, level);  // It is not a solution when it is 'smaller than or equals'.
		}
		vj.clear();
		vi.clear();
		return !dci.isEmpty();  // Succeeds if the domain di of the future variable vi is not empty.
	}

	// Check for consistency between the current variable and one future variable, and prune elements of the domain that are inconsistent (when there are three unassigned variables in the scope of the constraint).
	#checkForwardConsistency3(level, vi, c) {
		const di  = vi.domain();
		const dci = vi.solverObject;

		let vj = null;
		let vk = null;

		for(let i = 0, n = c.size(); i < n; ++i) {
			let v = c.at(i);
			if (v.isEmpty() && v !== vi) {
				if (vj === null) {
					vj = v;
				} else {
					vk = v;
					break;
				}
			}
		}
		const dj  = vj.domain();
		const dk  = vk.domain();
		const dcj = vj.solverObject;
		const dck = vk.solverObject;

		loop_i: for(let i = 0, ni = di.size(); i < ni; ++i) {
			if (dci.isValueHidden(i)) continue;
			vi.assign(di.at(i));  // Tentative assignment to vi
			for (let j = 0, nj = dj.size(); j < nj; ++j) {
				if (dcj.isValueHidden(j)) continue;
				vj.assign(dj.at(j));  // Tentative assignment to vj
				for (let k = 0, nk = dk.size(); k < nk; ++k) {
					if (dck.isValueHidden(k)) continue;
					vk.assign(dk.at(k));  // Tentative assignment to vk
					const s = c.satisfactionDegree();
					if (s > this.#solWorstDeg) continue loop_i;  // Tentative assignment to vi was OK -> next tentative assignment.
				}
			}
			dci.hide(i, level);  // It is not a solution when it is 'smaller than or equals'.
		}
		vk.clear();
		vj.clear();
		vi.clear();
		return !dci.isEmpty();  // Succeeds if the domain di of the future variable vi is not empty.
	}

	// In the case of polynomial constraints and when there are four or more unassigned variables, all combinations of assignments of unassigned variables are examined and pruned.
	#checkForwardConsistencyN(level, vi, c, emptySize) {
		const di  = vi.domain();
		const dci = vi.solverObject;
		const emp = new Array(emptySize - 1);
		let j = 0;

		for (let i = 0, n = c.size(); i < n; ++i) {
			const v = c.at(i);
			if(v.isEmpty() && v !== vi) emp[j++] = v;
		}
		const indexes = new Array(emp.length);

		loop_i: for (let i = 0, n = di.size(); i < n; ++i) {
			if (dci.isValueHidden(i)) continue;
			vi.assign(di.at(i));  // Tentative assignment to vi
			indexes.fill(0);

			comLoop: while (true) {
				let hidden = false;
				for (let k = 0; k < emp.length; ++k) {
					const dk  = emp[k].domain();
					const dck = emp[k].solverObject;
					if (dck.isValueHidden(indexes[k])) {
						hidden = true;
						break;
					}
					emp[k].assign(dk.at(indexes[k]));
				}
				if (!hidden) {
					const s = c.satisfactionDegree();
					if (s > this.#solWorstDeg) continue loop_i;  // Tentative assignment to vi was OK -> next tentative assignment.
				}
				for (let k = 0; k < emp.length; ++k) {
					indexes[k]++;
					if (indexes[k] < emp[k].domain().size()) break;
					indexes[k] = 0;
					if (k === emp.length - 1) break comLoop;
				}
			}
			dci.hide(i, level);
		}
		for (const v of emp) v.clear();
		vi.clear();
		return !dci.isEmpty();  // Succeeds if the domain di of the future variable vi is not empty.
	}

	// Checks for possible assignment to a future variable from the current variable assignment.
	#checkForward(level, index) {
		for (const v_i of  this.#vars) {
			if (!v_i.isEmpty()) continue;  // If it is a past or present variable.

			const cs = this.#getConstraintsBetween(index, v_i.index());

			for (const c of cs) {
				const emptySize = c.emptyVariableSize();
				if (emptySize === 1) {
					if (!this.#checkForwardConsistency(level, v_i, c)) return false;
				} else if (this.#pruneIntensively) {  // Depends on options
					if (emptySize === 2) {
						if(!this.#checkForwardConsistency2(level, v_i, c)) return false;
					} else if(emptySize === 3) {
						if(!this.#checkForwardConsistency3(level, v_i, c)) return false;
					} else if(emptySize > 3) {
						if(!this.#checkForwardConsistencyN(level, v_i, c, emptySize)) return false;
					}
				}
			}
		}
		return true;
	}

	// Checks to see if the current variable assignment makes the degree of the past variable worse than the current worst degree.
	#checkBackwardConsistency(vc) {
		this.#checkedCons.fill(false);  // Reuse.

		for (let i = 0; i < this.#vars.length; ++i) {  // Find past variables.
			const vi = this.#vars[i];
			if (vi === vc || vi.isEmpty()) continue;  // If it is a future variable or a present variable.
			const cs = this.#getConstraintsBetween(vc.index(), i);

			for (const c of cs) {
				if (this.#checkedCons[c.index()]) continue;  // Because of the possibility of duplication in polynomial constraints
				const s = c.satisfactionDegree();
				if (s !== Constraint.UNDEFINED && s <= this.#solWorstDeg) {  // It is not a solution when it is 'smaller than or equals'.
					return false;
				}
				this.#checkedCons[c.index()] = true;
			}
		}
		return true;
	}

	#refresh() {
		for(let i = 0; i < this.#sequence.length; ++i) {
			const index_vi = this.#sequence[i].index();

			for (let j = i + 1; j < this.#sequence.length; ++j) {
				const vj = this.#sequence[j];
				const cs = this.#getConstraintsBetween(index_vi, vj.index());

				for (const c of cs) {
					const orgVal = vj.value();
					const dj     = vj.domain();
					const dcj    = vj.solverObject;

					for (let k = 0, n = dj.size(); k < n; ++k) {
						if (dcj.isValueHidden(k)) continue;
						vj.assign(dj.at(k));
						if (c.satisfactionDegree() <= this.#solWorstDeg) {
							dcj.hide(k, i);  // Here's a branch pruning!
						}
					}
					vj.assign(orgVal);
				}
			}
		}
	}

	// Returns the index of the smallest domain variable.
	#indexOfVariableWithMRV() {
		let index = 0;
		let size  = Number.MAX_VALUE;

		for (let i = 0; i < this.#vars.length; ++i) {
			const v = this.#vars[i];
			if (!v.isEmpty()) continue;
			const d = v.domain();
			const s = d.size() - v.solverObject.hiddenSize();
			if (s < size) {
				size  = s;
				index = i;
			}
		}
		return index;
	}

	// Performs search one variable at a time.
	#branch(level) {
		let bc = FuzzyForwardChecking.CONTINUE;
		const vc_index = this.#useMRV ? this.#indexOfVariableWithMRV() : level;
		const vc       = this.#vars[vc_index];
		const d        = vc.domain();
		const dc       = vc.solverObject;
		this.#sequence[level] = vc;

		for (let i = 0, n = d.size(); i < n; ++i) {
			if (dc.isValueHidden(i)) continue;
			if ((this._iterLimit && this._iterLimit < this.#iterCount++) || this.#endTime < Date.now()) {
				bc = FuzzyForwardChecking.TERMINATE;  // Search terminated due to restrictions.
				break;
			}
			vc.assign(d.at(i));

			for (const v of this.#vars) v.solverObject.reveal(level);
			if (!this.#checkBackwardConsistency(vc)) continue;
			if (!this.#checkForward(level, vc_index)) continue;

			const nextLevel = level + 1;
			bc = (nextLevel === this.#vars.length - 1) ? this.#branchLast(nextLevel) : this.#branch(nextLevel);
			if (bc === FuzzyForwardChecking.TERMINATE) break;
		}
		if (bc === FuzzyForwardChecking.CONTINUE) {  // When searching back to the parent, undo the branch pruning here.
			for (const v of this.#vars) v.solverObject.reveal(level);
		}
		vc.clear();
		return bc;
	}

	// Performs search on the last variable.
	#branchLast(level) {
		let bc = FuzzyForwardChecking.CONTINUE;
		const vc = this.#vars[this.#useMRV ? this.#indexOfVariableWithMRV() : level];
		const d  = vc.domain();
		const dc = vc.solverObject;
		this.#sequence[level] = vc;

		for (let i = 0, n = d.size(); i < n; ++i) {
			if (dc.isValueHidden(i)) continue;
			if ((this._iterLimit && this._iterLimit < this.#iterCount++) || this.#endTime < Date.now()) {
				bc = FuzzyForwardChecking.TERMINATE;  // Search terminated due to restrictions.
				break;
			}
			vc.assign(d.at(i));

			const deg = this._pro.worstSatisfactionDegree();
			if (deg > this.#solWorstDeg) {  // A new solution is assumed when 'greater than'.
				this.#solWorstDeg = deg;
				this.#sol.setProblem(this._pro);
				bc = FuzzyForwardChecking.TERMINATE;
				if (this._targetDeg !==  null && this._targetDeg <= this.#solWorstDeg) {  // Search ends when target is reached
					break;
				}
				this.#pruneUnaryConstraints();
				this.#refresh();
			}
		}
		vc.clear();
		return bc;
	}

	// Do search.
	exec() {
		this.#endTime   = (this._timeLimit === null) ? Number.MAX_VALUE : (Date.now() + this._timeLimit);
		this.#iterCount = 0;

		for (const v of this.#vars) {
			v.solverObject = new DomainPruner(v.domain().size());  // Generation of domain pruners.
		}
		this._pro.clearAllVariables();
		if (!this.#pruneUnaryConstraints()) return false;  // Since _worstSatisfactionDegree_ has been updated, call this function.

		let success = false;
		while (true) {
			const bc = this.#branch(0);
			if (bc === FuzzyForwardChecking.TERMINATE) {
				if (this._iterLimit && this._iterLimit < this.#iterCount++) {
					if (this._debug) console.log('stop: number of iterations has reached the limit');
					break;
				}
				if (this.#endTime < Date.now()) {
					if (this._debug) console.log('stop: time limit has been reached');
					break;
				}
			}
			if (this.#sol.isEmpty()) {
				break;
			}
			if (this._debug) {
				console.log(`\tfound a solution: ${this.#solWorstDeg}`);
			}
			if (this.foundSolution(this.#sol, this.#solWorstDeg)) {  // Call hook
				success = true;
				break;
			}
			if (this._targetDeg === null) {  // Degree not specified
				success = true;
				this.#solWorstDeg += this.#degInc;  // Find the next solution within the limit.
			} else if (this._targetDeg <= this.#solWorstDeg) {  // The current degree exceeded the specified degree.
				if (this._debug) console.log('stop: current degree is above the target');
				success = true;
				break;
			}
			for (const v of this.#vars) v.solverObject.revealAll();
		}
		this.#sol.apply();
		for (const v of this.#vars) v.solverObject = null;  // Delete branch pruner
		return success;
	}

	/**
	 * Constraint satisfaction degree is set as an achievement goal that serves as a condition for stopping the solver.
	 * The solver stops as successful when the specified degree is reached or exceeded.
	 * The default (unset) is 0.8.
	 * @param rate Degree. null indicates not set.
	 */
	setTargetRate(rate = null) {
		this._targetDeg = rate;
		if (this._targetDeg === null) {
			this.#solWorstDeg = 0;
		} else {
			// Find the worstSatisfactionDegree_ that is slightly smaller than the targetDegree_.
			let e = Number.MIN_VALUE
			this.#solWorstDeg = this._targetDeg - e;
			while (this.#solWorstDeg >= this._targetDeg) {
				e *= 10;
				this.#solWorstDeg = this._targetDeg - e;
			}
		}
	}

	/**
	 * Specify whether to use the minimum-remaining-values (MRV) heuristic.
	 * Use of MRV may increase processing time for some problems.
	 * Default is false.
	 * @param flag Use MRV if true.
	 */
	setUsingMinimumRemainingValuesHeuristics(flag) {
		this.#useMRV = flag;
	}

	/**
	 * If a solution is found and the search continues, it specifies how much the worst constraint satisfaction degree should be increased.
	 * @param degree Increasing constraint satisfaction degree.
	 */
	setIncrementStepOfWorstSatisfactionDegree(degree) {
		this.#degInc = degree;
	}

	/**
	 * Specifies whether or not to intensively prune branches when the problem contains 3- or n-ary constraints.
	 * Depending on the problem, intensive pruning may increase processing time.
	 * Default is false.
	 * @param flag Whether or not to intensively prune branches.
	 */
	setIntensivePruning(flag) {
		this.#pruneIntensively = flag;
	}

}
