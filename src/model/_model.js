/**
 * The class for models that provides a factory method to generate constraint satisfaction problems.
 *
 * @author Takuto Yanagida
 * @version 2023-04-16
 */

export class Model {

	_debug = true;

	_debugOutput = e => console.log(e);

	/**
	 * Generates a constraint satisfaction problems.
	 * @param p Objects to include the problem to be generated
	 * @return A generated problem.
	 */
	createProblem(p) {}

	/**
	 * Returns whether the generated problem is a fuzzy constraint satisfaction problem, i.e., whether it contains fuzzy constraints.
	 * @return If it is a fuzzy constraint satisfaction problem, true
	 */
	isFuzzy() {}


	// -------------------------------------------------------------------------


	/**
	 * Sets whether to output debug strings.
	 * @param boolean flag Do output if true.
	 */
	setDebugMode(flag) {
		this._debug = flag;
	}

	/**
	 * Sets a function that used for outputting debug strings.
	 * @param function fn Function called when debug output.
	 */
	setDebugOutput(fn) {
		this._debugOutput = fn;
	}

	_debugOutput(str) {
		if (this._debug) this._debugOutput(str);
	}

}
