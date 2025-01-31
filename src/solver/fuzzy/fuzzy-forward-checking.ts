/**
 * This class implements the forward checking method for fuzzy CSPs.
 * The minimum-remaining-values (MRV) heuristic can also be used by specifying the option.
 *
 * @author Takuto Yanagida
 * @version 2025-01-31
 */

import { Variable } from '../../problem/variable';
import { Constraint } from '../../problem/constraint';
import { Domain } from '../../problem/domain';
import { AssignmentList } from '../misc/assignment-list';
import { DomainPruner, indexOfVariableWithMRV } from '../misc/domain-pruner';
import { createRelatedConstraintTable } from '../../util/problems';
import { Solver } from '../solver';

export class FuzzyForwardChecking extends Solver {

	#xs! : Variable[];
	#rct!: Constraint[][][];  // Table to cache constraints between two variables.
	#dps!: DomainPruner[];
	#sol!: AssignmentList;

	#minDeg!   : number;  // Degree of existing solutions (no need to find a solution less than this).
	#globalRet!: boolean;

	#useMRV       : boolean = true;
	#prePruningDeg: number  = 0;

	/**
	 * Generates a solver.
	 */
	constructor() {
		super();
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
	 * Set the degree of the worst solution to be pruned in the initial pruning phase.
	 * The default is 0 (no pruning).
	 * @param deg Degree of the worst solution.
	 */
	setPrePruningDegree(deg: number): void {
		this.#prePruningDeg = deg;
	}

	/**
	 * {@override}
	 */
	override name(): string {
		return 'Fuzzy Forward Checking';
	}

	/**
	 * {@override}
	 */
	protected override preprocess(): void {
		this.#xs  = [...this.pro.variables()];
		this.#rct = createRelatedConstraintTable(this.pro, this.#xs);
		this.#dps = Array.from(this.#xs, (x: Variable): DomainPruner => new DomainPruner(x.domain().size()));
		this.#sol = new AssignmentList();

		this.#minDeg = this.#prePruningDeg;
		this.monitor.initialize();
	}

	/**
	 * {@override}
	 */
	protected override exec(): boolean {
		let ret: boolean | null = null;
		while (ret === null) {
			this.#globalRet = false;
			this.pro.clearAllVariables();

			if (!this.#pruneUnaryConstraints()) {
				ret = false;
				break;
			}
			ret = this.#branch(0);
			this.#sol.apply();
		}

		return ret === true;
	}

	// Prune elements of the domain that make the unary constraint worse than the current worst degree.
	#pruneUnaryConstraints(): boolean {
		for (const c of this.pro.constraints()) {
			if (c.size() !== 1) {
				continue;
			}
			const x : Variable              = c.at(0) as Variable;
			const d : Domain                = x.domain();
			const dp: DomainPruner          = this.#dps[x.index()];
			const r : (v: number) => number = c.relation();

			for (let i: number = 0, n: number = d.size(); i < n; ++i) {
				if (dp.isPruned(i)) {
					continue;
				}
				if (r(d.at(i)) <= this.#minDeg) {
					dp.prune(i, -1);  // Here's a branch pruning!
				}
			}
			if (dp.isEmpty()) {
				return false;
			}
		}
		return true;
	}

	#branch(level: number, curDeg: number = 1): boolean | null {
		if (level === this.pro.variableSize()) {
			const ev: number = this.pro.degree();
			this.#sol.setProblem(this.pro);
			this.monitor.outputDebugString('\t' + `Evaluation ${ev}`);

			if (this.#minDeg < ev) {
				this.#minDeg    = ev;
				this.#globalRet = true;

				if (this.monitor.solutionFound(this.#sol, ev)) {
					return true;  // Success.
				}
			}
			return this.monitor.check(ev);
		}
		let ret: boolean | null = null;
		if (null !== (ret = this.monitor.check())) {
			return ret;  // Success or failure.
		}

		const x : Variable     = this.#xs[this.#useMRV ? indexOfVariableWithMRV(this.#xs, this.#dps) : level];
		const d : Domain       = x.domain();
		const dp: DomainPruner = this.#dps[x.index()];

		for (let i: number = 0, n: number = d.size(); i < n; ++i) {
			if (dp.isPruned(i)) {
				continue;
			}
			x.assign(d.at(i));

			const deg: number = Math.min(curDeg, this.#getWorstDegreeAround(x));
			if (deg <= this.#minDeg) {  // A new solution is assumed when 'greater than'.
				continue;
			}
			if (this.#checkForward(level, x)) {
				ret = this.#branch(level + 1, deg);
				if (null !== ret || this.#globalRet) {  // Success or failure.
					break;
				}
			}
			for (const dp of this.#dps) {
				dp.recover(level);
			}
		}
		if (ret === null) {  // When searching back to the parent, undo the branch pruning here.
			for (const dp of this.#dps) {
				dp.recover(level);
			}
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
			const dp_i: DomainPruner = this.#dps[x_i.index()];
			const d_i : Domain       = x_i.domain();

			for (const c of cs) {
				if (c.emptySize() !== 1) {
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

			if (c.degree() <= this.#minDeg) {  // It is not a solution when it is 'smaller than or equals' (not even UNDEFINED).
				dp.prune(i, level);
			}
		}
		x.clear();
		return !dp.isEmpty();  // Failure if the domain of one of the future variables is empty.
	}

	// Find the number of constraint violations that have increased due to the current value of the variable x.
	#getWorstDegreeAround(x: Variable): number {
		let min: number = Number.MAX_VALUE;

		for (const c of x) {
			const ev: number = c.degree();
			if (0 <= ev /* ev !== UNDEFINED */ && ev < min) {
				min = ev;
			}
		}
		return min;
	}

}
