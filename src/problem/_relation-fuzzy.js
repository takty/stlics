/**
 * The class represents fuzzy relationships between variables.
 *
 * @author Takuto Yanagida
 * @version 2023-03-25
 */

import { Relation } from './_relation.js';

export class FuzzyRelation extends Relation {

	/**
	 * Gets the satisfaction degree in this fuzzy relation.
	 * @param vals Values of each variable
	 * @return A satisfaction degree d (0 <= d <= 1).
	 */
	satisfactionDegree(...vals) {
		throw new Exception();
	}

	/**
	 * Returns a view as a crisp relation.
	 * @return A crisp relation.
	 */
	asCrispRelation() {
		return new CrispRelationView(this);
	}

}
