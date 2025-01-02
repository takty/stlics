/**
 * This class implements fuzzy GENET.
 * CSPs and FCSPs (but only Binary (F)CSPs) is supported.
 *
 * @author Takuto Yanagida
 * @version 2024-12-21
 */

import { Problem } from '../../problem/problem';
import { Variable } from '../../problem/variable';
import { Constraint } from '../../problem/constraint';
import { AssignmentList } from '../misc/assignment-list';
import { Solver } from '../solver';

export class FuzzyGENET extends Solver {

	#clusters   : Cluster[]    = [];
	#connections: Connection[] = [];
	#degree     : number;

	/**
	 * Generates a solver given a constraint satisfaction problem.
	 * @param p A problem.
	 */
	constructor(p: Problem, degree: number = 1) {
		super(p);
		this.#degree = degree;
	}

	name(): string {
		return 'Fuzzy GENET';
	}

	exec(): boolean {
		if (!this.#createNetwork()) {
			throw new Error();
		}
		const order: number[] = [...Array(this.#clusters.length).keys()];

		const defEv: number         = this.pro.degree();
		const sol  : AssignmentList = new AssignmentList();
		let solEv  : number         = defEv;

		this.monitor.initialize();

		let ret: boolean | null = null;

		while(true) {
			const ev: number = this.pro.degree();
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
				const x: Variable = c.at(0) as Variable;
				const cl: Cluster = this.#clusters[x.index()];

				for (const n of cl) {
					const origV: number = x.value();  // Save the value.
					x.assign(n._value);

					if (c.degree() <= this.#degree) {
						cons.push(new Connection(c, n));
					}
					x.assign(origV);  // Restore the value.
				}
			} else {  // In the case of binary constraints.
				const x1: Variable  = c.at(0) as Variable;
				const x2: Variable  = c.at(1) as Variable;
				const cl_f: Cluster = this.#clusters[x1.index()];
				const cl_s: Cluster = this.#clusters[x2.index()];

				for (const n_f of cl_f) {
					const origV1: number = x1.value();  // Save the value.
					x1.assign(n_f._value);

					for (const n_s of cl_s) {
						const origV2: number = x2.value();  // Save the value.
						x2.assign(n_s._value);

						if (c.degree() <= this.#degree) {
							cons.push(new Connection(c, n_f, n_s));
						}
						x2.assign(origV2);  // Restore the value.
					}
					x1.assign(origV1);  // Restore the value.
				}
			}
		}
		for (const cl of this.#clusters) {
			for (const n of cl._neurons) {
				n.lockConnections();
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
		} else {
			for (const clu of this.#clusters) {
				clu.applyToVariable();
			}
		}
	}

	#shuffle(is: number[]): number[] {
		for (let i: number = is.length; i > 1; --i) {
			const j   : number = nextInt(i);
			const temp: number = is[i - 1];
			is[i - 1] = is[j];
			is[j]     = temp;
		}
		return is;
	}

}

class Cluster {

	#x         : Variable;  // For avoiding a bug(?) of parcel.
	#index     : number   = 0;
	#maxNeurons: number[] = [];
	_neurons   : Neuron[] = [];

	constructor(x: Variable) {
		this.#x = x;

		for (const v of x.domain()) {
			this._neurons.push(new Neuron(v));
		}
		this.#setActivity(nextInt(this._neurons.length));
	}

	#setActivity(index: number): void {
		for (const n of this._neurons) {
			n._isActive = false;
		}
		this._neurons[index]._isActive = true;
		this.#index = index;
	}

	applyToVariable(): void {
		this.#x.assign(this._neurons[this.#index]._value);
	}

	// Turn on the node with the largest input.
	setActivityMaximumInput(): boolean {
		this.#maxNeurons.length = 0;

		let max: number = Number.NEGATIVE_INFINITY;
		let alreadyOn: boolean = false;

		for (let i: number = 0; i < this._neurons.length; ++i) {
			const input: number = this._neurons[i].getInput();

			if (max <= input) {
				if (max < input) {
					max = input;
					this.#maxNeurons.length = 0;
					alreadyOn = false;
				}
				this.#maxNeurons.push(i);
				if (this.#index === i) {
					alreadyOn = true;
				}
			}
		}
		if (alreadyOn || this.#maxNeurons.length === 0) {
			return false;
		}
		this.#setActivity(this.#maxNeurons[nextInt(this.#maxNeurons.length)]);
		return true;
	}

	[Symbol.iterator](): Iterator<Neuron> {
		return this._neurons[Symbol.iterator]();
	}

}

class Connection {

	#c     : Constraint;
	#first : Neuron;
	#second: Neuron | null;
	_weight: number;  // Direct reference (read) allowed.

	// Order of neurons must be the same as the order of variables that the constraint has.
	constructor(c: Constraint, first: Neuron, second: Neuron | null = null) {
		this.#c      = c;
		this.#first  = first;
		this.#second = second;
		this._weight = c.degree() - 1;

		this.#first.addConnection(this);
		if (this.#second) {
			this.#second.addConnection(this);
		}
	}

	getNeuron(self: Neuron): Neuron | null {
		if (self === this.#first) return this.#second;
		if (self === this.#second) return this.#first;
		return null;
	}

	refreshWeight(): void {
		if (!this.#first._isActive || (this.#second !== null && !this.#second._isActive)) {
			return;
		}
		if (this.#c.size() === 1) {
			this._weight += (this.#c.relation().degree(this.#first._value) - 1);
		} else {
			this._weight += (this.#c.relation().degree(this.#first._value, (this.#second as Neuron)._value) - 1);
		}
	}

}

class Neuron {

	#connections: Connection[] = [];
	#conTemp    : Connection[] | null = [];

	_value   : number;  // Direct reference (read) allowed.
	_isActive: boolean = false;  // Direct reference (read, write) allowed.

	constructor(value: number) {
		this._value = value;
	}

	addConnection(c: Connection): void {
		(this.#conTemp as Connection[]).push(c);
	}

	lockConnections(): void {
		this.#connections = [...this.#conTemp as Connection[]];
		this.#conTemp     = null;  // No longer being used.
	}

	getInput(): number {
		let ret: number = 0;

		for (const c of this.#connections) {
			const n: Neuron | null = c.getNeuron(this);  // If n is null, then the unary constraint.
			ret += c._weight * ((n === null || n._isActive) ? 1 : 0);
		}
		return ret;
	}

}

function nextInt(max: number): number {
	return Math.floor(Math.random() * Math.floor(max));
}
