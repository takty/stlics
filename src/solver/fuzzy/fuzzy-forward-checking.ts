/**
 * This class implements the forward checking method for fuzzy CSP.
 * The minimum-remaining-values (MRV) heuristic can also be used by specifying the option.
 * Each variable must have its own domain because it hides domain elements as branch pruning.
 * Forward checking is also performed for problems with polynomial constraints.
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

export class FuzzyForwardChecking extends Solver {

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

	#sequence: Variable[];
	#unaryCons: Constraint[];
	#checkedCons: boolean[];
	#pruneIntensively: boolean = false;

	/**
	 * Generates the solver given a fuzzy constraint satisfaction problem.
	 * @param p A fuzzy problem.
	 * @param worstSatisfactionDegree Worst satisfaction degree.
	 */
	constructor(p: Problem, worstSatisfactionDegree: number | null = null) {
		super(p);
		this.#xs = [...this._pro.variables()];
		this.#sequence = new Array(this._pro.variableSize());
		this.#initializeRelatedConstraintTable();
		this.#checkedCons = new Array(this._pro.constraintSize());

		const temp: Constraint[] = [];
		for (const c of this._pro.constraints()) {
			if (c.size() === 1) temp.push(c);
		}
		this.#unaryCons = [...temp];  // To make it even if it is empty.
		if (worstSatisfactionDegree) {
			this.#solWorstDeg = worstSatisfactionDegree;
		}
	}

	name(): string {
		return 'Forward Checking for Fuzzy CSPs';
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
	 * Specifies whether or not to intensively prune branches when the problem contains 3- or n-ary constraints.
	 * Depending on the problem, intensive pruning may increase processing time.
	 * Default is false.
	 * @param flag Whether or not to intensively prune branches.
	 */
	setIntensivePruning(flag: boolean): void {
		this.#pruneIntensively = flag;
	}

	/**
	 * Constraint satisfaction degree is set as an achievement goal that serves as a condition for stopping the solver.
	 * The solver stops as successful when the specified degree is reached or exceeded.
	 * The default (unset) is 0.8.
	 * @param rate Degree. null indicates not set.
	 */
	setTargetRate(rate: number | null = null): void {
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

	// Prune elements of the domain that make the unary constraint worse than the current worst degree.
	#pruneUnaryConstraints(): boolean {
		for (const c of this.#unaryCons) {
			const x = c.at(0) as Variable;
			const orgVal: number = x.value();  // Save the value.
			const d: Domain = x.domain();
			const dp: DomainPruner = x.solverObject;

			for (let i: number = 0, n: number = d.size(); i < n; ++i) {
				x.assign(d.at(i));
				if (c.satisfactionDegree() <= this.#solWorstDeg) {
					dp.hide(i, -1);  // Here's a branch pruning!
				}
			}
			x.assign(orgVal);  // Restore the value.
			if (dp.isEmpty()) return false;
		}
		return true;
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

	// Check for consistency between the current variable and one future variable, and prune elements of the domain that are inconsistent (when there are two unassigned variables in the scope of the constraint).
	#checkForwardConsistency2(level: number, vi: Variable, c: Constraint) {
		const d_i: Domain = vi.domain();
		const dp_i: DomainPruner = vi.solverObject;

		let vj: Variable | null = null;

		for (const x of c) {
			if (x.isEmpty() && x !== vi) {
				vj = x;
				break;
			}
		}
		const d_j: Domain = (vj as Variable).domain();
		const dp_j: DomainPruner = (vj as Variable).solverObject;
		loop_i: for (let i: number = 0, ni: number = d_i.size(); i < ni; ++i) {
			if (dp_i.isValueHidden(i)) continue;
			vi.assign(d_i.at(i));  // Tentative assignment to vi
			for (let j: number = 0, nj: number = d_j.size(); j < nj; ++j) {
				if (dp_j.isValueHidden(j)) continue;
				(vj as Variable).assign(d_j.at(j));  // Tentative assignment to vj
				const s: number = c.satisfactionDegree();
				if (s > this.#solWorstDeg) continue loop_i;  // Tentative assignment to vi was OK -> next tentative assignment.
			}
			dp_i.hide(i, level);  // It is not a solution when it is 'smaller than or equals'.
		}
		(vj as Variable).clear();
		vi.clear();
		return !dp_i.isEmpty();  // Succeeds if the domain di of the future variable vi is not empty.
	}

	// Check for consistency between the current variable and one future variable, and prune elements of the domain that are inconsistent (when there are three unassigned variables in the scope of the constraint).
	#checkForwardConsistency3(level: number, vi: Variable, c: Constraint): boolean {
		const d_i: Domain = vi.domain();
		const dp_i: DomainPruner = vi.solverObject;

		let vj: Variable | null = null;
		let vk: Variable | null = null;

		for (const x of c) {
			if (x.isEmpty() && x !== vi) {
				if (vj === null) {
					vj = x;
				} else {
					vk = x;
					break;
				}
			}
		}
		const d_j: Domain = (vj as Variable).domain();
		const d_k: Domain = (vk as Variable).domain();
		const dp_j: DomainPruner = (vj as Variable).solverObject;
		const dp_k: DomainPruner = (vk as Variable).solverObject;

		loop_i: for (let i: number = 0, ni: number = d_i.size(); i < ni; ++i) {
			if (dp_i.isValueHidden(i)) continue;
			vi.assign(d_i.at(i));  // Tentative assignment to vi
			for (let j: number = 0, nj: number = d_j.size(); j < nj; ++j) {
				if (dp_j.isValueHidden(j)) continue;
				(vj as Variable).assign(d_j.at(j));  // Tentative assignment to vj
				for (let k: number = 0, nk: number = d_k.size(); k < nk; ++k) {
					if (dp_k.isValueHidden(k)) continue;
					(vk as Variable).assign(d_k.at(k));  // Tentative assignment to vk
					const s: number = c.satisfactionDegree();
					if (s > this.#solWorstDeg) continue loop_i;  // Tentative assignment to vi was OK -> next tentative assignment.
				}
			}
			dp_i.hide(i, level);  // It is not a solution when it is 'smaller than or equals'.
		}
		(vk as Variable).clear();
		(vj as Variable).clear();
		vi.clear();
		return !dp_i.isEmpty();  // Succeeds if the domain di of the future variable vi is not empty.
	}

	// In the case of polynomial constraints and when there are four or more unassigned variables, all combinations of assignments of unassigned variables are examined and pruned.
	#checkForwardConsistencyN(level: number, v_i: Variable, c: Constraint, emptySize: number): boolean {
		const d_i: Domain = v_i.domain();
		const dp_i: DomainPruner = v_i.solverObject;
		const emp = new Array(emptySize - 1);
		let j: number = 0;

		for (const x of c) {
			if (x.isEmpty() && x !== v_i) {
				emp[j++] = x;
			}
		}
		const indexes = new Array(emp.length);

		loop_i: for (let i: number = 0, n: number = d_i.size(); i < n; ++i) {
			if (dp_i.isValueHidden(i)) continue;
			v_i.assign(d_i.at(i));  // Tentative assignment to vi
			indexes.fill(0);

			comLoop: while (true) {
				let hidden: boolean = false;
				for (let k: number = 0; k < emp.length; ++k) {
					const d_k: Domain = emp[k].domain();
					const dp_k: DomainPruner = emp[k].solverObject;
					if (dp_k.isValueHidden(indexes[k])) {
						hidden = true;
						break;
					}
					emp[k].assign(d_k.at(indexes[k]));
				}
				if (!hidden) {
					const s: number = c.satisfactionDegree();
					if (s > this.#solWorstDeg) continue loop_i;  // Tentative assignment to vi was OK -> next tentative assignment.
				}
				for (let k: number = 0; k < emp.length; ++k) {
					indexes[k] += 1;
					if (indexes[k] < emp[k].domain().size()) break;
					indexes[k] = 0;
					if (k === emp.length - 1) break comLoop;
				}
			}
			dp_i.hide(i, level);
		}
		for (const x of emp) {
			x.clear();
		}
		v_i.clear();
		return !dp_i.isEmpty();  // Succeeds if the domain di of the future variable vi is not empty.
	}

	// Checks for possible assignment to a future variable from the current variable assignment.
	#checkForward(level: number, index: number): boolean {
		for (const x_i of this.#xs) {
			if (!x_i.isEmpty()) continue;  // If it is a past or present variable.

			const cs: Constraint[] = this.#getConstraintsBetween(index, x_i.index());

			for (const c of cs) {
				const emptySize: number = c.emptyVariableSize();
				if (emptySize === 1) {
					if (!this.#checkForwardConsistency(level, x_i, c)) return false;
				} else if (this.#pruneIntensively) {  // Depends on options
					if (emptySize === 2) {
						if (!this.#checkForwardConsistency2(level, x_i, c)) return false;
					} else if (emptySize === 3) {
						if (!this.#checkForwardConsistency3(level, x_i, c)) return false;
					} else if (emptySize > 3) {
						if (!this.#checkForwardConsistencyN(level, x_i, c, emptySize)) return false;
					}
				}
			}
		}
		return true;
	}

	// Checks to see if the current variable assignment makes the degree of the past variable worse than the current worst degree.
	#checkBackwardConsistency(vc: Variable): boolean {
		this.#checkedCons.fill(false);  // Reuse.

		for (let i: number = 0; i < this.#xs.length; ++i) {  // Find past variables.
			const x_i: Variable = this.#xs[i];
			if (x_i === vc || x_i.isEmpty()) continue;  // If it is a future variable or a present variable.
			const cs: Constraint[] = this.#getConstraintsBetween(vc.index(), i);

			for (const c of cs) {
				if (this.#checkedCons[c.index()]) continue;  // Because of the possibility of duplication in polynomial constraints
				const s: number = c.satisfactionDegree();
				if (s !== Constraint.UNDEFINED && s <= this.#solWorstDeg) {  // It is not a solution when it is 'smaller than or equals'.
					return false;
				}
				this.#checkedCons[c.index()] = true;
			}
		}
		return true;
	}

	#refresh(): void {
		for (let i: number = 0; i < this.#sequence.length; ++i) {
			const index_x_i: number = this.#sequence[i].index();

			for (let j: number = i + 1; j < this.#sequence.length; ++j) {
				const x_j: Variable = this.#sequence[j];
				const cs: Constraint[] = this.#getConstraintsBetween(index_x_i, x_j.index());

				for (const c of cs) {
					const orgVal: number = x_j.value();
					const d_j: Domain = x_j.domain();
					const dp_j: DomainPruner = x_j.solverObject;

					for (let k: number = 0, n: number = d_j.size(); k < n; ++k) {
						if (dp_j.isValueHidden(k)) continue;
						x_j.assign(d_j.at(k));
						if (c.satisfactionDegree() <= this.#solWorstDeg) {
							dp_j.hide(k, i);  // Here's a branch pruning!
						}
					}
					x_j.assign(orgVal);
				}
			}
		}
	}

	// Returns the index of the smallest domain variable.
	#indexOfVariableWithMRV(): number {
		let index: number = 0;
		let size: number = Number.MAX_VALUE;

		for (let i: number = 0; i < this.#xs.length; ++i) {
			const x: Variable = this.#xs[i];
			if (!x.isEmpty()) {
				continue;
			}
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
		let bc: number = FuzzyForwardChecking.CONTINUE;
		const xc_index: number = this.#useMRV ? this.#indexOfVariableWithMRV() : level;
		const xc: Variable = this.#xs[xc_index];
		const d: Domain = xc.domain();
		const dp: DomainPruner = xc.solverObject;
		this.#sequence[level] = xc;

		for (let i: number = 0, n: number = d.size(); i < n; ++i) {
			if (dp.isValueHidden(i)) {
				continue;
			}
			if ((this._iterLimit && this._iterLimit < this.#iterCount++) || this.#endTime < Date.now()) {
				bc = FuzzyForwardChecking.TERMINATE;  // Search terminated due to restrictions.
				break;
			}
			xc.assign(d.at(i));

			for (const x of this.#xs) x.solverObject.reveal(level);
			if (!this.#checkBackwardConsistency(xc)) continue;
			if (!this.#checkForward(level, xc_index)) continue;

			const nextLevel: number = level + 1;
			bc = (nextLevel === this.#xs.length - 1) ? this.#branchLast(nextLevel) : this.#branch(nextLevel);
			if (bc === FuzzyForwardChecking.TERMINATE) break;
		}
		if (bc === FuzzyForwardChecking.CONTINUE) {  // When searching back to the parent, undo the branch pruning here.
			for (const x of this.#xs) x.solverObject.reveal(level);
		}
		xc.clear();
		return bc;
	}

	// Performs search on the last variable.
	#branchLast(level: number): number {
		let bc: number = FuzzyForwardChecking.CONTINUE;
		const xc: Variable = this.#xs[this.#useMRV ? this.#indexOfVariableWithMRV() : level];
		const d: Domain = xc.domain();
		const dp: DomainPruner = xc.solverObject;
		this.#sequence[level] = xc;

		for (let i: number = 0, n: number = d.size(); i < n; ++i) {
			if (dp.isValueHidden(i)) continue;
			if ((this._iterLimit && this._iterLimit < this.#iterCount++) || this.#endTime < Date.now()) {
				bc = FuzzyForwardChecking.TERMINATE;  // Search terminated due to restrictions.
				break;
			}
			xc.assign(d.at(i));

			const deg: number = this._pro.worstSatisfactionDegree();
			if (deg > this.#solWorstDeg) {  // A new solution is assumed when 'greater than'.
				this.#solWorstDeg = deg;
				this.#sol.setProblem(this._pro);
				bc = FuzzyForwardChecking.TERMINATE;
				if (this._targetDeg !== null && this._targetDeg <= this.#solWorstDeg) {  // Search ends when target is reached
					break;
				}
				this.#pruneUnaryConstraints();
				this.#refresh();
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
		if (!this.#pruneUnaryConstraints()) return false;  // Since _worstSatisfactionDegree_ has been updated, call this function.

		let success: boolean = false;
		while (true) {
			const bc: number = this.#branch(0);
			if (bc === FuzzyForwardChecking.TERMINATE) {
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
			this._debugOutput(`\tfound a solution: ${this.#solWorstDeg}`);
			if (this.foundSolution(this.#sol, this.#solWorstDeg)) {  // Call hook
				success = true;
				break;
			}
			if (this._targetDeg === null) {  // Degree not specified
				success = true;
				this.#solWorstDeg += this.#degInc;  // Find the next solution within the limit.
			} else if (this._targetDeg <= this.#solWorstDeg) {  // The current degree exceeded the specified degree.
				this._debugOutput('stop: current degree is above the target');
				success = true;
				break;
			}
			for (const x of this.#xs) {
				x.solverObject.revealAll();
			}
		}
		this.#sol.apply();
		for (const x of this.#xs) {
			x.solverObject = null;  // Delete branch pruner
		}
		return success;
	}

}
