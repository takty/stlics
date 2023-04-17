/**
 * This class that implements the forward checking method.
 * The minimum-remaining-values (MRV) heuristic can also be used by specifying the option.
 * Searches for variable assignments that satisfy all constraints and fails if none are found.
 * Each variable must have its own domain because it hides domain elements as branch pruning.
 * Forward checking is also performed for problems with polynomial constraints.
 *
 * @author Takuto Yanagida
 * @version 2023-04-16
 */

import { AssignmentList } from '../../util/assignment-list.js';
import { DomainPruner } from '../../util/domain-pruner.js';
import { Solver } from '../solver.js';

export class ForwardChecking extends Solver {

	#vars;
	#sol = new AssignmentList();
	#relCons;  // Table to cache constraints between two variables.

	#useMRV = false;

	#iterCount;
	#endTime;

	/**
	 * Generates a solver given a constraint satisfaction problem.
	 * @param p A problem.
	 */
	constructor(p) {
		super(p);
		this.#vars = [...this._pro.variables()];
		for (const v of this.#vars) {
			v.solverObject = new DomainPruner(v.domain().size());
		}
		this.#initializeRelatedConstraintTable();
	}

	name() {
		return 'Forward Checking';
	}

	// Initializes a table that caches constraints between two variables.
	#initializeRelatedConstraintTable() {
		const temp     = [];
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
	#getConstraintsBetween(i, j) {
		if (i < j) {
			return this.#relCons[j][i];
		}
		return this.#relCons[i][j];
	}

	// Checks for possible assignment to a future variable from the current variable assignment.
	#checkForward(level, currentIndex) {
		for (const v_i of this.#vars) {
			if (!v_i.isEmpty()) continue;  // If it is a past or present variable.
			const d_i  = v_i.domain();
			const dc_i = v_i.solverObject;
			const cs   = this.#getConstraintsBetween(currentIndex, v_i.index());

			for (const c of cs) {
				if (c.emptyVariableSize() !== 1) continue;

				for (let k = 0, n = d_i.size(); k < n; ++k) {
					if (dc_i.isValueHidden(k)) continue;
					v_i.assign(d_i.at(k));

					if (c.isSatisfied() === 0) {  // Do hide when in violation (not even undefined).
						dc_i.hide(k, level);
					}
				}
				v_i.clear();
				if (dc_i.isEmpty()) return false;  // Failure if the domain of one of the future variables is empty.
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

	// Searches for one variable at a time.
	#branch(level) {
		if (this._iterLimit && this._iterLimit < this.#iterCount++) {  // Failure if repeated a specified number.
			this._debugOutput('stop: number of iterations has reached the limit');
			return false;
		}
		if (this.#endTime < Date.now()) {  // Failure if time limit is exceeded.
			this._debugOutput('stop: time limit has been reached');
			return false;
		}

		if (level === this._pro.variableSize()) {
			this.#sol.setProblem(this._pro);
			return true;
		}
		const vc_index = this.#useMRV ? this.#indexOfVariableWithMRV() : level;
		const vc       = this.#vars[vc_index];
		const d        = vc.domain();
		const dc       = vc.solverObject;
		for (let i = 0, n = d.size(); i < n; ++i) {
			if (dc.isValueHidden(i)) continue;
			vc.assign(d.at(i));
			if (this.#checkForward(level, vc_index) && this.#branch(level + 1)) return true;
			for (const v of this.#vars) {
				v.solverObject.reveal(level);
			}
		}
		vc.clear();
		return false;
	}

	// Do search.
	exec() {
		this.#endTime   = (this._timeLimit === null) ? Number.MAX_VALUE : (Date.now() + this._timeLimit);
		this.#iterCount = 0;

		this._pro.clearAllVariables();
		const r = this.#branch(0);

		for (const a of this.#sol) {
			a.apply();
			a.variable().solverObject.revealAll();
		}
		return r;
	}

	/**
	 * The settings made by this method are invalid.
	 */
	setTargetRate() {
		// Do nothing.
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

}
