/**
 * This class implements the SRS algorithm for crisp CSP.
 * The given crisp CSP is treated as the maximum CSP.
 * Similar to SRS 3, the repair algorithm searches for an assignment that
 * satisfies itself without reducing the number of satisfactions of its neighbors.
 *
 * @author Takuto Yanagida
 * @version 2024-10-22
 */

import { Problem } from '../../problem/problem';
import { CrispProblem } from '../../problem/problem-crisp';
import { Constraint } from '../../problem/constraint';
import { Assignment } from '../../util/assignment';
import { AssignmentList } from '../../util/assignment-list';
import { Solver } from '../solver';

export class CrispSRS3 extends Solver {

	#isRandom: boolean = true;

	#closedList: Set<TreeNode> = new Set();
	#openList: Set<TreeNode> = new Set();  // LinkedHashSet is used in the original implementation.
	#nodes: TreeNode[] = [];
	#neighborConstraints: (Constraint[] | null)[] = [];  // Cache

	/**
	 * Generates a solver given a constraint satisfaction problem.
	 * @param p A crisp problem.
	 */
	constructor(p: CrispProblem) {
		super(p as Problem);

		for (const c of this._pro.constraints()) {
			this.#nodes.push(new TreeNode(c));
			this.#neighborConstraints.push(null);
		}
	}

	name(): string {
		return 'SRS 3 for Crisp CSPs';
	}

	/**
	 * Sets the randomness of the algorithm.
	 * Enabling randomness reduces the risk of falling into a local solution, but makes the solution unrepeatable.
	 * @param flag If true, randomness is enabled.
	 */
	setRandomness(flag: boolean): void {
		this.#isRandom = flag;
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
		let maxDiff: number = 0;

		for (const x of c0) {
			const x_v: number = x.value();  // Save the value

			let nowVio: number = 0;
			for (const c of x) {
				nowVio += (1 - c.isSatisfied());
			}
			out: for (const v of x.domain()) {
				if (x_v === v) {
					continue;
				}
				x.assign(v);
				if (c0.isSatisfied() !== 1) {
					continue;  // Assuming c0 improvement
				}
				let diff: number = nowVio;
				for (const c of x) {
					diff -= (1 - c.isSatisfied());
					if (diff < maxDiff) {
						continue out;  // If the improvement is less than the previous improvement, try the next variable.
					}
				}
				if (diff > maxDiff) {  // An assignment that are better than ever before is found.
					maxDiff = diff;
					canList.clear();
					canList.addVariable(x, v);
				} else if (maxDiff !== 0) {  // An assignments that can be improved to the same level as before is found.
					canList.addVariable(x, v);
				}
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

	#shrink(node: TreeNode, c_stars: Set<TreeNode>): void {
		const temp: TreeNode[] = [];
		let cur: TreeNode = node;

		while (true) {  // This procedure is originally a recursive call, but converted to a loop
			cur = cur.parent() as TreeNode;
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
			if (cur.parent() !== null && !this.#repair((cur.parent() as TreeNode).getObject())) {
				break;
			}
		}
	}

	#spread(n: TreeNode): void {
		this._debugOutput('spread');
		this.#closedList.add(n);

		for (const c of this.#getNeighborConstraints(n.getObject())) {
			const tnc: TreeNode = this.#nodes[c.index()];

			if (!this.#closedList.has(tnc) && !this.#openList.has(tnc)) {  // For constraints that are not included in Open or Closed
				tnc.clear();  // Because of its reuse, it may have had children when it was used before.
				n.add(tnc);
				this.#openList.add(tnc);
			}
		}
	}

	#srs(c_stars: Set<TreeNode>): boolean {
		this._debugOutput('srs');
		const endTime: number = (this._timeLimit === null) ? Number.MAX_VALUE : (Date.now() + this._timeLimit);
		let iterCount: number = 0;

		this.#closedList.clear();
		this.#openList.clear();
		for (const n of c_stars) {
			this.#openList.add(n);
		}
		const p = this._pro as CrispProblem;

		while (c_stars.size && this.#openList.size) {
			if ((this._targetDeg ?? 1) <= p.satisfiedConstraintRate()) {  // Success if violation rate improves from specified
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

			const node: TreeNode = this.#openList.values().next().value as TreeNode;
			this.#openList.delete(node);

			if (this.#repair(node.getObject())) {
				if (!c_stars.delete(node)) {  // If the repaired node is included in C* (to be deleted)
					if (node.parent() !== null && this.#repair((node.parent() as TreeNode).getObject() as Constraint)) {  // When its improvement leads to the improvement of its parents
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

	exec(): boolean {
		const vcs: Constraint[] = (this._pro as CrispProblem).violatingConstraints();
		const c_stars = new Set<TreeNode>();

		for (const c of vcs) {
			const tnc: TreeNode = this.#nodes[c.index()];
			c_stars.add(tnc);
		}
		if (this.#srs(c_stars)) {
			return true;
		}
		return c_stars.size === 0;
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

}
