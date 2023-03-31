/**
 * The interface of solvers for finding solutions to constraint satisfaction problems.
 *
 * @author Takuto Yanagida
 * @version 2023-03-25
 */

class Solver {

	_debug = true;

	/**
	 * The crisp/fuzzy constraint satisfaction problem solved by the solver.
	 */
	_pro;

	/**
	 *  Limit number of iterations.
	 */
	_iterLimit = null;

	/**
	 * Time limit.
	 */
	_timeLimit = null;

	/**
	 * Target 'satisfied constraint rate' or 'constraint satisfaction degree'.
	 */
	_targetDeg = 0.8;

	/**
	 * Listeners of this solver.
	 */
	#listener = [];

	/**
	 * Generates a solver given a constraint satisfaction problem.
	 * @param pro A constraint satisfaction problem.
	 */
	constructor(pro) {
		this._pro = pro;
	}

	/**
	 * Returns the name of the solver.
	 * @return The name.
	 */
	name() {
		return '';
	}

	/**
	 * Placeholder for implementing an algorithm.
	 * The solve method calls this method and returns the return value of this method.
	 * @return True if the algorithm succeeds,
	 */
	exec() {
		return false;
	}

	/**
	 * Sets and limits the maximum number of iterations for the solver's behavior.
	 * After the specified number of iterations, the solver stops as a failure. The specific behavior depends on the solver.
	 * @param count Maximum value; null means not set.
	 */
	setIterationLimit(count = null) {
		this._iterLimit = count;
	}

	/**
	 * Sets a time limit on the solver's behavior.
	 * If the specified time is exceeded, the solver stops as a failure. The specific behavior depends on the solver.
	 * @param msec Time limit. null means not set.
	 */
	setTimeLimit(msec = null) {
		this._timeLimit = msec;
	}

	/**
	 * The goal to be achieved, which is the condition for stopping the solver, is set as the constraint satisfaction degree (fuzzy) or the percentage of constraints satisfied (crisp).
	 * The solver stops as success if the specified percentage is reached or exceeded. The specific behavior depends on the solver.
	 * @param rate Degree or rate. null indicates not set.
	 */
	setTargetRate(rate = null) {
		this._targetDeg = rate;
	}

	/**
	 * Computes the solution to a constraint satisfaction problem.
	 * The specific meaning of the return value depends on the implementation of the algorithm.
	 * @return True if the algorithm succeeds
	 */
	solve() {
		return this.exec();
	}

	addListener(l) {
		this.#listener.add(l);
	}

	removeListener(l) {
		this.#listener.splice(this.#listener.indexOf(l), 1);
	}

	foundSolution(solution, worstDegree) {
		let finish = false;

		for (const l of this.#listener) {
			if (l.foundSolution(solution, worstDegree)) {
				finish = true;
			}
		}
		return finish;
	}

}
