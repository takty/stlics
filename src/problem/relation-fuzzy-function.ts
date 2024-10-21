/**
 * Fuzzy relations defined by functions.
 *
 * @author Takuto Yanagida
 * @version 2023-04-04
 */

import { FuzzyRelation } from './relation-fuzzy';

export class FuzzyRelationFunction implements FuzzyRelation {

	#fn: (...vals: number[]) => number;

	constructor(fn: (...vals: number[]) => number) {
		this.#fn = fn;
	}

	/**
	 * Gets the satisfaction degree in this fuzzy relation.
	 * @param vals Values of each variable
	 * @return A satisfaction degree d (0 <= d <= 1).
	 */
	satisfactionDegree(...vals: number[]): number {
		return this.#fn(...vals);
	}

}
