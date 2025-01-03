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
	protected pro!: Problem;

	/**
	 * Monitor for the solver.
	 */
	protected monitor!: Monitor;

	/**
	 * Generates a solver.
	 */
	constructor() {
	}

	/**
	 * Returns the name of the solver.
	 * @return The name.
	 */
	name(): string {
		return '';
	}

	/**
	 * Computes the solution to a CSP.
	 * The specific meaning of the return value depends on the implementation of the algorithm.
	 * @param p A CSP.
	 * @param m Monitor.
	 * @return True if the algorithm succeeds
	 */
	solve(p: Problem, m: Monitor = new Monitor()): boolean {
		this.pro     = p;
		this.monitor = m;

		this.preprocess();
		const ret: boolean = this.exec();
		this.postprocess();
		return ret;
	}

	/**
	 * Placeholder for implementing preprocess.
	 */
	protected preprocess(): void {
	}

	/**
	 * Placeholder for implementing an algorithm.
	 * The solve method calls this method and returns the return value of this method.
	 * @return True if the algorithm succeeds,
	 */
	protected exec(): boolean {
		return false;
	}

	/**
	 * Placeholder for implementing postprocess.
	 */
	protected postprocess(): void {
	}

}
