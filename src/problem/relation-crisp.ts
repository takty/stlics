/**
 * The class represents crisp relationships between variables.
 *
 * @author Takuto Yanagida
 * @version 2023-03-25
 */

import { Relation } from './relation';

export interface CrispRelation extends Relation {

	/**
	 * Gets whether or not the relation is satisfied in this crisp relation.
	 * @param vals Values of each variable
	 * @return Whether or not it is satisfied.
	 */
	isSatisfied(...vals: number[]): -1 | 0 | 1;

}
