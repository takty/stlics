/**
 * View of relations.
 *
 * @author Takuto Yanagida
 * @version 2023-04-12
 */

import { CrispRelation } from './_relation-crisp.js';
import { FuzzyRelation } from './_relation-fuzzy.js';

export class CrispRelationView extends CrispRelation {

	constructor(that) {
		this.that = that;
	}

	isSatisfied(...vals) {
		return this.that.satisfactionDegree(vals) === 1;
	}

}

export class FuzzyRelationView extends FuzzyRelation {

	constructor(that) {
		this.that = that;
	}

	satisfactionDegree(...vals) {
		return this.that.isSatisfied(vals) ? 1 : 0;
	}

}
