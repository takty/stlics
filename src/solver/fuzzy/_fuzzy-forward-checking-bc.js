/**
 * This class implements the forward checking method for fuzzy CSPs that contain only binary constraints.
 * The minimum-remaining-values (MRV) heuristic can also be used by specifying the option.
 *
 * @author Takuto Yanagida
 * @version 2023-04-16
 */

import { AssignmentList } from '../../util/_assignment-list.js';
import { DomainPruner } from '../../util/_domain-pruner.js';
import { Solver } from '../_solver.js';

export class FuzzyForwardCheckingBc extends Solver {

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

	/**
	 * Generates the solver given a fuzzy constraint satisfaction problem.
	 * @param p A fuzzy problem.
	 * @param worstSatisfactionDegree Worst satisfaction degree.
	 */
	constructor(p, worstSatisfactionDegree = null) {
		super(p);
		this.#vars = [...this._pro.variables()];
		this.#initializeRelatedConstraintTable();

		this.#solWorstDeg = Math.max(0, p.worstSatisfactionDegree());
		if (worstSatisfactionDegree) {
			this.#solWorstDeg = worstSatisfactionDegree;
		}
	}

	name() {
		return 'Forward Checking for Fuzzy CSPs of Binary Constraints';
	}

	foundSolution() {
		return false;
	}

	// Initializes a table that caches constraints between two variables.
	#initializeRelatedConstraintTable() {
		this.#relCons = [];

		for (let j = 0; j < this.#vars.length; ++j) {
			this.#relCons.push(new Array(this.#vars.length));

			for (let i = 0; i < this.#vars.length; ++i) {
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

	// Checks for possible assignment to a future variable from the current variable assignment.
	#checkForward(level, index) {
		for (const v_i of  this.#vars) {
			if (!v_i.isEmpty()) continue;  // If it is a past or present variable.

			const cs = this.#getConstraintsBetween(index, v_i.index());
			for (const c of cs) {
				if (c.size() === 2) {  // If it is a binary constraint.
					if (!this.#checkForwardConsistency(level, v_i, c)) return false;
				}
			}
		}
		return true;
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
		let bc = FuzzyForwardCheckingBc.CONTINUE;
		const vc_index = this.#useMRV ? this.#indexOfVariableWithMRV() : level;
		const vc       = this.#vars[vc_index];
		const d        = vc.domain();
		const dc       = vc.solverObject;

		for (let i = 0, n = d.size(); i < n; ++i) {
			if (dc.isValueHidden(i)) continue;
			if ((this._iterLimit && this._iterLimit < this.#iterCount++) || this.#endTime < Date.now()) {
				bc = FuzzyForwardCheckingBc.TERMINATE;  // Search terminated due to restrictions.
				break;
			}
			vc.assign(d.at(i));

			for (const v of this.#vars) v.solverObject.reveal(level);
			if (!this.#checkForward(level, vc_index)) continue;

			const nextLevel = level + 1;
			bc = (nextLevel === this.#vars.length - 1) ? this.#branchLast(nextLevel) : this.#branch(nextLevel);
			if (bc === FuzzyForwardCheckingBc.TERMINATE) break;
		}
		if (bc === FuzzyForwardCheckingBc.CONTINUE) {  // When searching back to the parent, undo the branch pruning here.
			for (const v of this.#vars) v.solverObject.reveal(level);
		}
		vc.clear();
		return bc;
	}

	// Performs search on the last variable.
	#branchLast(level) {
		let bc = FuzzyForwardCheckingBc.CONTINUE;
		const vc = this.#vars[this.#useMRV ? this.#indexOfVariableWithMRV() : level];
		const d  = vc.domain();
		const dc = vc.solverObject;

		for (let i = 0, n = d.size(); i < n; ++i) {
			if (dc.isValueHidden(i)) continue;
			if ((this._iterLimit && this._iterLimit < this.#iterCount++) || this.#endTime < Date.now()) {
				bc = FuzzyForwardCheckingBc.TERMINATE;  // Search terminated due to restrictions.
				break;
			}
			vc.assign(d.at(i));

			const deg = this._pro.worstSatisfactionDegree();
			if (deg > this.#solWorstDeg) {  // A new solution is assumed when 'greater than'.
				this.#solWorstDeg = deg;
				this.#sol.setProblem(this._pro);
				bc = FuzzyForwardCheckingBc.TERMINATE;  // Search terminated due to restrictions.
				if (this._targetDeg !== null && this._targetDeg <= this.#solWorstDeg) {  // Search ends when target is reached
					break;
				}
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

		const sol = new AssignmentList();

		let success = false;
		while (true) {
			const bc = this.#branch(0);
			if (bc === FuzzyForwardCheckingBc.TERMINATE) {
				if (this._iterLimit && this._iterLimit < this.#iterCount++) {
					this._debugOutput('stop: number of iterations has reached the limit');
					break;
				}
				if (this.#endTime < Date.now()) {
					this._debugOutput('stop: time limit has been reached');
					break;
				}
			}
			if (this.#sol.isEmpty()) {
				break;
			}
			sol.setAssignmentList(this.#sol);
			this.#sol.clear();  // Clear it so that if the solution is not found in the next search, it will be known.

			this._debugOutput(`\tfound a solution: ${this.#solWorstDeg}`);
			if (this.foundSolution(sol, this.#solWorstDeg)) {  // Call hook
				success = true;
				break;
			}
			if (this._targetDeg === null) {  // Degree not specified
				success = true;
				if (this.#solWorstDeg + this.#degInc > 1) break;
				this.#solWorstDeg += ((this.#solWorstDeg + this.#degInc > 1) ? 0 : this.#degInc);  // Find the next solution within the limit.
			} else if (this._targetDeg <= this.#solWorstDeg) {  // The current degree exceeded the specified degree.
				this._debugOutput(`stop: current degree is above the target`);
				success = true;
				break;
			}
			for (const v of this.#vars) v.solverObject.revealAll();
		}
		sol.apply();
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

}
