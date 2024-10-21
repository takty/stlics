/**
 * The class for models that provides a factory method to generate constraint satisfaction problems.
 *
 * @author Takuto Yanagida
 * @version 2023-04-16
 */

import { Problem } from '../problem/problem';

export abstract class Model {

	_debug: boolean = true;

	#debugOutput: (e: any) => void = (e: any): void => console.log(e);

	/**
	 * Generates a constraint satisfaction problems.
	 * @param p Objects to include the problem to be generated
	 * @return A generated problem.
	 */
	abstract createProblem(p: Problem): Problem;

	/**
	 * Returns whether the generated problem is a fuzzy constraint satisfaction problem, i.e., whether it contains fuzzy constraints.
	 * @return If it is a fuzzy constraint satisfaction problem, true
	 */
	abstract isFuzzy(): boolean;


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
		this._debugOutput = fn;
	}

	_debugOutput(str: any): void {
		if (this._debug) this.#debugOutput(str);
	}

}
