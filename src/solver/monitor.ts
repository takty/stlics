/**
 * The class for monitoring solvers.
 *
 * @author Takuto Yanagida
 * @version 2024-12-23
 */

import { AssignmentList } from '../util/assignment-list';

export class Monitor {

	/**
	 * Whether the debugging mode is on.
	 */
	#debugMode: boolean = true;

	/**
	 * Output function for debugging.
	 */
	#debugOutput: (e: any) => void = (e: any): void => console.log(e);

	/**
	 * Listener of the solver.
	 */
	#listener: ((as: AssignmentList, wd: number) => boolean) = () => false;

	/**
	 *  Limit number of iterations.
	 */
	#iterLimit: number = Number.MAX_SAFE_INTEGER;

	/**
	 * Time limit.
	 */
	#timeLimit: number | null = null;

	/**
	 * Target 'ratio' or 'degree'.
	 */
	#target: number | null = 0.8;

	/**
	 * Number of times the evaluation value is the same before stopping the solver.
	 */
	#sameEvaluationLimit: number | null = null;

	/**
	 * End time.
	 */
	#endTime: number = 0;

	/**
	 * Number of iterations.
	 */
	#iterCount: number = 0;

	/**
	 * Last evaluation value.
	 */
	#lastEv: number = -1;

	/**
	 * Number of times the evaluation value is the same.
	 */
	#sameEvCount: number = 0;


	// -------------------------------------------------------------------------


	/**
	 * Initializes the monitor.
	 */
	initialize(): void {
		this.#endTime = (null === this.#timeLimit) ? (
			Number.MAX_VALUE
		) : (
			Date.now() + this.#timeLimit
		);
		this.#iterCount = 0;
	}

	/**
	 * Checks the current status of the solver.
	 * @param evaluation Evaluation value.
	 * @returns True if the solver should stop, false if the solver should stop as a failure, and null if the solver should continue.
	 */
	check(evaluation: number | null = null): boolean | null {
		if (null !== evaluation && null !== this.#target && this.#target <= evaluation) {
			this.outputDebugString('Stop: Current evaluation value is above the target');
			return true;
		}
		if (this.#iterLimit < this.#iterCount++) {
			this.outputDebugString('Stop: Number of iterations has reached the limit');
			return false;
		}
		if (this.#endTime < Date.now()) {
			this.outputDebugString('Stop: Time limit has been reached');
			return false;
		}
		if (null !== evaluation && this.#sameEvaluationLimit !== null) {
			if (evaluation !== -1 && this.#lastEv === evaluation) {
				if (this.#sameEvCount++ > this.#sameEvaluationLimit) {
					this.outputDebugString('Stop: Evaluation value has not changed for a certain number of times');
					return false;
				}
			} else {
				this.#lastEv      = evaluation;
				this.#sameEvCount = 0;
			}
		}
		return null;
	}

	/**
	 * Called by the solver when a solution is found.
	 * @param solution Solution.
	 * @param evaluation Evaluation value.
	 * @returns Whether to stop the solver.
	 */
	solutionFound(solution: AssignmentList, evaluation: number): boolean {
		return this.#listener(solution, evaluation);
	}

	/**
	 * Called by the solver to output debug strings.
	 * @param str String to output.
	 */
	outputDebugString(str: any): void {
		if (this.#debugMode) this.#debugOutput(str);
	}

	/**
	 * Called by the solver to check if the debugging mode is on.
	 * @returns Whether the debugging mode is on.
	 */
	isDebugMode(): boolean {
		return this.#debugMode;
	}

	/**
	 * Called by the solver to check if the target is set.
	 * @returns Whether the target is set.
	 */
	isTargetAssigned(): boolean {
		return null !== this.#target;
	}

	/**
	 * Called by the solver to check if the target is set.
	 * @returns Whether the target is set.
	 */
	getTarget(): number | null {
		return this.#target;
	}


	// -------------------------------------------------------------------------


	/**
	 * Sets and limits the maximum number of iterations for the solver's behavior.
	 * After the specified number of iterations, the solver stops as a failure. The specific behavior depends on the solver.
	 * @param count Maximum value; null means not set.
	 */
	setIterationLimit(count: number | null = null): void {
		this.#iterLimit = (null === count) ? Number.MAX_SAFE_INTEGER : count;
	}

	/**
	 * Sets a time limit on the solver's behavior.
	 * If the specified time is exceeded, the solver stops as a failure. The specific behavior depends on the solver.
	 * @param msec Time limit. null means not set.
	 */
	setTimeLimit(msec: number | null = null): void {
		this.#timeLimit = msec;
	}

	/**
	 * The goal to be achieved, which is the condition for stopping the solver, is set as the constraint satisfaction degree (fuzzy) or the percentage of constraints satisfied (crisp).
	 * The solver stops as success if the specified percentage is reached or exceeded. The specific behavior depends on the solver.
	 * @param rate Degree or rate. null indicates not set.
	 */
	setTarget(rate: number | null = null): void {
		this.#target = rate;
	}

	/**
	 * Sets the number of times the evaluation value is the same before stopping the solver.
	 * @param count Count; null means not set.
	 */
	setSameEvaluationLimit(count: number | null = null): void {
		this.#sameEvaluationLimit = count;
	}


	// -------------------------------------------------------------------------


	/**
	 * Sets the listener of the solver.
	 * @param l Listener function.
	 */
	setListener(l: (solution: AssignmentList, worstDegree: number) => boolean): void {
		this.#listener = l;
	}


	// -------------------------------------------------------------------------


	/**
	 * Sets whether to output debug strings.
	 * @param boolean flag Do output if true.
	 */
	setDebugMode(flag: boolean): void {
		this.#debugMode = flag;
	}

	/**
	 * Sets a function that used for outputting debug strings.
	 * @param function fn Function called when debug output.
	 */
	setDebugOutput(fn: (e: any) => void): void {
		this.#debugOutput = fn;
	}

}
