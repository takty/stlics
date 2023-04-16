/**
 * Fuzzy relations defined by functions.
 *
 * @author Takuto Yanagida
 * @version 2023-04-04
 */

import { FuzzyRelation } from './_relation-fuzzy.js';

export class FuzzyRelationFunction extends FuzzyRelation {

	#fn;

	constructor(fn) {
		super();
		this.#fn = fn;
	}

	/**
	 * Gets the satisfaction degree in this fuzzy relation.
	 * @param vals Values of each variable
	 * @return A satisfaction degree d (0 <= d <= 1).
	 */
	satisfactionDegree(...vals) {
		return this.#fn(...vals);
	}

}
