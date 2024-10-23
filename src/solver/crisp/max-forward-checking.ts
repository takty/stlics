/**
 * This class that implements the forward checking method.
 * Find the solution to the problem as the maximum CSP.
 * Each variable must have its own domain because it hides domain elements as branch pruning.
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

export class MaxForwardChecking extends Solver {

	#xs: Variable[];
	#sol: AssignmentList = new AssignmentList();

	#maxVioCount: number;
	#vioCount: number = 0;
	#checkedCs: Set<Constraint> = new Set();
	#cs: Constraint[] = [];

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
		this.#maxVioCount = this._pro.constraintSize();
	}

	name(): string {
		return 'Forward Checking for Max CSPs';
	}

	#branch(level: number, vioCount: number): boolean {
		// Failure if repeated a specified number.
		if (this._iterLimit && this._iterLimit < this.#iterCount++) {
			return false;
		}
		// Failure if time limit is exceeded.
		if (this.#endTime < Date.now()) {
			return false;
		}

		const p = this._pro as CrispProblem;

		if (level === p.variableSize()) {
			const vcs: number = p.violatingConstraintSize();

			if (vcs < this.#maxVioCount) {
				this.#maxVioCount = vcs;
				this.#sol.setProblem(this._pro);
				this._debugOutput(`   refreshed ${this.#maxVioCount}`);
				if ((this._targetDeg ?? 1) <= p.satisfiedConstraintRate()) {
					return true;
				}
			}
			return false;
		}
		const xc: Variable = this.#xs[level];
		const d: Domain = xc.domain();
		const dp: DomainPruner = xc.solverObject as DomainPruner;

		for (let i: number = 0, n: number = d.size(); i < n; ++i) {
			if (dp.isValueHidden(i)) {
				continue;
			}
			xc.assign(d.at(i));

			this.#vioCount = vioCount + this.#getAdditionalViolationCount(level, xc);  // for max begin
			if (this.#vioCount > this.#maxVioCount) {
				continue;  // for max end
			}

			if (this.#checkForward(level) && this.#branch(level + 1, this.#vioCount)) {
				return true;
			}
			for (const x of this.#xs) {
				(x.solverObject as DomainPruner).reveal(level);
			}
		}
		xc.clear();
		return false;
	}

	// Checks for possible assignment to a future variable from the current variable assignment.
	#checkForward(level: number): boolean {
		const xc: Variable = this.#xs[level];

		for (let i: number = level + 1; i < this.#xs.length; ++i) {
			const future: Variable = this.#xs[i];
			this.#cs = this._pro.constraintsBetween(xc, future);

			for (const c of this.#cs) {
				if (c.emptyVariableSize() !== 1) {
					continue;
				}
				if (this.#revise(future, c, level)) {
					if ((future.solverObject as DomainPruner).isEmpty()) {
						return false;  // Failure if the domain of one of the future variables is empty.
					}
				}
			}
		}
		return true;
	}

	// Find the number of constraint violations that have increased due to the current value of the variable vc.
	#getAdditionalViolationCount(level: number, xc: Variable): number {
		let avc: number = 0;
		this.#checkedCs.clear();  // Reuse.

		for (let i: number = 0; i < level; ++i) {
			this.#cs = this._pro.constraintsBetween(xc, this.#xs[i]);

			for (const c of this.#cs) {
				if (this.#checkedCs.has(c)) {
					// Because of the possibility of duplication in polynomial constraints
					continue;
				}
				if (c.isSatisfied() === 0) {
					// Neither satisfied nor undefined.
					++avc;
				}
				this.#checkedCs.add(c);
			}
		}
		return avc;
	}

	// Remove values from the domain of v1 that do not correspond to v2. That is, match v1 with v2.
	#revise(x1: Variable, c: Constraint, level: number): boolean {
		let deleted: boolean = false;

		const d: Domain = x1.domain();
		const dp: DomainPruner = x1.solverObject as DomainPruner;

		for (let k: number = 0, n: number = d.size(); k < n; ++k) {
			if (dp.isValueHidden(k)) {
				continue;
			}
			x1.assign(d.at(k));

			if (c.isSatisfied() === 0 && this.#vioCount + 1 > this.#maxVioCount) {
				dp.hide(k, level);
				deleted = true;
			}
		}
		return deleted;
	}

	exec(): boolean {
		this.#endTime = (this._timeLimit === null) ? Number.MAX_VALUE : (Date.now() + this._timeLimit);
		this.#iterCount = 0;

		this._pro.clearAllVariables();
		const r: boolean = this.#branch(0, 0);
		if (r) {
			this._debugOutput('stop: current degree is above the target');
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
