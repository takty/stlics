/**
 * This class implements the SRS algorithm for crisp CSP.
 * The given crisp CSP is treated as the maximum CSP.
 * Similar to SRS 3, the repair algorithm searches for an assignment that satisfies itself without reducing the number of satisfactions of its neighbors.
 *
 * @author Takuto Yanagida
 * @version 2023-04-16
 */

import { AssignmentList } from '../../util/assignment-list.js';
import { Solver } from '../solver.js';

export class CrispSRS3 extends Solver {

	#closedList          = new Set();
	#openList            = new Set();  // LinkedHashSet is used in the original implementation.
	#nodes               = [];
	#neighborConstraints = [];  // Cache

	#isRandom = true;

	constructor(p) {
		super(p);
		for (const c of this._pro.constraints()) {
			this.#nodes.push(new CrispSRS3.TreeNode(c));
			this.#neighborConstraints.push(null);
		}
	}

	name() {
		return 'SRS 3 for Crisp CSPs';
	}

	#getNeighborConstraints(c) {
		const index = c.index();

		if (this.#neighborConstraints[index] === null) {
			this.#neighborConstraints[index] = c.neighbors();
		}
		return this.#neighborConstraints[index];
	}

	#repair(c0) {
		this._debugOutput('repair');

		const canList = new AssignmentList();
		let maxDiff = 0;

		for (const v of c0) {
			const v_val = v.value();  // Save the value

			let nowVio = 0;
			for (const c of v) {
				nowVio += (1 - c.isSatisfied());
			}
			out: for (const d of v.domain()) {
				if (v_val === d) continue;
				v.assign(d);
				if (c0.isSatisfied() !== 1) continue;  // Assuming c0 improvement

				let diff = nowVio;
				for (const n of v) {
					diff -= (1 - n.isSatisfied());
					if (diff < maxDiff) continue out;  // If the improvement is less than the previous improvement, try the next variable.
				}
				if (diff > maxDiff) {  // An assignment that are better than ever before is found.
					maxDiff = diff;
					canList.clear();
					canList.addVariable(v, d);
				} else if (maxDiff !== 0) {  // An assignments that can be improved to the same level as before is found.
					canList.addVariable(v, d);
				}
			}
			v.assign(v_val);  // Restore the value
		}
		if (canList.size() > 0) {
			const e = this.#isRandom ? canList.random() : canList.at(0);
			e.apply();
			this._debugOutput('\t' + e);
			return true;
		}
		return false;
	}

	#shrink(node, c_stars) {
		const temp = [];
		let cur = node;

		while (true) {  // This procedure is originally a recursive call, but converted to a loop
			cur = cur.parent();
			temp.length = 0;
			cur.getDescendants(temp);
			cur.clear();

			for (const n of c_stars) {
				this.#openList.delete(n);
				this.#closedList.delete(n);
			}

			if (c_stars.delete(cur)) {
				break;
			}
			this.#openList.add(cur);
			if (cur.parent() !== null && !this.#repair(cur.parent().getObject())) {
				break;
			}
		}
	}

	#spread(node) {
		this._debugOutput('spread');
		this.#closedList.add(node);

		for (const c of this.#getNeighborConstraints(node.getObject())) {
			const tnc = this.#nodes[c.index()];

			if (!this.#closedList.has(tnc) && !this.#openList.has(tnc)) {  // For constraints that are not included in Open or Closed
				tnc.clear();  // Because of its reuse, it may have had children when it was used before.
				node.add(tnc);
				this.#openList.add(tnc);
			}
		}
	}

	#srs(c_stars) {
		this._debugOutput('srs');
		const endTime = (this._timeLimit === null) ? Number.MAX_VALUE : (Date.now() + this._timeLimit);
		let iterCount = 0;

		this.#closedList.clear();
		this.#openList.clear();
		for (const n of c_stars) {
			this.#openList.add(n);
		}

		while (c_stars.size && this.#openList.size) {
			if ((this._targetDeg ?? 1) <= this._pro.satisfiedConstraintRate()) {  // Success if violation rate improves from specified
				this._debugOutput('stop: current degree is above the target');
				return true;
			}
			if (this._iterLimit && this._iterLimit < iterCount++) {  // Failure if repeated a specified number
				this._debugOutput('stop: number of iterations has reached the limit');
				return false;
			}
			if (endTime < Date.now()) {  // Failure if time limit is exceeded
				this._debugOutput('stop: time limit has been reached');
				return false;
			}

			const node = this.#openList.values().next().value;
			this.#openList.delete(node);

			if (this.#repair(node.getObject())) {
				if (!c_stars.delete(node)) {  // If the repaired node is included in C* (to be deleted)
					if (node.parent() !== null && this.#repair(node.parent().getObject())) {  // When its improvement leads to the improvement of its parents
						this.#shrink(node, c_stars);
					} else {
						this.#spread(node);
					}
				}
			} else {  // In case of repair failure
				this.#spread(node);
			}
		}
		return false;
	}

	exec() {
		const vcs     = this._pro.violatingConstraints();
		const c_stars = new Set();

		for (const c of vcs) {
			const tnc = this.#nodes[c.index()];
			c_stars.add(tnc);
		}
		if (this.#srs(c_stars)) {
			return true;
		}
		return c_stars.length === 0;
	}

	/**
	 * Sets the randomness of the algorithm.
	 * Enabling randomness reduces the risk of falling into a local solution, but makes the solution unrepeatable.
	 * @param flag If true, randomness is enabled.
	 */
	setRandomness(flag) {
		this.#isRandom = flag;
	}

}

{

	class TreeNode {

		#children = [];
		#parent;
		#obj;

		constructor(obj) {
			this.#obj = obj;
		}

		add(tn) {
			tn.#parent = this;
			this.#children.push(tn);
		}

		clear() {
			for (const tn of this.#children) {
				tn.#parent = null;
			}
			this.#children.length = 0;
		}

		getDescendants(tns) {
			tns.push(this);

			for (const tn of this.#children) {
				tn.getDescendants(tns);
			}
		}

		getObject() {
			return this.#obj;
		}

		parent() {
			return this.#parent;
		}

	}
	CrispSRS3.TreeNode = TreeNode;

}
