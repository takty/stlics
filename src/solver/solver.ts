/**
 * The class for solvers for finding solutions to CSPs.
 *
 * @author Takuto Yanagida
 * @version 2025-01-03
 */

import { Problem } from '../problem/problem';
import { Monitor } from './monitor';

export class Solver {

	/**
	 * The crisp/fuzzy CSP solved by the solver.
	 */
	protected pro: Problem;

	/**
	 * Monitor for the solver.
	 */
	protected monitor: Monitor = new Monitor();

	/**
	 * Generates a solver given a CSP.
	 * @param pro A CSP.
	 */
	constructor(pro: Problem) {
		this.pro = pro;
	}

	/**
	 * Sets a monitor for the solver.
	 * @param m Monitor.
	 */
	setMonitor(m: Monitor): void {
		this.monitor = m;
	}

	/**
	 * Returns the monitor for the solver.
	 * @return Monitor.
	 */
	getMonitor(): Monitor {
		return this.monitor;
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
	 * Computes the solution to a CSP.
	 * The specific meaning of the return value depends on the implementation of the algorithm.
	 * @return True if the algorithm succeeds
	 */
	solve(): boolean {
		return this.exec();
	}

}
