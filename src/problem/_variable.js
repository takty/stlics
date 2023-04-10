/**
 * Class that represents a variable.
 *
 * @author Takuto Yanagida
 * @version 2023-04-10
 */

class Variable extends Element {

	static #INVALID = Number.MIN_VALUE;

	#owner;
	#cons = [];
	#dom;
	#val  = Variable.#INVALID;

	// Called only from Problem.
	constructor(owner, d) {
		super();
		this.#owner = owner;
		this.#dom   = d;
	}

	// Called only from Problem.
	connect(c) {
		if (this.isConstrainedBy(c)) {
			throw new IllegalArgumentException();
		}
		this.#cons.push(c);
	}

	// Called only from Problem.
	disconnect(c) {
		if (!this.isConstrainedBy(c)) {
			throw new IllegalArgumentException();
		}
		this.#cons = this.#cons.filter(n => n !== c);
	}

	/**
	 * Assign a value.
	 * @param value Value.
	 */
	assign(value) {
		this.#val = value;  // Do not change val_ except here.
	}

	/**
	 * Sets the state of the variable to unassigned.
	 */
	clear() {
		this.assign(Variable.#INVALID);  // Do not use the invalid value except here and below (isEmpty).
	}

	/**
	 * Returns whether the value is unassigned or not.
	 * @return True if unassigned.
	 */
	isEmpty() {
		return this.value() === Variable.#INVALID;
	}

	/**
	 * Assign the domain.
	 * The variable will be in unassigned state.
	 * @param d Domain to be assigned.
	 */
	setDomain(d) {
		this.#dom = d;
		this.clear();
	}

	/**
	 * Returns the problem that owns this variable.
	 * @return Owner.
	 */
	owner() {
		return this.#owner;
	}

	/**
	 * Returns the number of associated constraints.
	 * @return Number of constraints.
	 */
	size() {
		return this.#cons.length;
	}

	/**
	 * Retrieves the associated constraints by specifying their indices.
	 * @param index Index.
	 * @return A constraint.
	 */
	at(index) {
		return this.#cons[index];
	}

	/**
	 * Returns an array containing all the constraints associated with the variable.
	 * If there are no constraints, returns an empty array.
	 * @return An array of constraints.
	 */
	constraints() {
		return [...this.#cons];
	}

	/**
	 * Returns the domain of the variable.
	 * @return The domain.
	 */
	domain() {
		return this.#dom;
	}

	/**
	 * Returns whether or not the variable is associated with the specified constraint.
	 * @param c A constraint.
	 * @return True if associated.
	 */
	isConstrainedBy(c) {
		return this.#cons.includes(c);
	}

	/**
	 * Returns a string representation.
	 * @return A string representation.
	 */
	toString() {
		return `x${this.index()}${this.name() === '' ? '' : `(${this.name()})`} = ${this.isEmpty() ? '<empty>' : this.value()}`;
	}

	/**
	 * Returns the value of the variable.
	 * @returnThe value of the variable.
	 */
	value() {
		return this.#val;
	}

	/**
	 * Returns the set of variables connected via the associated constraints.
	 * @return An array of variables
	 */
	neighbors() {
		const vs = [];
		for (const c of this.#cons) {
			for(let j = 0, m = c.size(); j < m; j += 1) {
				const v = c.at(j);
				if (v !== this) vs.push(v);
			}
		}
		return vs;
	}

}
