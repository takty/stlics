/**
 * This class that implements the forward checking method.
 * The minimum-remaining-values (MRV) heuristic can also be used by specifying the option.
 * Searches for variable assignments that satisfy all constraints and fails if none are found.
 * Each variable must have its own domain because it hides domain elements as branch pruning.
 *
 * @author Takuto Yanagida
 * @version 2025-01-02
 */

import { Problem } from '../../problem/problem';
import { Variable } from '../../problem/variable';
import { Constraint } from '../../problem/constraint';
import { Domain } from '../../problem/domain';
import { DomainPruner, assignDomainPruner, unassignDomainPruner, recover, indexOfVariableWithMRV } from '../../util/domain-pruner';
import { AssignmentList } from '../../util/assignment-list';
import { createRelatedConstraintTable } from '../../util/problems';
import { Solver } from '../solver';

export class ForwardChecking extends Solver {

	#xs : Variable[];
	#rct: Constraint[][][] = [];  // Table to cache constraints between two variables.
	#sol: AssignmentList   = new AssignmentList();

	#useMRV: boolean = true;

	/**
	 * Generates a solver given a constraint satisfaction problem.
	 * @param p A problem.
	 */
	constructor(p: Problem) {
		super(p);

		this.#xs  = [...this.pro.variables()];
		this.#rct = createRelatedConstraintTable(this.pro, this.#xs);
	}

	name(): string {
		return 'Forward Checking';
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

	exec(): boolean {
		this.monitor.initialize();
		assignDomainPruner(this.#xs);

		this.pro.clearAllVariables();
		const ret: boolean | null = this.#branch(0);
		this.#sol.apply();

		unassignDomainPruner(this.#xs);
		return ret === true;
	}

	#branch(level: number): boolean | null {
		if (level === this.pro.variableSize()) {
			const ev: number = this.pro.ratio();
			this.#sol.setProblem(this.pro);
			this.monitor.outputDebugString('\t' + `Evaluation ${ev}`);

			this.monitor.solutionFound(this.#sol, ev);
			return true;  // Success.
		}
		let ret: boolean | null = null;
		if (null !== (ret = this.monitor.check())) {
			return ret;  // Success or failure.
		}

		const x : Variable     = this.#xs[this.#useMRV ? indexOfVariableWithMRV(this.#xs) : level];
		const d : Domain       = x.domain();
		const dp: DomainPruner = x.solverObject;

		for (let i: number = 0, n: number = d.size(); i < n; ++i) {
			if (dp.isPruned(i)) {
				continue;
			}
			x.assign(d.at(i));

			const vc: number = this.#getViolationCountAround(x);
			if (vc) {
				continue;
			}
			if (this.#checkForward(level, x)) {
				ret = this.#branch(level + 1);
				if (null !== ret) {  // Success or failure.
					break;
				}
			}
			recover(this.#xs, level);
		}
		if (ret === null) {  // When searching back to the parent, undo the branch pruning here.
			recover(this.#xs, level);
			x.clear();
		}
		return ret;
	}

	// Checks for possible assignment to a future variable from the current variable assignment.
	#checkForward(level: number, x: Variable): boolean {
		for (const x_i of this.#xs) {
			if (!x_i.isEmpty()) {
				continue;  // If it is a past or present variable.
			}
			const cs  : Constraint[] = this.#getConstraintsBetween(x.index(), x_i.index());
			const dp_i: DomainPruner = x_i.solverObject;
			const d_i : Domain       = x_i.domain();

			for (const c of cs) {
				if (c.emptyVariableSize() !== 1) {
					continue;
				}
				if (!this.#checkForwardConsistency(level, x_i, d_i, dp_i, c)) {
					return false;
				}
			}
		}
		return true;
	}

	// Retrieves an array of constraints from a table that caches constraints between two variables.
	#getConstraintsBetween(i: number, j: number): Constraint[] {
		return (i < j) ? this.#rct[j][i] : this.#rct[i][j];
	}

	// Check for consistency between the current variable and one future variable, and prune elements of the domain that are inconsistent (when there is one unassigned variable in the scope of the constraint).
	#checkForwardConsistency(level: number, x: Variable, d: Domain, dp: DomainPruner, c: Constraint): boolean {
		for (let i: number = 0, n: number = d.size(); i < n; ++i) {
			if (dp.isPruned(i)) {
				continue;
			}
			x.assign(d.at(i));

			if (c.isSatisfied() === 0) {  // Do hide when in violation (not even UNDEFINED).
				dp.prune(i, level);
			}
		}
		x.clear();
		return !dp.isEmpty();  // Failure if the domain of one of the future variables is empty.
	}

	// Find the number of constraint violations that have increased due to the current value of the variable x.
	#getViolationCountAround(x: Variable): number {
		let vc: number = 0;

		for (const c of x) {
			if (c.isSatisfied() === 0) {  // Neither satisfied nor UNDEFINED.
				++vc;
			}
		}
		return vc;
	}

}
