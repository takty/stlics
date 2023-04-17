/**
 * This class that implements the forward checking method.
 * Find the solution to the problem as the maximum CSP.
 * Each variable must have its own domain because it hides domain elements as branch pruning.
 *
 * @author Takuto Yanagida
 * @version 2023-04-16
 */

import { AssignmentList } from '../../util/assignment-list.js';
import { DomainPruner } from '../../util/domain-pruner.js';
import { Solver } from '../solver.js';

export class MaxForwardChecking extends Solver {

	#vars;
	#sol = new AssignmentList();

	#maxVioCount;
	#vioCount;
	#checkedCons = new Set();
	#cons = [];

	#iterCount;
	#endTime;

	constructor(p) {
		super(p);
		this.#vars = [...this._pro.variables()];
		for (const v of this.#vars) {
			v.solverObject = new DomainPruner(v.domain().size());
		}
		this.#maxVioCount = this._pro.constraintSize();
	}

	name() {
		return 'Forward Checking for Max CSPs';
	}

	#branch(level, vioCount) {
		if (this._iterLimit && this._iterLimit < this.#iterCount++) return false;  // Failure if repeated a specified number.
		if (this.#endTime < Date.now()) return false;  // Failure if time limit is exceeded.

		if (level === this._pro.variableSize()) {
			const vcs = this._pro.violatingConstraintSize();
			if (vcs < this.#maxVioCount) {
				this.#maxVioCount = vcs;
				this.#sol.setProblem(this._pro);
				this._debugOutput(`   refreshed ${this.#maxVioCount}`);
				if ((this._targetDeg ?? 1) <= this._pro.satisfiedConstraintRate()) return true;
			}
			return false;
		}
		const vc  = this.#vars[level];
		const dom = vc.domain();
		const dc  = vc.solverObject;

		for (let i = 0; i < dom.size(); ++i) {
			if (dc.isValueHidden(i)) continue;
			vc.assign(dom.at(i));
			this.#vioCount = vioCount + this.#getAdditionalViolationCount(level, vc);  // for max begin
			if (this.#vioCount > this.#maxVioCount) continue;  // for max end
			if (this.#checkForward(level) && this.#branch(level + 1, this.#vioCount)) return true;
			for (const v of this.#vars) {
				v.solverObject.reveal(level);
			}
		}
		vc.clear();
		return false;
	}

	// Checks for possible assignment to a future variable from the current variable assignment.
	#checkForward(level) {
		const vc = this.#vars[level];

		for (let i = level + 1; i < this.#vars.length; ++i) {
			const future = this.#vars[i];
			this.#cons = this._pro.constraintsBetween(vc, future);

			for (const c of this.#cons) {
				if (c.emptyVariableSize() !== 1) continue;
				if (this.#revise(future, c, level)) {
					if (future.solverObject.isEmpty()) return false;  // Failure if the domain of one of the future variables is empty.
				}
			}
		}
		return true;
	}

	// Find the number of constraint violations that have increased due to the current value of the variable vc.
	#getAdditionalViolationCount(level, vc) {
		let avc = 0;
		this.#checkedCons.clear();  // Reuse.
		for (let i = 0; i < level; ++i) {
			this.#cons = this._pro.constraintsBetween(vc, this.#vars[i]);

			for (const c of this.#cons) {
				if (this.#checkedCons.has(c)) continue;  // Because of the possibility of duplication in polynomial constraints
				if (c.isSatisfied() === 0) ++avc;  // Neither satisfied nor undefined.
				this.#checkedCons.add(c);
			}
		}
		return avc;
	}

	// Remove values from the domain of v1 that do not correspond to v2. That is, match v1 with v2.
	#revise(v1, c, level) {
		let deleted = false;

		const dom = v1.domain();
		const dc  = v1.solverObject;

		for (let i = 0; i < dom.size(); ++i) {
			if (dc.isValueHidden(i)) continue;
			v1.assign(dom.at(i));

			if (c.isSatisfied() === 0 && this.#vioCount + 1 > this.#maxVioCount) {
				dc.hide(i, level);
				deleted = true;
			}
		}
		return deleted;
	}

	exec() {
		this.#endTime   = (this._timeLimit === null) ? Number.MAX_VALUE : (Date.now() + this._timeLimit);
		this.#iterCount = 0;

		this._pro.clearAllVariables();
		const r = this.#branch(0, 0);
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
			a.variable().solverObject.revealAll();
		}
		return r;
	}

}
