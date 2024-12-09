/**
 * This class implements the SRS algorithm.
 *
 * @author Takuto Yanagida
 * @version 2024-12-09
 */

import { Problem } from '../../problem/problem';
import { Constraint } from '../../problem/constraint';
import { Assignment } from '../../util/assignment';
import { AssignmentList } from '../../util/assignment-list';
import { Solver } from '../solver';

export class SRS3 extends Solver {

	// Threshold for adopting a candidate assignment at repair time (should be 0 if strictly following SRS 3)
	static REPAIR_THRESHOLD = 0;

	#closedList: Set<TreeNode> = new Set<TreeNode>();
	#openList: Set<TreeNode> = new Set<TreeNode>();  // LinkedHashSet is used in the original implementation.
	#nodes: TreeNode[] = [];
	#neighborConstraints: (Constraint[] | null)[] = [];  // Cache

	#c_stars: Set<TreeNode> = new Set<TreeNode>();  // ArrayList is used in the original implementation.

	#iterCount: number = 0;
	#endTime: number = 0;
	#isRandom: boolean = true;

	constructor(p: Problem) {
		super(p);

		for (const c of this._pro.constraints()) {
			this.#nodes.push(new TreeNode(c));
			this.#neighborConstraints.push(null);
		}
	}

	name(): string {
		return 'SRS 3';
	}

	#getNeighborConstraints(c: Constraint): Constraint[] {
		const i: number = c.index();

		if (this.#neighborConstraints[i] === null) {
			this.#neighborConstraints[i] = c.neighbors();
		}
		return this.#neighborConstraints[i];
	}

	#repair(c0: Constraint): boolean {
		this._debugOutput('repair');

		const canList = new AssignmentList();
		const minDeg0: number = c0.satisfactionDegree();  // Target c0 should certainly be an improvement over this.
		const min: number = this._pro.worstSatisfactionDegree();  // Lower bound of neighborhood constraints.
		let maxDeg0: number = c0.satisfactionDegree();  // Satisfaction degree of target c0 for the most improvement so far.

		// If a candidate satisfying the condition is stronger than the previous candidates,
		// it is replaced, and if no candidate is found until the end, it fails.
		for (const x of c0) {
			const x_v: number = x.value();  // Save the value

			out: for (const v of x.domain()) {
				if (x_v === v) {
					continue;
				}
				x.assign(v);
				const deg0: number = c0.satisfactionDegree();
				// If target c0 cannot be improved, the assignment is rejected.
				if (minDeg0 > deg0 || maxDeg0 - deg0 > SRS3.REPAIR_THRESHOLD) {
					continue;
				}
				for (const c of x) {
					if (c === c0) {
						continue;
					}
					const deg: number = c.satisfactionDegree();
					// If one of the neighborhood constraints c is less than or equal to the worst, the assignment is rejected.
					if (deg !== Constraint.UNDEFINED && deg < min) {
						continue out;
					}
				}
				if (deg0 > maxDeg0) {
					maxDeg0 = deg0;
					canList.clear();
				}
				canList.addVariable(x, v);
			}
			x.assign(x_v);  // Restore the value
		}
		if (canList.size() > 0) {
			const a: Assignment = this.#isRandom ? canList.random() : canList.at(0);
			a.apply();
			this._debugOutput('\t' + a);
			return true;
		}
		return false;
	}

	#shrink(node: TreeNode): void {
		this._debugOutput('shrink');

		let removeCStar: boolean = false;
		while (true) {
			node = node.parent() as TreeNode;
			if (this.#c_stars.delete(node)) {
				removeCStar = true;
				break;
			}
			if (!this.#repair((node.parent() as TreeNode).getObject())) break;
		}
		const temp: TreeNode[] = [];
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

	#spread(node: TreeNode): void {
		this._debugOutput('spread');
		this.#closedList.add(node);

		for (const c of this.#getNeighborConstraints(node.getObject())) {
			const tnc: TreeNode = this.#nodes[c.index()];

			if (!this.#closedList.has(tnc) && !this.#openList.has(tnc)) {  // For constraints that are not included in Open or Closed.
				node.add(tnc);
				this.#openList.add(tnc);
			}
		}
	}

	#srs(): boolean {
		this._debugOutput('srs');

		const [wsd_cs,] = this._pro.constraintsWithWorstSatisfactionDegree();
		for (const c of wsd_cs) {
			const cn: TreeNode = this.#nodes[c.index()];
			cn.setParent(null);
			this.#c_stars.add(cn);
		}
		this.#closedList.clear();
		this.#openList.clear();
		for (const n of this.#c_stars) {
			this.#openList.add(n);
		}

		while (this.#c_stars.size && this.#openList.size) {
			if (this._iterLimit && this._iterLimit < this.#iterCount++) {  // Failure if repeated a specified number
				this._debugOutput('stop: number of iterations has reached the limit');
				return false;
			}
			if (this.#endTime < Date.now()) {  // Failure if time limit is exceeded
				this._debugOutput('stop: time limit has been reached');
				return false;
			}

			const node = this.#openList.values().next().value as TreeNode;
			this.#openList.delete(node);

			if (this.#repair(node.getObject())) {
				if (this.#c_stars.delete(node)) continue;  // If the repaired node is included in C* (to be deleted)
				if (this.#repair((node.parent() as TreeNode).getObject())) {
					this.#shrink(node);  // When its improvement leads to the improvement of its parents
					continue;
				}
			}
			this.#spread(node);
		}
		return true;
	}

	exec(): boolean {
		this.#endTime = (this._timeLimit === null) ? Number.MAX_VALUE : (Date.now() + this._timeLimit);
		this.#iterCount = 0;
		if (this._targetDeg && this._targetDeg <= this._pro.worstSatisfactionDegree()) {
			return true;
		}
		const sol = new AssignmentList();

		let success: boolean = false;
		while (true) {
			const ret: boolean = this.#srs();
			if (!ret || this.#c_stars.size) {
				break;
			}
			const solutionWorstDeg: number = this._pro.worstSatisfactionDegree();
			if (-1 === solutionWorstDeg) {
				continue;
			}
			this._debugOutput(`\tfound a solution: ${solutionWorstDeg}\t${this._targetDeg}`);
			sol.setProblem(this._pro);

			if (this.foundSolution(sol, solutionWorstDeg)) {  // Call hook
				success = true;
				break;
			}
			if (this._targetDeg === null) {  // Satisfaction degree is not specified
				success = true;
			} else if (this._targetDeg <= solutionWorstDeg) {  // The current degree exceeded the specified degree.
				this._debugOutput('stop: current degree is above the target');
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
	setRandomness(flag: boolean): void {
		this.#isRandom = flag;
	}

}

class TreeNode {

	#children: TreeNode[] = [];
	#parent: TreeNode | null;
	#obj: any;

	constructor(obj: any) {
		this.#parent = null;
		this.#obj = obj;
	}

	add(tn: TreeNode): void {
		tn.#parent = this;
		this.#children.push(tn);
	}

	clear(): void {
		for (const tn of this.#children) {
			tn.#parent = null;
		}
		this.#children.length = 0;
	}

	getDescendants(tns: TreeNode[]): void {
		tns.push(this);

		for (const tn of this.#children) {
			tn.getDescendants(tns);
		}
	}

	getObject(): any {
		return this.#obj;
	}

	parent(): TreeNode | null {
		return this.#parent;
	}

	setParent(p: TreeNode | null): void {
		this.#parent = p;
	}

}
