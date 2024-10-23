/**
 * This class that implements the forward checking method.
 * The minimum-remaining-values (MRV) heuristic can also be used by specifying the option.
 * Searches for variable assignments that satisfy all constraints and fails if none are found.
 * Each variable must have its own domain because it hides domain elements as branch pruning.
 * Forward checking is also performed for problems with polynomial constraints.
 *
 * @author Takuto Yanagida
 * @version 2024-10-22
 */

import { Problem } from '../../problem/problem';
import { CrispProblem } from '../../problem/problem-crisp';
import { Variable } from '../../problem/variable';
import { Domain } from '../../problem/domain';
import { Constraint } from '../../problem/constraint';
import { AssignmentList } from '../../util/assignment-list';
import { DomainPruner } from '../../util/domain-pruner';
import { Solver } from '../solver';

export class ForwardChecking extends Solver {

	#xs: Variable[];
	#sol: AssignmentList = new AssignmentList();
	#relCs: Constraint[][][] = [];  // Table to cache constraints between two variables.

	#useMRV: boolean = false;

	#iterCount: number = 0;
	#endTime: number = 0;

	/**
	 * Generates a solver given a constraint satisfaction problem.
	 * @param p A crisp problem.
	 */
	constructor(p: CrispProblem) {
		super(p as Problem);

		this.#xs = [...this._pro.variables()];
		for (const x of this.#xs) {
			x.solverObject = new DomainPruner(x.domain().size());
		}
		this.#initializeRelatedConstraintTable();
	}

	name(): string {
		return 'Forward Checking';
	}

	/**
	 * The settings made by this method are invalid.
	 */
	setTargetRate(): void {
		// Do nothing.
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

	// Initializes a table that caches constraints between two variables.
	#initializeRelatedConstraintTable(): void {
		this.#relCs = [];

		for (let j: number = 0; j < this.#xs.length; ++j) {
			this.#relCs.push(new Array(this.#xs.length));

			for (let i: number = 0; i < this.#xs.length; ++i) {
				if (i < j) {
					this.#relCs[j][i] = this._pro.constraintsBetween(this.#xs[i], this.#xs[j]);
				}
			}
		}
	}

	// Retrieves an array of constraints from a table that caches constraints between two variables.
	#getConstraintsBetween(i: number, j: number): Constraint[] {
		if (i < j) {
			return this.#relCs[j][i];
		}
		return this.#relCs[i][j];
	}

	// Checks for possible assignment to a future variable from the current variable assignment.
	#checkForward(level: number, currentIndex: number): boolean {
		for (const x_i of this.#xs) {
			if (!x_i.isEmpty()) {
				continue;  // If it is a past or present variable.
			}
			const d_i: Domain = x_i.domain();
			const dp_i: DomainPruner = x_i.solverObject as DomainPruner;
			const cs: Constraint[] = this.#getConstraintsBetween(currentIndex, x_i.index());

			for (const c of cs) {
				if (c.emptyVariableSize() !== 1) {
					continue;
				}
				for (let k: number = 0, n: number = d_i.size(); k < n; ++k) {
					if (dp_i.isValueHidden(k)) {
						continue;
					}
					x_i.assign(d_i.at(k));

					if (c.isSatisfied() === 0) {  // Do hide when in violation (not even undefined).
						dp_i.hide(k, level);
					}
				}
				x_i.clear();
				if (dp_i.isEmpty()) return false;  // Failure if the domain of one of the future variables is empty.
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
			if (!x.isEmpty()) {
				continue;
			}
			const d: Domain = x.domain();
			const s: number = d.size() - (x.solverObject as DomainPruner).hiddenSize();
			if (s < size) {
				size = s;
				index = i;
			}
		}
		return index;
	}

	// Searches for one variable at a time.
	#branch(level: number): boolean {
		// Failure if repeated a specified number.
		if (this._iterLimit && this._iterLimit < this.#iterCount++) {
			return false;
		}
		// Failure if time limit is exceeded.
		if (this.#endTime < Date.now()) {
			return false;
		}

		if (level === this._pro.variableSize()) {
			this.#sol.setProblem(this._pro);
			return true;
		}
		const xc_index: number = this.#useMRV ? this.#indexOfVariableWithMRV() : level;

		const xc: Variable = this.#xs[xc_index];
		const d: Domain = xc.domain();
		const dp: DomainPruner = xc.solverObject as DomainPruner;

		for (let i: number = 0, n: number = d.size(); i < n; ++i) {
			if (dp.isValueHidden(i)) {
				continue;
			}
			xc.assign(d.at(i));
			if (this.#checkForward(level, xc_index) && this.#branch(level + 1)) {
				return true;
			}
			for (const x of this.#xs) {
				(x.solverObject as DomainPruner).reveal(level);
			}
		}
		xc.clear();
		return false;
	}

	// Do search.
	exec(): boolean {
		this.#endTime = (this._timeLimit === null) ? Number.MAX_VALUE : (Date.now() + this._timeLimit);
		this.#iterCount = 0;

		this._pro.clearAllVariables();
		const r: boolean = this.#branch(0);
		if (r) {
		} else {
			if (this._iterLimit && this._iterLimit < this.#iterCount) {
				this._debugOutput('stop: number of iterations has reached the limit');
			}
			if (this.#endTime < Date.now()) {
				this._debugOutput('stop: time limit has been reached');
			}
		}

		for (const a of this.#sol) {
			a.apply();
			(a.variable().solverObject as DomainPruner).revealAll();
		}
		return r;
	}

}
