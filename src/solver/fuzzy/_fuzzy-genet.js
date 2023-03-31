/**
 * This class implements fuzzy GENET.
 * CSPs and FCSPs (but only Binary (F)CSPs) is supported.
 *
 * @author Takuto Yanagida
 * @version 2023-03-31
 */

class FuzzyGENET extends Solver {

	static nextInt(max) {
		return Math.floor(Math.random() * Math.floor(max));
	}

	#clusters = [];
	#connections;

	constructor(p, worstSatisfactionDegree = 1) {
		super(p);
		if (!this.#createNetwork(worstSatisfactionDegree)) {
			throw new Exception();
		}
	}

	name() {
		return 'Fuzzy GENET';
	}

	#createNetwork(worstDeg) {
		if (this._debug) console.log('network creation start');
		const cons = [];

		for (const v of this._pro.variables()) {
			if (v.domain().size() === 0) return false;
			this.#clusters.push(new FuzzyGENET.Cluster(v));
		}
		for (const c of this._pro.constraints()) {
			if (c.size() === 1) {  // In the case of unary constraints.
				const v  = c.at(0);
				const cl = this.#clusters[c.at(0).index()];

				for (let i = 0; i < cl.size(); ++i) {
					const origVal = v.value();  // Save the value.
					v.assign(cl.get(i)._value);

					if (c.satisfactionDegree() <= worstDeg) {
						cons.push(new FuzzyGENET.Connection(c, cl.get(i)));
					}
					v.assign(origVal);  // Restore the value.
				}
			} else {  // In the case of binary constraints.
				const v1   = c.at(0);
				const v2   = c.at(1);
				const cl_f = this.#clusters[c.at(0).index()];
				const cl_s = this.#clusters[c.at(1).index()];

				for (let i = 0; i < cl_f.size(); ++i) {
					const origVal1 = v1.value();  // Save the value.
					v1.assign(cl_f.get(i)._value);

					for (let j = 0; j < cl_s.size(); ++j) {
						const origVal2 = v2.value();  // Save the value.
						v2.assign(cl_s.get(j)._value);

						if (c.satisfactionDegree() <= worstDeg) {
							cons.push(new FuzzyGENET.Connection(c, cl_f.get(i), cl_s.get(j)));
						}
						v2.assign(origVal2);  // Restore the value.
					}
					v1.assign(origVal1);  // Restore the value.
				}
			}
		}
		for (const cl of this.#clusters) {
			for (const n of cl._neurons) n.lockConnections();
		}
		this.#connections = cons;
		if (this._debug) console.log('network creation complete');
		return true;
	}

	#shuffle(is) {
		for (let i = is.length; i > 1; --i) {
			const j    = GENET.nextInt(i);
			const temp = is[i - 1];
			is[i - 1] = is[j];
			is[j]     = temp;
		}
		return is;
	}

	exec() {
		const endTime = (this._timeLimit === null) ? Number.MAX_VALUE : (Date.now() + this._timeLimit);
		let iterCount = 0;

		const sol   = new AssignmentList();
		const order = [];
		for (let i = 0; i < this.#clusters.length; i++) {
			order.push(i);
		}

		let cur     = this._pro.worstSatisfactionDegree();
		let success = false;

		while (true) {
			if (this._iterLimit && this._iterLimit < iterCount++) {  // Failure if repeated a specified number
				if (this._debug) console.log('stop: number of iterations has reached the limit');
				break;
			}
			if (endTime < Date.now()) {  // Failure if time limit is exceeded
				if (this._debug) console.log('stop: time limit has been reached');
				break;
			}

			let modified = false;
			for (const i of this.#shuffle(order)) {
				if (this.#clusters[i].setActivityMaximumInput()) {
					modified = true;  // Turn on the node with the largest input in each cluster
				}
			}
			if (!modified) {  // When the local minimum solution is reached.
				for (const con of this.#connections) {
					con.refreshWeight();  // Update weights for all connections
				}
				continue;
			} else {
				for (const clu of this.#clusters) {
					clu.applyToVariable();  // Apply to variable
				}
				const d = this._pro.worstSatisfactionDegree();
				if (cur < d) {  // If it's a better assignment than ever, save it.
					cur = d;
					if (this._debug) console.log(`worst satisfaction degree: ${d}`);
					sol.setProblem(this._pro);
					if (this.foundSolution(sol, d)) {  // Call hook
						success = true;
						break;
					}
					if (this._targetDeg === null) {  // Satisfaction degree is not specified.
						success = true;
					} else if (this._targetDeg <= cur) {  // Satisfaction degree is specified.
						if (this._debug) console.log('stop: current degree is above the target');
						success = true;
						break;
					}
				}
			}
		}
		sol.apply();
		return success;
	}

}

{

	class Cluster {

		static nextInt(max) {
			return Math.floor(Math.random() * Math.floor(max));
		}

		#var;
		#index;
		#maxNeurons = [];
		_neurons;

		constructor(v) {
			this.#var = v;

			const d = v.domain();
			this._neurons = [];

			for (let i = 0; i < d.size(); ++i) {
				this._neurons.push(new Neuron(d.at(i)));
			}
			this.#setActivity(Cluster.nextInt(this._neurons.length));
		}

		#setActivity(index) {
			for (const n of this._neurons) {
				n._isActive = false;
			}
			this._neurons[index]._isActive = true;
			this.#index = index;
		}

		applyToVariable() {
			this.#var.assign(this._neurons[this.#index]._value);
		}

		get(index) {
			return this._neurons[index];
		}

		neurons() {
			return this._neurons;
		}

		// Turn on the node with the largest input.
		setActivityMaximumInput() {
			this.#maxNeurons.length = 0;

			let max       = Number.NEGATIVE_INFINITY;
			let alreadyOn = false;

			for (let i = 0; i < this._neurons.length; ++i) {
				const input = this._neurons[i].getInput();

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

		size() {
			return this._neurons.length;
		}

	}
	FuzzyGENET.Cluster = Cluster;

	class Connection {

		#c
		#first;
		#second;
		_weight;  // Direct reference (read) allowed.

		// Order of neurons must be the same as the order of variables that the constraint has.
		constructor(c, first, second = null) {
			this._weight = c.satisfactionDegree() - 1;
			this.#c      = c;

			this.#first = first;
			this.#first.addConnection(this);
			this.#second = second;
			if (this.#second !== null) {
				this.#second.addConnection(this);
			}
		}

		getNeuron(self) {
			if (self === this.#first)  return this.#second;
			if (self === this.#second) return this.#first;
			return null;
		}

		refreshWeight() {
			if (!this.#first._isActive || (this.#second !== null && !this.#second._isActive)) {
				return;
			}
			if (this.#c.size() === 1) {
				this._weight += (this.#c.fuzzyRelation().satisfactionDegree(this.#first._value) - 1);
			} else {
				this._weight += (this.#c.fuzzyRelation().satisfactionDegree(this.#first._value, this.#second._value) - 1);
			}
		}

	}
	FuzzyGENET.Connection = Connection;

	class Neuron {

		#conTemp = [];
		#connections;
		_value;  // Direct reference (read) allowed.
		_isActive = false;  // Direct reference (read, write) allowed.

		constructor(value) {
			this._value = value;
		}

		addConnection(c) {
			this.#conTemp.push(c);
		}

		lockConnections() {
			this.#connections = [...this.#conTemp];
			this.#conTemp     = null;  // No longer being used.
		}

		getInput() {
			let ret = 0;
			for (const c of this.#connections) {
				const n = c.getNeuron(this);  // If n is null, then the unary constraint.
				ret += c._weight * ((n === null || n._isActive) ? 1 : 0);
			}
			return ret;
		}

	}
	FuzzyGENET.Neuron = Neuron;

}
