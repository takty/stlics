/**
 * The class represents multiple variables and their assignments.
 *
 * @author Takuto Yanagida
 * @version 2023-04-16
 */

import { Assignment } from './assignment';
import { Variable } from '../problem/variable';
import { Problem } from '../problem/problem';

export class AssignmentList {

	static fromVariables(vs: Iterable<Variable>): AssignmentList {
		const al = new AssignmentList();
		al.setVariables(vs);
		return al;
	}

	#as: Assignment[] = [];

	constructor() {
	}

	setProblem(problem: Problem): void {
		this.#as.length = 0;
		for (const v of problem.variables()) {
			this.#as.push(new Assignment({ variable: v, value: v.value() }));
		}
	}

	setAssignmentList(al: AssignmentList): void {
		this.#as.length = 0;
		for (const a of al) {
			this.#as.push(new Assignment({ variable: a.variable(), value: a.value() }));
		}
	}

	setVariables(vs: Iterable<Variable>): void {
		this.#as.length = 0;
		for (const v of vs) {
			this.#as.push(new Assignment({ variable: v, value: v.value() }));
		}
	}

	addVariable(variable: Variable, value: number|null = null): void {
		this.#as.push(new Assignment({ variable, value }));
	}

	apply(): void {
		for (const a of this.#as) a.apply();
	}

	/**
	 * Remove all assignments.
	 */
	clear(): void {
		this.#as.length = 0;
	}

	/**
	 * Checks whether the list is empty or not.
	 * @return True if empty.
	 */
	isEmpty(): boolean {
		return this.#as.length === 0;
	}

	/**
	 * Gets the number of assignments.
	 * @return Number of assignments.
	 */
	size(): number {
		return this.#as.length;
	}

	differenceSize(): number {
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
	at(index: number): Assignment {
		return this.#as[index];
	}

	/**
	 * Gets the iterator of the assignments.
	 */
	[Symbol.iterator](): Iterator<Assignment> {
		return this.#as[Symbol.iterator]();
	}

	/**
	 * Gets an arbitrary assignment.
	 *
	 * @return An assignment.
	 */
	random(): Assignment {
		return this.#as[Math.floor(Math.random() * this.#as.length)];
	}

}
