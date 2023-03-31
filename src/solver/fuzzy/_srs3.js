/**
 * This class implements the SRS algorithm.
 *
 * @author Takuto Yanagida
 * @version 2023-03-31
 */

class SRS3 extends Solver {

	// Threshold for adopting a candidate assignment at repair time (should be 0 if strictly following SRS 3)
	static REPAIR_THRESHOLD = 0;

	#closedList          = new Set();
	#openList            = new Set();  // LinkedHashSet is used in the original implementation.
	#nodes               = [];
	#neighborConstraints = [];  // Cache

	#c_stars = new Set();  // ArrayList is used in the original implementation.

	#iterCount;
	#endTime;
	#isRandom = true;

	constructor(p) {
		super(p);
		for (const c of this._pro.constraints()) {
			this.#nodes.push(new CrispSRS3.TreeNode(c));
			this.#neighborConstraints.push(null);
		}
	}

	name() {
		return 'SRS 3';
	}

	foundSolution(solution, worstDegree) {
		return false;
	}

	#getNeighborConstraints(c) {
		const index = c.index();

		if (this.#neighborConstraints[index] === null) {
			this.#neighborConstraints[index] = c.neighbors([]);
		}
		return this.#neighborConstraints[index];
	}

	#repair(c0) {
		if (this._debug) console.log('repair');

		const candidates = new AssignmentList();
		const minDeg0    = c0.satisfactionDegree();  // Target c0 should certainly be an improvement over this.
		const min        = this._pro.worstSatisfactionDegree();  // Lower bound of neighborhood constraints.
		let maxDeg0 = c0.satisfactionDegree();  // Satisfaction degree of target c0 for the most improvement so far.

		// If a candidate satisfying the condition is stronger than the previous candidates,
		// it is replaced, and if no candidate is found until the end, it fails.
		for (let i = 0; i < c0.size(); ++i) {
			const v     = c0.at(i);
			const v_val = v.value();  // Save the value
			const v_c   = v.constraints();
			const v_d   = v.domain();

			out: for (let j = 0; j < v_d.size(); ++j) {
				const d = v_d.at(j);
				if (v_val === d) continue;
				v.assign(d);
				const deg0 = c0.satisfactionDegree();
				// If target c0 cannot be improved, the assignment is rejected.
				if (minDeg0 > deg0 || maxDeg0 - deg0 > SRS3.REPAIR_THRESHOLD) continue;

				for (const c of v_c) {
					if (c === c0) continue;
					const deg = c.satisfactionDegree();
					// If one of the neighborhood constraints c is less than or equal to the worst, the assignment is rejected.
					if (deg !== Constraint.UNDEFINED && deg < min) continue out;
				}
				if (deg0 > maxDeg0) {
					maxDeg0 = deg0;
					candidates.clear();
				}
				candidates.addVariable(v, d);
			}
			v.assign(v_val);  // Restore the value
		}
		if (candidates.size() > 0) {
			const e = this.#isRandom ? candidates.arbitraryAssignment() : candidates.get(0);
			console.log(e);
			e.apply();
			if (this._debug) console.log('\t' + e);
			return true;
		}
		return false;
	}

	#shrink(node) {
		if (this._debug) console.log('shrink');

		let removeCStar = false;
		while (true) {
			node = node.parent();
			if (this.#c_stars.delete(node)) {
				removeCStar = true;
				break;
			}
			if (!this.#repair(node.parent().getObject())) break;
		}
		const temp = [];
		node.getDescendants(temp);  // temp contains node.

		for (const n of temp) {
			n.clear();  // Prepare for reuse
			this.#openList.delete(n);
			this.#closedList.delete(n);
		}

		if (!removeCStar) {
			this.#openList.add(node);
		}
	}

	#spread(node) {
		if (this._debug) console.log('spread');
		this.#closedList.add(node);

		for (const c of this.#getNeighborConstraints(node.getObject())) {
			const cn = this.#nodes[c.index()];

			if (!this.#closedList.has(cn) && !this.#openList.has(cn)) {  // For constraints that are not included in Open or Closed.
				node.add(cn);
				this.#openList.add(cn);
			}
		}
	}

	#srs() {
		if (this._debug) console.log('srs');

		const wsdcs = [];
		this._pro.constraintsWithWorstSatisfactionDegree(wsdcs);
		for (const c of wsdcs) {
			const cn = this.#nodes[c.index()];
			cn.setParent(null);
			this.#c_stars.add(cn);
		}
		this.#closedList.clear();
		this.#openList.clear();
		for (const n of this.#c_stars) {
			this.#openList.add(n);
		}

		while (this.#c_stars.size && this.#openList.size) {
			if (this._iterLimit && this._iterLimit < iterCount++) {  // Failure if repeated a specified number
				if (this._debug) console.log('stop: number of iterations has reached the limit');
				return false;
			}
			if (this.#endTime < Date.now()) {  // Failure if time limit is exceeded
				if (this._debug) console.log('stop: time limit has been reached');
				return false;
			}

			const node = this.#openList.values().next().value;
			this.#openList.delete(node);

			if (this.#repair(node.getObject())) {
				if (this.#c_stars.delete(node)) continue;  // If the repaired node is included in C* (to be deleted)
				if (this.#repair(node.parent().getObject())) {
					this.#shrink(node);  // When its improvement leads to the improvement of its parents
					continue;
				}
			}
			this.#spread(node);
		}
		return true;
	}

	exec() {
		this.#endTime   = (this._timeLimit === null) ? Number.MAX_VALUE : (Date.now() + this._timeLimit);
		this.#iterCount = 0;
		if (this._targetDeg && this._targetDeg <= this._pro.worstSatisfactionDegree()) {
			return true;
		}
		const sol = new AssignmentList();

		let success = false;
		while (true) {
			const ret = this.#srs();
			if (!ret || this.#c_stars.size) {
				break;
			}
			const solutionWorstDeg = this._pro.worstSatisfactionDegree();
			if (this._debug) {
				console.log(`\tfound a solution: ${solutionWorstDeg}\t${this._targetDeg}`);
			}
			sol.setProblem(this._pro);

			if (this.foundSolution(sol, solutionWorstDeg)) {  // Call hook
				success = true;
				break;
			}
			if (this._targetDeg === null) {  // Satisfaction degree is not specified
				success = true;
			} else if (this._targetDeg <= solutionWorstDeg) {  // The current degree exceeded the specified degree.
				if (this._debug) console.log('stop: current degree is above the target');
				success = true;
				break;
			}
		}
		return success;
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

		setParent(p) {
			this.#parent = p;
		}

	}
	CrispSRS3.TreeNode = TreeNode;

}
