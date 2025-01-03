/**
 * This class implements the forward and backward checking method for fuzzy CSP.
 * The minimum-remaining-values (MRV) heuristic can also be used by specifying the option.
 * Each variable must have its own domain because it hides domain elements as branch pruning.
 * Forward checking is also performed for problems with polynomial constraints.
 *
 * @author Takuto Yanagida
 * @version 2025-01-03
 */

import { Variable } from '../../problem/variable';
import { Constraint } from '../../problem/constraint';
import { Domain } from '../../problem/domain';
import { AssignmentList } from '../misc/assignment-list';
import { DomainPruner, indexOfVariableWithMRV } from '../misc/domain-pruner';
import { createRelatedConstraintTable } from '../../util/problems';
import { Solver } from '../solver';

export class FullChecking extends Solver {

	#xs! : Variable[];
	#rct!: Constraint[][][];  // Table to cache constraints between two variables.
	#dps!: DomainPruner[];
	#sol!: AssignmentList;

	#checkedCs!: Set<Constraint>;
	#sequence! : Variable[];
	#unaryCs!  : Constraint[];

	#minDeg!   : number;  // Degree of existing solutions (no need to find a solution less than this).
	#globalRet!: boolean;

	#useMRV          : boolean = true;
	#pruneIntensively: boolean = false;

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
	 * Specifies whether or not to intensively prune branches when the problem contains 3- or n-ary constraints.
	 * Depending on the problem, intensive pruning may increase processing time.
	 * Default is false.
	 * @param flag Whether or not to intensively prune branches.
	 */
	setIntensivePruning(flag: boolean): void {
		this.#pruneIntensively = flag;
	}

	/**
	 * {@override}
	 */
	name(): string {
		return 'Full Checking for Fuzzy CSPs';
	}

	/**
	 * {@override}
	 */
	protected preprocess(): void {
		this.#xs  = [...this.pro.variables()];
		this.#rct = createRelatedConstraintTable(this.pro, this.#xs);
		this.#dps = Array.from(this.#xs, (x: Variable): DomainPruner => new DomainPruner(x.domain().size()));
		this.#sol = new AssignmentList();

		this.#checkedCs = new Set();
		this.#sequence  = new Array(this.pro.variableSize());
		this.#unaryCs   = this.pro.constraints().filter((c: Constraint): boolean => c.size() === 1);

		this.#minDeg = 0;
		this.monitor.initialize();
	}

	/**
	 * {@override}
	 */
	protected exec(): boolean {
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
		for (const c of this.#unaryCs) {
			const x    : Variable     = c.at(0) as Variable;
			const origV: number       = x.value();  // Save the value.
			const d    : Domain       = x.domain();
			const dp   : DomainPruner = this.#dps[x.index()];

			for (let i: number = 0, n: number = d.size(); i < n; ++i) {
				x.assign(d.at(i));
				if (c.degree() <= this.#minDeg) {
					dp.prune(i, -1);  // Here's a branch pruning!
				}
			}
			x.assign(origV);  // Restore the value.
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

		this.#sequence[level] = x;

		for (let i: number = 0, n: number = d.size(); i < n; ++i) {
			if (dp.isPruned(i)) {
				continue;
			}
			x.assign(d.at(i));

			const deg: number = Math.min(curDeg, this.#getBackwardConsistency(x));
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
				const evs: number = c.emptyVariableSize();
				if (evs === 1) {
					if (!this.#checkForwardConsistency(level, x_i, d_i, dp_i, c)) {
						return false;
					}
				} else if (this.#pruneIntensively) {  // Depends on options
					if (evs === 2) {
						if (!this.#checkForwardConsistency2(level, x_i, d_i, dp_i, c)) {
							return false;
						}
					} else if (evs === 3) {
						if (!this.#checkForwardConsistency3(level, x_i, d_i, dp_i, c)) {
							return false;
						}
					} else if (evs > 3) {
						if (!this.#checkForwardConsistencyN(level, x_i, d_i, dp_i, c, evs)) {
							return false;
						}
					}
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

	// Check for consistency between the current variable and one future variable, and prune elements of the domain that are inconsistent (when there are two unassigned variables in the scope of the constraint).
	#checkForwardConsistency2(level: number, x_i: Variable, d_i: Domain, dp_i: DomainPruner, c: Constraint): boolean {
		let x_j: Variable | null = null;

		for (const x of c) {
			if (x.isEmpty() && x !== x_i) {
				x_j = x;
				break;
			}
		}
		const d_j : Domain       = x_j!.domain();
		const dp_j: DomainPruner = this.#dps[x_j!.index()];

		loop_i: for (let i: number = 0, ni: number = d_i.size(); i < ni; ++i) {
			if (dp_i.isPruned(i)) {
				continue;
			}
			x_i.assign(d_i.at(i));  // Tentative assignment to x_i

			for (let j: number = 0, nj: number = d_j.size(); j < nj; ++j) {
				if (dp_j.isPruned(j)) {
					continue;
				}
				x_j!.assign(d_j.at(j));  // Tentative assignment to x_j

				if (c.degree() > this.#minDeg) {
					continue loop_i;  // Tentative assignment to x_i was OK -> next tentative assignment.
				}
			}
			dp_i.prune(i, level);  // It is not a solution when it is 'smaller than or equals'.
		}
		x_j!.clear();
		x_i.clear();
		return !dp_i.isEmpty();  // Succeeds if the domain di of the future variable is not empty.
	}

	// Check for consistency between the current variable and one future variable, and prune elements of the domain that are inconsistent (when there are three unassigned variables in the scope of the constraint).
	#checkForwardConsistency3(level: number, x_i: Variable, d_i: Domain, dp_i: DomainPruner, c: Constraint): boolean {
		let x_j: Variable | null = null;
		let x_k: Variable | null = null;

		for (const x of c) {
			if (x.isEmpty() && x !== x_i) {
				if (x_j === null) {
					x_j = x;
				} else {
					x_k = x;
					break;
				}
			}
		}
		const d_j : Domain       = x_j!.domain();
		const d_k : Domain       = x_k!.domain();
		const dp_j: DomainPruner = this.#dps[x_j!.index()];
		const dp_k: DomainPruner = this.#dps[x_k!.index()];

		loop_i: for (let i: number = 0, ni: number = d_i.size(); i < ni; ++i) {
			if (dp_i.isPruned(i)) {
				continue;
			}
			x_i.assign(d_i.at(i));  // Tentative assignment to x_i

			for (let j: number = 0, nj: number = d_j.size(); j < nj; ++j) {
				if (dp_j.isPruned(j)) {
					continue;
				}
				x_j!.assign(d_j.at(j));  // Tentative assignment to x_j

				for (let k: number = 0, nk: number = d_k.size(); k < nk; ++k) {
					if (dp_k.isPruned(k)) {
						continue;
					}
					x_k!.assign(d_k.at(k));  // Tentative assignment to x_k

					if (c.degree() > this.#minDeg) {
						continue loop_i;  // Tentative assignment to x_i was OK -> next tentative assignment.
					}
				}
			}
			dp_i.prune(i, level);  // It is not a solution when it is 'smaller than or equals'.
		}
		x_k!.clear();
		x_j!.clear();
		x_i.clear();
		return !dp_i.isEmpty();  // Succeeds if the domain di of the future variable is not empty.
	}

	// In the case of polynomial constraints and when there are four or more unassigned variables, all combinations of assignments of unassigned variables are examined and pruned.
	#checkForwardConsistencyN(level: number, x_i: Variable, d_i: Domain, dp_i: DomainPruner, c: Constraint, emptySize: number): boolean {
		const x_ = new Array(emptySize - 1);
		let j: number = 0;

		for (const x of c) {
			if (x.isEmpty() && x !== x_i) {
				x_[j++] = x;
			}
		}
		const indexes = new Array(x_.length);

		loop_i: for (let i: number = 0, n: number = d_i.size(); i < n; ++i) {
			if (dp_i.isPruned(i)) {
				continue;
			}
			x_i.assign(d_i.at(i));  // Tentative assignment to x_i
			indexes.fill(0);

			comLoop: while (true) {
				let hidden: boolean = false;

				for (let k: number = 0; k < x_.length; ++k) {
					const d_k : Domain       = x_[k].domain();
					const dp_k: DomainPruner = this.#dps[x_[k].index()];

					if (dp_k.isPruned(indexes[k])) {
						hidden = true;
						break;
					}
					x_[k].assign(d_k.at(indexes[k]));
				}
				if (!hidden) {
					if (c.degree() > this.#minDeg) {
						continue loop_i;  // Tentative assignment to x_i was OK -> next tentative assignment.
					}
				}
				for (let k: number = 0; k < x_.length; ++k) {
					indexes[k] += 1;
					if (indexes[k] < x_[k].domain().size()) {
						break;
					}
					indexes[k] = 0;
					if (k === x_.length - 1) {
						break comLoop;
					}
				}
			}
			dp_i.prune(i, level);
		}
		for (const x of x_) {
			x.clear();
		}
		x_i.clear();
		return !dp_i.isEmpty();  // Succeeds if the domain di of the future variable is not empty.
	}

	// Checks to see if the current variable assignment makes the degree of the past variable worse than the current worst degree.
	#getBackwardConsistency(x: Variable): number {
		let min: number = Number.MAX_VALUE;
		this.#checkedCs.clear();  // Reuse.

		for (const x_i of this.#xs) {  // Find past variables.
			if (x_i === x || x_i.isEmpty()) {  // If it is a future variable or a present variable.
				continue;
			}
			const cs: Constraint[] = this.#getConstraintsBetween(x.index(), x_i.index());

			for (const c of cs) {
				if (!this.#checkedCs.has(c)) {  // Because of the possibility of duplication in polynomial constraints
					const deg: number = c.degree();
					if (deg !== Constraint.UNDEFINED && deg < min) {  // It is not a solution when it is 'smaller than or equals'.
						min = deg;
					}
					this.#checkedCs.add(c);
				}
			}
		}
		return min;
	}

}
