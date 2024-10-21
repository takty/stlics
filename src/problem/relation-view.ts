/**
 * View of relations.
 *
 * @author Takuto Yanagida
 * @version 2023-04-12
 */

import { CrispRelation } from './relation-crisp';
import { FuzzyRelation } from './relation-fuzzy';

export class CrispRelationView implements CrispRelation {

	#that: FuzzyRelation;

	constructor(that: FuzzyRelation) {
		this.#that = that;
	}

	isSatisfied(...vals: number[]): -1|0|1 {
		return this.#that.satisfactionDegree(...vals) === 1 ? 1 : 0;
	}

}

export class FuzzyRelationView implements FuzzyRelation {

	#that: CrispRelation;

	constructor(that: CrispRelation) {
		this.#that = that;
	}

	satisfactionDegree(...vals: number[]): number {
		return this.#that.isSatisfied(...vals) ? 1 : 0;
	}

}
