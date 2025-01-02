/**
 * Interfaces that represents the relationship between variables.
 *
 * @author Takuto Yanagida
 * @version 2024-12-17
 */

/**
 * An interface that represents the relationship between variables.
 */
export abstract class Relation {

	/**
	 * Gets whether or not the relation is satisfied in this crisp relation.
	 * @param vs Values of each variable
	 * @return Whether or not it is satisfied.
	 */
	abstract isSatisfied(...vs: number[]): -1 | 0 | 1;

	/**
	 * Gets the satisfaction degree in this fuzzy relation.
	 * @param vs Values of each variable
	 * @return A satisfaction degree d (0 <= d <= 1).
	 */
	abstract degree(...vs: number[]): number;

}

/**
 * The class represents crisp relationships between variables.
 */
export abstract class CrispRelation extends Relation {

	/**
	 * {@override}
	 */
	degree(...vs: number[]): number {
		return this.isSatisfied(...vs);
	}

}

/**
 * The class represents fuzzy relationships between variables.
 */
export abstract class FuzzyRelation extends Relation {

	/**
	 * {@override}
	 */
	isSatisfied(...vs: number[]): -1 | 0 | 1 {
		const d: number = this.degree(...vs);
		return (0 < d && d < 1) ? 0 : d as -1 | 0 | 1;
	}

}
