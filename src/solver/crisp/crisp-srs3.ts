/**
 * This class implements the SRS3 algorithm for crisp CSP.
 * The given crisp CSP is treated as the maximum CSP.
 *
 * @author Takuto Yanagida
 * @version 2025-01-24
 */

import { Constraint } from '../../problem/constraint';
import { Assignment } from '../misc/assignment';
import { AssignmentList } from '../misc/assignment-list';
import { rand } from '../misc/random';
import { Solver } from '../solver';

export class CrispSRS3 extends Solver {

	#ws!: number[];

	#closedList!: Set<TreeNode>;
	#openList!  : Set<TreeNode>;  // LinkedHashSet is used in the original implementation.
	#nodes!     : TreeNode[];
	#neighbors! : (TreeNode[] | null)[];  // Cache

	#isRandom: boolean = true;

	/**
	 * Generates a solver.
	 */
	constructor() {
		super();
	}

	/**
	 * Sets the randomness of the algorithm.
	 * Enabling randomness reduces the risk of falling into a local solution, but makes the solution unrepeatable.
	 * @param flag If true, randomness is enabled.
	 */
	setRandomness(flag: boolean): void {
		this.#isRandom = flag;
	}

	/**
	 * {@override}
	 */
	override name(): string {
		return 'Crisp SRS3';
	}

	/**
	 * {@override}
	 */
	protected override preprocess(): void {
		this.#ws = new Array(this.pro.constraintSize());
		this.#ws.fill(1);

		this.#closedList = new Set();
		this.#openList   = new Set();
		this.#nodes      = [];
		this.#neighbors  = [];

		for (const c of this.pro.constraints()) {
			this.#nodes.push(new TreeNode(c));
			this.#neighbors.push(null);
		}

		for (const x of this.pro.variables()) {
			if (x.isEmpty()) {
				x.assign(x.domain().at(0));
			}
		}
		this.monitor.initialize();
	}

	/**
	 * {@override}
	 */
	protected override exec(): boolean {
		const defEv: number         = this.pro.degree();
		const sol  : AssignmentList = new AssignmentList();
		let solEv  : number         = defEv;

		let ret: boolean | null = null;

		while (true) {
			const cs: Constraint[] = this.pro.violatingConstraints();
			const ev: number = this.pro.ratio();
			this.monitor.outputDebugString(`Evaluation: ${ev}`);

			if (solEv < ev) {
				sol.setProblem(this.pro);
				solEv = ev;

				if (this.monitor.solutionFound(sol, solEv)) {
					return true;
				}
			}
			if (null !== (ret = this.monitor.check(ev))) {
				break;
			}

			for (const tn of this.#nodes) {
				tn.clear();
			}
			const c_stars = new Set<TreeNode>();
			for (const c of cs) {
				const tn: TreeNode = this.#nodes[c.index()];
				c_stars.add(tn);
			}
			this.#srs(c_stars);
		}

		if (false === ret && !this.monitor.isTargetAssigned() && defEv < solEv) {
			sol.apply();
			ret = true;
		}
		return ret;
	}

	#srs(c_stars: Set<TreeNode>): boolean {
		this.monitor.outputDebugString('SRS');

		this.#closedList.clear();
		this.#openList.clear();
		for (const tn of c_stars) {
			this.#openList.add(tn);
		}

		while (c_stars.size && this.#openList.size) {
			const node: TreeNode = this.#getElementFromSet(this.#openList);
			this.#openList.delete(node);

			if (!this.#repair(node.constraint())) {
				this.#spread(node);
			} else if (c_stars.delete(node)) {
				// If the repaired node is included in C* (to be deleted)
			} else if (node.parent() && this.#repair((node.parent() as TreeNode).constraint())) {
				this.#shrink(node, c_stars);  // When its improvement leads to the improvement of its parents
			} else {
				this.#spread(node);
			}
		}
		return 0 === c_stars.size;
	}

	#spread(tn: TreeNode): void {
		this.monitor.outputDebugString('Spread');
		this.#closedList.add(tn);

		for (const n of this.#getNeighbors(tn)) {
			// For constraints that are not included in Open or Closed.
			if (!this.#closedList.has(n) && !this.#openList.has(n)) {
				n.clear();
				tn.append(n);
				this.#openList.add(n);
			}
		}
	}

	#repair(c0: Constraint): boolean {
		this.monitor.outputDebugString('Repair');
		this.#ws[c0.index()] += 1;

		const canList = new AssignmentList();
		let maxDiff: number = 0;

		for (const x of c0) {
			const x_v: number = x.value();  // Save the value

			let nowEv: number = 0;
			for (const c of x) {
				nowEv += (1 - c.status()) * this.#ws[c.index()];
			}
			out: for (const v of x.domain()) {
				if (x_v === v) {
					continue;
				}
				x.assign(v);
				if (c0.status() !== 1) {
					continue;
				}
				let diff: number = nowEv;

				for (const c of x) {
					diff -= (1 - c.status()) * this.#ws[c.index()];
					// If the improvement is less than the previous improvement, try the next variable.
					if (diff < maxDiff) {
						continue out;
					}
				}
				if (maxDiff < diff) {  // An assignment that are better than ever before is found.
					maxDiff = diff;
					canList.clear();
					canList.addVariable(x, v);
				} else if (maxDiff !== 0) {  // An assignments that can be improved to the same level as before is found.
					canList.addVariable(x, v);
				}
			}
			x.assign(x_v);  // Restore the value
		}
		if (0 < canList.size()) {
			const a: Assignment = this.#isRandom ? canList.random() : canList.at(0);
			a.apply();
			this.monitor.outputDebugString('\t' + a);
			return true;
		}
		return false;
	}

	#shrink(node: TreeNode, c_stars: Set<TreeNode>): void {
		this.monitor.outputDebugString('Shrink');

		let cur         : TreeNode = node;
		let curIsRemoved: boolean  = false;

		while (true) {
			cur = cur.parent() as TreeNode;
			if (c_stars.delete(cur)) {
				curIsRemoved = true;
				break;
			}
			if (!cur.parent() || !this.#repair((cur.parent() as TreeNode).constraint())) {
				break;
			}
		}
		const temp: TreeNode[] = [];
		cur.getDescendants(temp);  // temp contains node.
		cur.clear();  // Prepare for reuse

		for (const n of temp) {
			this.#openList.delete(n);
			this.#closedList.delete(n);
		}
		if (!curIsRemoved) {
			this.#openList.add(cur);
		}
	}

	#getNeighbors(tn: TreeNode): TreeNode[] {
		const c: Constraint = tn.constraint();
		const i: number     = c.index();

		if (this.#neighbors[i] === null) {
			const ns: TreeNode[] = [];
			for (const d of c.neighbors()) {
				ns.push(this.#nodes[d.index()]);
			}
			this.#neighbors[i] = ns;
		}
		return this.#neighbors[i];
	}

	#getElementFromSet(set: Set<TreeNode>): TreeNode {
		const ms : TreeNode[] = this.#selectLightestNode(this.#selectNearestNode(set));
		return this.#isRandom ? ms[rand(ms.length)] : ms[0];
	}

	#selectLightestNode(set: Iterable<TreeNode>): TreeNode[] {
		let curW: number     = Number.MAX_VALUE;
		let ms  : TreeNode[] = [];

		for (const tn of set) {
			const w: number = this.#ws[tn.constraint().index()];
			if (w < curW) {
				curW = w;
				ms.length = 0;
				ms.push(tn);
			} else if (w === curW) {
				ms.push(tn);
			}
		}
		return ms;
	}

	#selectNearestNode(set: Iterable<TreeNode>): TreeNode[] {
		let curD: number     = Number.MAX_VALUE;
		let ms  : TreeNode[] = [];

		for (const tn of set) {
			const d: number = tn.depth();
			if (d < curD) {
				curD = d;
				ms.length = 0;
				ms.push(tn);
			} else if (d === curD) {
				ms.push(tn);
			}
		}
		return ms;
	}

}

class TreeNode {

	#c       : Constraint;
	#depth   : number = 0;
	#parent  : TreeNode | null = null;
	#children: TreeNode[] = [];

	constructor(c: Constraint) {
		this.#c = c;
	}

	append(tn: TreeNode): void {
		tn.#parent = this;
		tn.#depth  = this.#depth + 1;
		this.#children.push(tn);
	}

	clear(): void {
		this.#parent = null;
		this.#depth  = 0;
		for (const tn of this.#children) {
			tn.clear();
		}
		this.#children.length = 0;
	}

	constraint(): Constraint {
		return this.#c;
	}

	depth(): number {
		return this.#depth;
	}

	parent(): TreeNode | null {
		return this.#parent;
	}

	getDescendants(tns: TreeNode[]): void {
		tns.push(this);

		for (const tn of this.#children) {
			tn.getDescendants(tns);
		}
	}

}
