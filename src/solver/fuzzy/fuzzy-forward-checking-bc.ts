/**
 * This class implements the forward checking method for fuzzy CSPs that contain only binary constraints.
 * The minimum-remaining-values (MRV) heuristic can also be used by specifying the option.
 *
 * @author Takuto Yanagida
 * @version 2024-10-23
 */

import { Problem } from '../../problem/problem';
import { Variable } from '../../problem/variable';
import { Domain } from '../../problem/domain';
import { Constraint } from '../../problem/constraint';
import { AssignmentList } from '../../util/assignment-list';
import { DomainPruner } from '../../util/domain-pruner';
import { Solver } from '../solver';

export class FuzzyForwardCheckingBc extends Solver {

	static CONTINUE: number = 0;
	static TERMINATE: number = 1;

	#xs: Variable[];
	#sol: AssignmentList = new AssignmentList();
	#relCons: Constraint[][][] = [];  // Table to cache constraints between two variables.

	#solWorstDeg: number = 0;  // Degree of existing solutions (no need to find a solution less than this).

	#iterCount: number = 0;
	#endTime: number = 0;
	#useMRV: boolean = false;
	#degInc: number = 0;

	/**
	 * Generates the solver given a fuzzy constraint satisfaction problem.
	 * @param p A fuzzy problem.
	 * @param worstSatisfactionDegree Worst satisfaction degree.
	 */
	constructor(p: Problem, worstSatisfactionDegree: number | null = null) {
		super(p);
		this.#xs = [...this._pro.variables()];
		this.#initializeRelatedConstraintTable();

		this.#solWorstDeg = Math.max(0, p.worstSatisfactionDegree());
		if (worstSatisfactionDegree) {
			this.#solWorstDeg = worstSatisfactionDegree;
		}
	}

	name(): string {
		return 'Forward Checking for Fuzzy CSPs of Binary Constraints';
	}

	/**
	 * Specify whether to use the minimum-remaining-values (MRV) heuristic.
	 * Use of MRV may increase processing time for some problems.
	 * Default is false.
	 * @param flag Use MRV if true.
	 */
	setUsingMinimumRemainingValuesHeuristics(flag: boolean): void {
		this.#useMRV = flag;
	}

	/**
	 * If a solution is found and the search continues, it specifies how much the worst constraint satisfaction degree should be increased.
	 * @param degree Increasing constraint satisfaction degree.
	 */
	setIncrementStepOfWorstSatisfactionDegree(degree: number): void {
		this.#degInc = degree;
	}

	/**
	 * Constraint satisfaction degree is set as an achievement goal that serves as a condition for stopping the solver.
	 * The solver stops as successful when the specified degree is reached or exceeded.
	 * The default (unset) is 0.8.
	 * @param rate Degree. null indicates not set.
	 */
	setTargetRate(rate = null): void {
		this._targetDeg = rate;
		if (this._targetDeg === null) {
			this.#solWorstDeg = 0;
		} else {
			// Find the worstSatisfactionDegree_ that is slightly smaller than the targetDegree_.
			let e: number = Number.MIN_VALUE;
			this.#solWorstDeg = this._targetDeg - e;
			while (this.#solWorstDeg >= this._targetDeg) {
				e *= 10;
				this.#solWorstDeg = this._targetDeg - e;
			}
		}
	}

	// Initializes a table that caches constraints between two variables.
	#initializeRelatedConstraintTable(): void {
		this.#relCons = [];

		for (let j: number = 0; j < this.#xs.length; ++j) {
			this.#relCons.push(new Array(this.#xs.length));

			for (let i: number = 0; i < this.#xs.length; ++i) {
				if (i < j) {
					this.#relCons[j][i] = this._pro.constraintsBetween(this.#xs[i], this.#xs[j]);
				}
			}
		}
	}

	// Retrieves an array of constraints from a table that caches constraints between two variables.
	#getConstraintsBetween(vi_index: number, vj_index: number): Constraint[] {
		if (vi_index < vj_index) {
			return this.#relCons[vj_index][vi_index];
		}
		return this.#relCons[vi_index][vj_index];
	}

	// Check for consistency between the current variable and one future variable, and prune elements of the domain that are inconsistent (when there is one unassigned variable in the scope of the constraint).
	#checkForwardConsistency(level: number, vi: Variable, c: Constraint): boolean {
		const d_i: Domain = vi.domain();
		const dp_i: DomainPruner = vi.solverObject;

		for (let i: number = 0, n: number = d_i.size(); i < n; ++i) {
			if (dp_i.isValueHidden(i)) continue;
			vi.assign(d_i.at(i));
			if (c.satisfactionDegree() <= this.#solWorstDeg) {  // It is not a solution when it is 'smaller than or equals'.
				dp_i.hide(i, level);  // Here's a branch pruning!
			}
		}
		vi.clear();
		return !dp_i.isEmpty();  // Succeeds if the domain di of the future variable vi is not empty.
	}

	// Checks for possible assignment to a future variable from the current variable assignment.
	#checkForward(level: number, index: number): boolean {
		for (const x_i of this.#xs) {
			if (!x_i.isEmpty()) continue;  // If it is a past or present variable.

			const cs: Constraint[] = this.#getConstraintsBetween(index, x_i.index());

			for (const c of cs) {
				if (c.size() === 2) {  // If it is a binary constraint.
					if (!this.#checkForwardConsistency(level, x_i, c)) return false;
				}
			}
		}
		return true;
	}

	// Returns the index of the smallest domain variable.
	#indexOfVariableWithMRV(): number {
		let index: number = 0;
		let size: number = Number.MAX_VALUE;

		for (let i: number = 0; i < this.#xs.length; ++i) {
			const x: Variable = this.#xs[i];
			if (!x.isEmpty()) continue;
			const d: Domain = x.domain();
			const s: number = d.size() - x.solverObject.hiddenSize();
			if (s < size) {
				size = s;
				index = i;
			}
		}
		return index;
	}

	// Performs search one variable at a time.
	#branch(level: number): number {
		let bc: number = FuzzyForwardCheckingBc.CONTINUE;
		const xc_index: number = this.#useMRV ? this.#indexOfVariableWithMRV() : level;
		const xc: Variable = this.#xs[xc_index];
		const d: Domain = xc.domain();
		const dp: DomainPruner = xc.solverObject;

		for (let i: number = 0, n: number = d.size(); i < n; ++i) {
			if (dp.isValueHidden(i)) continue;
			if ((this._iterLimit && this._iterLimit < this.#iterCount++) || this.#endTime < Date.now()) {
				bc = FuzzyForwardCheckingBc.TERMINATE;  // Search terminated due to restrictions.
				break;
			}
			xc.assign(d.at(i));

			for (const x of this.#xs) {
				x.solverObject.reveal(level);
			}
			if (!this.#checkForward(level, xc_index)) {
				continue;
			}
			const nextLevel: number = level + 1;
			bc = (nextLevel === this.#xs.length - 1) ? this.#branchLast(nextLevel) : this.#branch(nextLevel);
			if (bc === FuzzyForwardCheckingBc.TERMINATE) break;
		}
		if (bc === FuzzyForwardCheckingBc.CONTINUE) {  // When searching back to the parent, undo the branch pruning here.
			for (const v of this.#xs) v.solverObject.reveal(level);
		}
		xc.clear();
		return bc;
	}

	// Performs search on the last variable.
	#branchLast(level: number): number {
		let bc: number = FuzzyForwardCheckingBc.CONTINUE;
		const xc: Variable = this.#xs[this.#useMRV ? this.#indexOfVariableWithMRV() : level];
		const d: Domain = xc.domain();
		const dp: DomainPruner = xc.solverObject;

		for (let i: number = 0, n: number = d.size(); i < n; ++i) {
			if (dp.isValueHidden(i)) continue;
			if ((this._iterLimit && this._iterLimit < this.#iterCount++) || this.#endTime < Date.now()) {
				bc = FuzzyForwardCheckingBc.TERMINATE;  // Search terminated due to restrictions.
				break;
			}
			xc.assign(d.at(i));

			const deg: number = this._pro.worstSatisfactionDegree();
			if (deg > this.#solWorstDeg) {  // A new solution is assumed when 'greater than'.
				this.#solWorstDeg = deg;
				this.#sol.setProblem(this._pro);
				bc = FuzzyForwardCheckingBc.TERMINATE;  // Search terminated due to restrictions.
				if (this._targetDeg !== null && this._targetDeg <= this.#solWorstDeg) {  // Search ends when target is reached
					break;
				}
			}
		}
		xc.clear();
		return bc;
	}

	// Do search.
	exec(): boolean {
		this.#endTime = (this._timeLimit === null) ? Number.MAX_VALUE : (Date.now() + this._timeLimit);
		this.#iterCount = 0;

		for (const x of this.#xs) {
			x.solverObject = new DomainPruner(x.domain().size());  // Generation of domain pruners.
		}
		this._pro.clearAllVariables();

		const sol = new AssignmentList();

		let success: boolean = false;
		while (true) {
			const bc: number = this.#branch(0);
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
			for (const x of this.#xs) {
				x.solverObject.revealAll();
			}
		}
		sol.apply();
		for (const x of this.#xs) {
			x.solverObject = null;  // Delete branch pruner
		}
		return success;
	}

}
