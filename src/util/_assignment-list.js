/**
 * The class represents multiple variables and their assignments.
 *
 * @author Takuto Yanagida
 * @version 2023-04-16
 */

import { Assignment } from './_assignment.js';

export class AssignmentList {

	static fromVariables(vs) {
		const al = new AssignmentList();
		al.setVariables(vs);
		return al;
	}

	#as = [];

	constructor() {
	}

	setProblem(problem) {
		this.#as.length = 0;
		for (const v of problem.variables()) {
			this.#as.push(new Assignment({ variable: v, value: v.value() }));
		}
	}

	setAssignmentList(al) {
		this.#as.length = 0;
		for (const a of al) {
			this.#as.push(new Assignment({ variable: a.variable(), value: a.value() }));
		}
	}

	setVariables(vs) {
		this.#as.length = 0;
		for (const v of vs) {
			this.#as.push(new Assignment({ variable: v, value: v.value() }));
		}
	}

	addVariable(variable, value = null) {
		this.#as.push(new Assignment({ variable, value }));
	}

	apply() {
		for (const a of this.#as) a.apply();
	}

	/**
	 * Remove all assignments.
	 */
	clear() {
		this.#as.length = 0;
	}

	/**
	 * Checks whether the list is empty or not.
	 * @return True if empty.
	 */
	isEmpty() {
		return this.#as.length === 0;
	}

	/**
	 * Gets the number of assignments.
	 * @return Number of assignments.
	 */
	size() {
		return this.#as.length;
	}

	differenceSize() {
		let diff = 0;
		for (const a of this.#as) {
			if (a.variable().value() !== a.value()) ++diff;
		}
		return diff;
	}

	/**
	 * Gets the assignments by specifying their indices.
	 * @param index Index.
	 * @return An assignment.
	 */
	at(index) {
		return this.#as[index];
	}

	/**
	 * Gets the iterator of the assignments.
	 */
	[Symbol.iterator]() {
		return this.#as[Symbol.iterator]();
	}

	/**
	 * Gets an arbitrary assignment.
	 *
	 * @return An assignment.
	 */
	random() {
		return this.#as[Math.floor(Math.random() * this.#as.length)];
	}

}
