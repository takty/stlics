/**
 * This class implements GENET.
 * CSP (but only Binary CSP) is supported.
 * Find the solution to the problem as the maximum CSP.
 *
 * @author Takuto Yanagida
 * @version 2025-01-24
 */

import { Variable } from '../../problem/variable';
import { Constraint } from '../../problem/constraint';
import { AssignmentList } from '../misc/assignment-list';
import { rand } from '../misc/random';
import { Solver } from '../solver';

export class GENET extends Solver {

	#clusters!   : Cluster[];
	#connections!: Connection[];

	/**
	 * Generates a solver.
	 */
	constructor() {
		super();
	}

	/**
	 * {@override}
	 */
	override name(): string {
		return 'GENET';
	}

	/**
	 * {@override}
	 */
	protected override preprocess(): void {
		this.#clusters    = [];
		this.#connections = [];

		if (!this.#createNetwork()) {
			throw new Error();
		}
		this.monitor.initialize();
	}

	/**
	 * {@override}
	 */
	protected override exec(): boolean {
		const order: number[] = [...Array(this.#clusters.length).keys()];

		const defEv: number         = this.pro.ratio();
		const sol  : AssignmentList = new AssignmentList();
		let solEv  : number         = defEv;

		let ret: boolean | null = null;

		while(true) {
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
			this.#next(order);
		}

		if (false === ret && !this.monitor.isTargetAssigned() && defEv < solEv) {
			sol.apply();
			ret = true;
		}
		return ret;
	}

	#createNetwork(): boolean {
		this.monitor.outputDebugString('Start of Network Generation');
		const cons: Connection[] = [];

		for (const x of this.pro.variables()) {
			if (x.domain().size() === 0) {
				return false;
			}
			this.#clusters.push(new Cluster(x));
		}
		for (const c of this.pro.constraints()) {
			if (c.size() === 1) {  // In the case of unary constraints.
				const x : Variable = c.at(0) as Variable;
				const cl: Cluster  = this.#clusters[x.index()];

				for (const n of cl) {
					const origV: number = x.value();  // Save the value.
					x.assign(n._value);

					if (c.status() !== 1) {
						cons.push(new Connection(c, n));
					}
					x.assign(origV);  // Restore the value.
				}
			} else {  // In the case of binary constraints.
				const x1  : Variable = c.at(0) as Variable;
				const x2  : Variable = c.at(1) as Variable;
				const cl_f: Cluster  = this.#clusters[x1.index()];
				const cl_s: Cluster  = this.#clusters[x2.index()];

				for (const n_f of cl_f) {
					const origV1: number = x1.value();  // Save the value.
					x1.assign(n_f._value);

					for (const n_s of cl_s) {
						const origV2: number = x2.value();  // Save the value.
						x2.assign(n_s._value);

						if (c.status() !== 1) {
							cons.push(new Connection(c, n_f, n_s));
						}
						x2.assign(origV2);  // Restore the value.
					}
					x1.assign(origV1);  // Restore the value.
				}
			}
		}
		this.#connections = cons;
		this.monitor.outputDebugString('End of Network Generation');
		return true;
	}

	#next(order: number[]): void {
		let mod: boolean = false;
		for (const i of this.#shuffle(order)) {
			if (this.#clusters[i].setActivityMaximumInput()) {
				mod = true; // Turn on the node with the largest input in each cluster
			}
		}
		if (!mod) { // When the local minimum solution is reached.
			for (const con of this.#connections) {
				con.refreshWeight(); // Update weights for all connections
			}
			this.monitor.outputDebugString('\tRefresh weights');
		} else {
			for (const clu of this.#clusters) {
				clu.applyToVariable();
			}
		}
	}

	#shuffle(is: number[]): number[] {
		for (let i: number = is.length - 1; 0 < i; --i) {
			const j: number = rand(i + 1);
			[is[i], is[j]] = [is[j], is[i]];
		}
		return is;
	}

}

class Cluster {

	#x    : Variable;  // For avoiding a bug(?) of parcel.
	#index: number   = 0;
	#maxNs: number[] = [];
	_ns   : Neuron[] = [];

	constructor(x: Variable) {
		this.#x = x;

		for (const v of x.domain()) {
			this._ns.push(new Neuron(v));
		}
		this.#setActivity(rand(this._ns.length));
	}

	#setActivity(index: number): void {
		for (const n of this._ns) {
			n._isActive = false;
		}
		this._ns[index]._isActive = true;
		this.#index = index;
	}

	applyToVariable(): void {
		this.#x.assign(this._ns[this.#index]._value);
	}

	// Turn on the node with the largest input.
	setActivityMaximumInput(): boolean {
		this.#maxNs.length = 0;

		let max      : number  = Number.NEGATIVE_INFINITY;
		let alreadyOn: boolean = false;

		for (let i: number = 0; i < this._ns.length; ++i) {
			const input: number = this._ns[i].getInput();

			if (max <= input) {
				if (max < input) {
					max = input;
					this.#maxNs.length = 0;
					alreadyOn = false;
				}
				this.#maxNs.push(i);
				if (this.#index === i) {
					alreadyOn = true;
				}
			}
		}
		if (alreadyOn || 0 === this.#maxNs.length) {
			return false;
		}
		this.#setActivity(this.#maxNs[rand(this.#maxNs.length)]);
		return true;
	}

	[Symbol.iterator](): Iterator<Neuron> {
		return this._ns[Symbol.iterator]();
	}

}

class Connection {

	#c : Constraint;
	#n0: Neuron;
	#n1: Neuron | null;
	_w : number;  // Direct reference (read) allowed.

	// Order of neurons must be the same as the order of variables that the constraint has.
	constructor(c: Constraint, first: Neuron, second: Neuron | null = null) {
		this.#c  = c;
		this.#n0 = first;
		this.#n1 = second;
		this._w  = c.status() - 1;

		this.#n0.addConnection(this);
		if (this.#n1) {
			this.#n1.addConnection(this);
		}
	}

	getNeuron(self: Neuron): Neuron | null {
		if (self === this.#n0) return this.#n1;
		if (self === this.#n1) return this.#n0;
		return null;
	}

	refreshWeight(): void {
		if (!this.#n0._isActive || (this.#n1 !== null && !this.#n1._isActive)) {
			return;
		}
		const r: (...vs: number[]) => number = this.#c.relation();
		if (this.#c.size() === 1) {
			this._w += (r(this.#n0._value) - 1);
		} else {
			this._w += (r(this.#n0._value, (this.#n1 as Neuron)._value) - 1);
		}
	}

}

class Neuron {

	#connections: Connection[] = [];

	_value   : number;  // Direct reference (read) allowed.
	_isActive: boolean = false;  // Direct reference (read, write) allowed.

	constructor(value: number) {
		this._value = value;
	}

	addConnection(c: Connection): void {
		this.#connections.push(c);
	}

	getInput(): number {
		let ret: number = 0;

		for (const c of this.#connections) {
			const n: Neuron | null = c.getNeuron(this);  // If n is null, then the unary constraint.
			ret += c._w * ((n === null || n._isActive) ? 1 : 0);
		}
		return ret;
	}

}
