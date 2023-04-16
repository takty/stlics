/**
 * An interface that provides a factory method to generate constraint satisfaction problems.
 *
 * @author Takuto Yanagida
 * @version 2023-03-25
 */

export class ProblemFactory {

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

}
