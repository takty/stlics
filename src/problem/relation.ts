/**
 * Interfaces that represents the relationship between variables.
 *
 * @author Takuto Yanagida
 * @version 2024-10-21
 */

/**
 * An interface that represents the relationship between variables.
 */
export interface Relation {
}

/**
 * The class represents crisp relationships between variables.
 */
export interface CrispRelation extends Relation {

	/**
	 * Gets whether or not the relation is satisfied in this crisp relation.
	 * @param vs Values of each variable
	 * @return Whether or not it is satisfied.
	 */
	isSatisfied(...vs: number[]): -1 | 0 | 1;

}

/**
 * The class represents fuzzy relationships between variables.
 */
export interface FuzzyRelation extends Relation {

	/**
	 * Gets the satisfaction degree in this fuzzy relation.
	 * @param vs Values of each variable
	 * @return A satisfaction degree d (0 <= d <= 1).
	 */
	satisfactionDegree(...vs: number[]): number;

}
