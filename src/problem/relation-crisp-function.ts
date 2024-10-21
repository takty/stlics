/**
 * Crisp relations defined by functions.
 *
 * @author Takuto Yanagida
 * @version 2023-04-04
 */

import { CrispRelation } from './relation-crisp';

export class CrispRelationFunction implements CrispRelation {

	#fn: (...vals: number[]) => -1 | 0 | 1;

	constructor(fn: (...vals: number[]) => -1 | 0 | 1) {
		this.#fn = fn;
	}

	/**
	 * Gets whether or not the relation is satisfied in this crisp relation.
	 * @param vals Values of each variable
	 * @return Whether or not it is satisfied.
	 */
	isSatisfied(...vals: number[]): -1 | 0 | 1 {
		return this.#fn(...vals);
	}

}
