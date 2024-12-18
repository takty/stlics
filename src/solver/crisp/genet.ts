/**
 * This class implements GENET.
 * CSP (but only Binary CSP) is supported.
 * Find the solution to the problem as the maximum CSP.
 *
 * @author Takuto Yanagida
 * @version 2024-12-10
 */

import { AssignmentList } from '../../util/assignment-list';
import { Solver } from '../solver';
import { Problem } from '../../problem/problem';
import { CrispProblem } from '../../problem/problem-crisp';
import { Variable } from '../../problem/variable';

export class GENET extends Solver {

	static nextInt(max: number): number {
		return Math.floor(Math.random() * Math.floor(max));
	}

	#clusters: Cluster[] = [];
	#connections: Connection[] = [];

	/**
	 * Generates a solver given a constraint satisfaction problem.
	 * @param p A crisp problem.
	 */
	constructor(p: CrispProblem) {
		super(p as Problem);
	}

	name(): string {
		return 'GENET';
	}

	#createNetwork(): boolean {
		this.debugOutput('network creation start');
		const cons: Connection[] = [];

		for (const x of this.pro.variables()) {
			if (x.domain().size() === 0) {
				return false;
			}
			this.#clusters.push(new Cluster(x));
		}
		for (const c of this.pro.constraints()) {
			if (c.size() === 1) {  // In the case of unary constraints.
				const x = c.at(0) as Variable;
				const cl: Cluster = this.#clusters[x.index()];

				for (let i: number = 0; i < cl.size(); ++i) {
					const origV: number = x.value();  // Save the value.
					x.assign(cl.get(i)._value);

					if (c.isSatisfied() === 0) {
						cons.push(new Connection(cl.get(i)));
					}
					x.assign(origV);  // Restore the value.
				}
			} else {  // In the case of binary constraints.
				const x1 = c.at(0) as Variable;
				const x2 = c.at(1) as Variable;
				const cl_f: Cluster = this.#clusters[x1.index()];
				const cl_s: Cluster = this.#clusters[x2.index()];

				for (let i: number = 0; i < cl_f.size(); ++i) {
					const origV1: number = x1.value();  // Save the value.
					x1.assign(cl_f.get(i)._value);

					for (let j: number = 0; j < cl_s.size(); ++j) {
						const origV2: number = x2.value();  // Save the value.
						x2.assign(cl_s.get(j)._value);

						if (c.isSatisfied() === 0) {
							cons.push(new Connection(cl_f.get(i), cl_s.get(j)));
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
		this.debugOutput('network creation complete');
		return true;
	}

	#shuffle(is: number[]): number[] {
		for (let i: number = is.length; i > 1; --i) {
			const j: number = GENET.nextInt(i);
			const temp: number = is[i - 1];
			is[i - 1] = is[j];
			is[j] = temp;
		}
		return is;
	}

	exec(): boolean {
		if (!this.#createNetwork()) {
			throw new Error();
		}
		const endTime: number = (this.timeLimit === null) ? Number.MAX_VALUE : (Date.now() + this.timeLimit);
		let iterCount: number = 0;

		const sol = new AssignmentList();
		const order: number[] = [];
		for (let i: number = 0; i < this.#clusters.length; ++i) {
			order.push(i);
		}

		const p = this.pro as CrispProblem;
		let cur: number = p.satisfiedConstraintRate();
		let success: boolean = false;

		while (true) {
			if (this.iterLimit && this.iterLimit < iterCount++) {  // Failure if repeated a specified number
				this.debugOutput('stop: number of iterations has reached the limit');
				break;
			}
			if (endTime < Date.now()) {  // Failure if time limit is exceeded
				this.debugOutput('stop: time limit has been reached');
				break;
			}

			let modified: boolean = false;
			for (const i of this.#shuffle(order)) {
				if (this.#clusters[i].setActivityMaximumInput()) {
					modified = true;  // Turn on the node with the largest input in each cluster
				}
			}
			if (!modified) {  // When the local minimum solution is reached.
				for (const con of this.#connections) {
					con.refreshWeight();  // Update weights for all connections
				}
			} else {
				for (const clu of this.#clusters) {
					clu.applyToVariable();  // Apply to variable
				}
				const rate: number = p.satisfiedConstraintRate();
				if (cur < rate) {  // If it's a better assignment than ever, save it.
					cur = rate;
					this.debugOutput(`satisfied constraint rate: ${rate}`);
					sol.setProblem(this.pro);
					if (this.foundSolution(sol, rate)) {  // Call hook
						success = true;
						break;
					}
					if (this.targetDeg ?? 1 <= cur) {  // Success if violation rate improves from specified
						this.debugOutput('stop: current degree is above the target');
						success = true;
						break;
					}
				}
			}
		}
		sol.apply();  // Despite the failures, the best assignment so far is applied for now.
		return success;
	}

}

class Cluster {

	static nextInt(max: number): number {
		return Math.floor(Math.random() * Math.floor(max));
	}

	#x: Variable;  // For avoiding a bug(?) of parcel.
	#index: number = 0;
	#maxNeurons: number[] = [];
	_neurons: Neuron[] = [];

	constructor(x: Variable) {
		this.#x = x;

		for (const v of x.domain()) {
			this._neurons.push(new Neuron(v));
		}
		this.#setActivity(Cluster.nextInt(this._neurons.length));
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

	get(index: number): Neuron {
		return this._neurons[index];
	}

	neurons(): Neuron[] {
		return this._neurons;
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
		this.#setActivity(this.#maxNeurons[Cluster.nextInt(this.#maxNeurons.length)]);
		return true;
	}

	size(): number {
		return this._neurons.length;
	}

}

class Connection {

	#first: Neuron;
	#second: Neuron | null;
	_weight: number;  // Direct reference (read) allowed.

	// Order of neurons must be the same as the order of variables that the constraint has.
	constructor(first: Neuron, second: Neuron | null = null) {
		this._weight = -1;

		this.#first = first;
		this.#first.addConnection(this);
		this.#second = second;
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
		this._weight += -1;
	}

}

class Neuron {

	#conTemp: Connection[] | null = [];
	#connections: Connection[] = [];

	_value: number;  // Direct reference (read) allowed.
	_isActive: boolean = false;  // Direct reference (read, write) allowed.

	constructor(value: number) {
		this._value = value;
	}

	addConnection(c: Connection): void {
		(this.#conTemp as Connection[]).push(c);
	}

	lockConnections(): void {
		this.#connections = [...this.#conTemp as Connection[]];
		this.#conTemp = null;  // No longer being used.
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
