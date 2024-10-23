/**
 * The class for solvers for finding solutions to constraint satisfaction problems.
 *
 * @author Takuto Yanagida
 * @version 2024-10-22
 */

import { Problem } from '../problem/problem';
import { AssignmentList } from '../util/assignment-list';

export class Solver {

	_debug: boolean = true;

	#debugOutput: (e: any) => void = (e: any): void => console.log(e);

	/**
	 * The crisp/fuzzy constraint satisfaction problem solved by the solver.
	 */
	_pro: Problem;

	/**
	 *  Limit number of iterations.
	 */
	_iterLimit: number|null = null;

	/**
	 * Time limit.
	 */
	_timeLimit: number|null = null;

	/**
	 * Target 'satisfied constraint rate' or 'constraint satisfaction degree'.
	 */
	_targetDeg: number|null = 0.8;

	/**
	 * Listeners of this solver.
	 */
	#listener: { foundSolution: ((as: AssignmentList, wd: number) => boolean) }[] = [];

	/**
	 * Generates a solver given a constraint satisfaction problem.
	 * @param pro A constraint satisfaction problem.
	 */
	constructor(pro: Problem) {
		this._pro = pro;
	}

	/**
	 * Returns the name of the solver.
	 * @return The name.
	 */
	name(): string {
		return '';
	}

	/**
	 * Placeholder for implementing an algorithm.
	 * The solve method calls this method and returns the return value of this method.
	 * @return True if the algorithm succeeds,
	 */
	exec(): boolean {
		return false;
	}

	/**
	 * Sets and limits the maximum number of iterations for the solver's behavior.
	 * After the specified number of iterations, the solver stops as a failure. The specific behavior depends on the solver.
	 * @param count Maximum value; null means not set.
	 */
	setIterationLimit(count: number|null = null): void {
		this._iterLimit = count;
	}

	/**
	 * Sets a time limit on the solver's behavior.
	 * If the specified time is exceeded, the solver stops as a failure. The specific behavior depends on the solver.
	 * @param msec Time limit. null means not set.
	 */
	setTimeLimit(msec: number|null = null): void {
		this._timeLimit = msec;
	}

	/**
	 * The goal to be achieved, which is the condition for stopping the solver, is set as the constraint satisfaction degree (fuzzy) or the percentage of constraints satisfied (crisp).
	 * The solver stops as success if the specified percentage is reached or exceeded. The specific behavior depends on the solver.
	 * @param rate Degree or rate. null indicates not set.
	 */
	setTargetRate(rate: number|null = null): void {
		this._targetDeg = rate;
	}

	/**
	 * Computes the solution to a constraint satisfaction problem.
	 * The specific meaning of the return value depends on the implementation of the algorithm.
	 * @return True if the algorithm succeeds
	 */
	solve(): boolean {
		return this.exec();
	}

	addListener(l: { foundSolution: (solution: AssignmentList, worstDegree: number) => boolean; }): void {
		this.#listener.push(l);
	}

	removeListener(l: { foundSolution: (solution: AssignmentList, worstDegree: number) => boolean; }): void {
		this.#listener.splice(this.#listener.indexOf(l), 1);
	}

	foundSolution(solution: AssignmentList, worstDegree: number): boolean {
		let finish: boolean = false;

		for (const l of this.#listener) {
			if (l.foundSolution(solution, worstDegree)) {
				finish = true;
			}
		}
		return finish;
	}


	// -------------------------------------------------------------------------


	/**
	 * Sets whether to output debug strings.
	 * @param boolean flag Do output if true.
	 */
	setDebugMode(flag: boolean): void {
		this._debug = flag;
	}

	/**
	 * Sets a function that used for outputting debug strings.
	 * @param function fn Function called when debug output.
	 */
	setDebugOutput(fn: (e: any) => void): void {
		this.#debugOutput = fn;
	}

	_debugOutput(str: any): void {
		if (this._debug) this.#debugOutput(str);
	}

}
