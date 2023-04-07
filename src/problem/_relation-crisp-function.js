/**
 * Crisp relations defined by functions.
 *
 * @author Takuto Yanagida
 * @version 2023-04-04
 */

class CrispRelationFunction extends CrispRelation {

	#fn;

	constructor(fn) {
		super();
		this.#fn = fn;
	}

	/**
	 * Gets whether or not the relation is satisfied in this crisp relation.
	 * @param vals Values of each variable
	 * @return Whether or not it is satisfied.
	 */
	isSatisfied(...vals) {
		return this.#fn(...vals);
	}

}
