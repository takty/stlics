/**
 * The class represents multiple variables and their assignments.
 *
 * @author Takuto Yanagida
 * @version 2025-01-24
 */

import { Assignment } from './assignment';
import { Variable } from '../../problem/variable';
import { Problem } from '../../problem/problem';
import { rand } from './random';

export class AssignmentList {

	/**
	 * Creates an assignment list from variables.
	 * @param xs Variables.
	 * @return Assignment list.
	 */
	static fromVariables(xs: Iterable<Variable>): AssignmentList {
		const al = new AssignmentList();
		al.setVariables(xs);
		return al;
	}

	#as: Assignment[] = [];

	constructor() {
	}

	/**
	 * Sets a problem.
	 * @param p Problem.
	 */
	setProblem(p: Problem): void {
		this.#as.length = 0;
		for (const x of p.variables()) {
			this.#as.push(new Assignment(x));
		}
	}

	/**
	 * Sets assignments.
	 * @param al Assignments.
	 */
	setAssignmentList(al: AssignmentList): void {
		this.#as.length = 0;
		for (const a of al) {
			this.#as.push(new Assignment(a));
		}
	}

	/**
	 * Sets variables.
	 * @param xs Variables.
	 */
	setVariables(xs: Iterable<Variable>): void {
		this.#as.length = 0;
		for (const x of xs) {
			this.#as.push(new Assignment(x));
		}
	}

	/**
	 * Adds a variable and its value.
	 * @param x Variable.
	 * @param value Value.
	 */
	addVariable(x: Variable, value: number | null = null): void {
		this.#as.push(new Assignment(x, value));
	}

	/**
	 * Applies all assignments.
	 */
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
		return 0 === this.#as.length;
	}

	/**
	 * Gets the number of assignments.
	 * @return Number of assignments.
	 */
	size(): number {
		return this.#as.length;
	}

	/**
	 * Gets the number of different assignments.
	 * @return Number of different assignments.
	 */
	differenceSize(): number {
		let diff: number = 0;

		for (const a of this.#as) {
			if (a.variable().value() !== a.value()) {
				++diff;
			}
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
		return this.#as[rand(this.#as.length)];
	}

}
