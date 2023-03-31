/**
 * View of relations.
 *
 * @author Takuto Yanagida
 * @version 2023-03-25
 */

class CrispRelationView extends CrispRelation {

	constructor(that) {
		this.that = that;
	}

	isSatisfied(...vals) {
		return this.that.satisfactionDegree(vals) === 1;
	}

}

class FuzzyRelationView extends FuzzyRelation {

	constructor(that) {
		this.that = that;
	}

	satisfactionDegree(...vals) {
		return this.that.isSatisfied(vals) ? 1 : 0;
	}

}
