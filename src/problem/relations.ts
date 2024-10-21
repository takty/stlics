/**
 * Relations.
 *
 * @author Takuto Yanagida
 * @version 2024-10-21
 */

import { CrispRelation, FuzzyRelation } from './relation';
import { Domain } from './domain';

/**
 * Crisp relations defined by functions.
 */
export class CrispRelationFunction implements CrispRelation {

	#fn: (...vs: number[]) => -1 | 0 | 1;

	constructor(fn: (...vs: number[]) => -1 | 0 | 1) {
		this.#fn = fn;
	}

	/**
	 * Gets whether or not the relation is satisfied in this crisp relation.
	 * @param vs Values of each variable
	 * @return Whether or not it is satisfied.
	 */
	isSatisfied(...vs: number[]): -1 | 0 | 1 {
		return this.#fn(...vs);
	}

}

/**
 * Fuzzy relations defined by functions.
 */
export class FuzzyRelationFunction implements FuzzyRelation {

	#fn: (...vs: number[]) => number;

	constructor(fn: (...vs: number[]) => number) {
		this.#fn = fn;
	}

	/**
	 * Gets the satisfaction degree in this fuzzy relation.
	 * @param vs Values of each variable
	 * @return A satisfaction degree d (0 <= d <= 1).
	 */
	satisfactionDegree(...vs: number[]): number {
		return this.#fn(...vs);
	}

}


// -----------------------------------------------------------------------------


/**
 * Crisp relations defined by tables.
 */
export class CrispTabledRelation implements CrispRelation {

	#es: (0 | 1)[];
	#ds: Domain[];
	#ms: number[];

	constructor(elms: (0 | 1)[], doms: Domain[]) {
		this.#es = [...elms];
		this.#ds = [...doms];
		this.#ms = new Array(doms.length);

		let m: number = 1;
		for (let i: number = this.#ms.length - 1; i >= 0; --i) {
			this.#ms[i] = m;
			m *= doms[i].size();
		}
	}

	/**
	 * Gets whether or not the relation is satisfied in this crisp relation.
	 * @param vs Values of each variable
	 * @return Whether or not it is satisfied.
	 */
	isSatisfied(...vs: number[]): -1 | 0 | 1 {
		if (this.#ms.length !== vs.length) {
			throw new RangeError();
		}
		let index: number = 0;
		for (let i: number = 0; i < this.#ms.length; ++i) {
			index += this.#ms[i] * this.#ds[i].indexOf(vs[i]);
		}
		return this.#es[index];
	}

}

/**
 * Fuzzy relations defined by tables.
 */
export class FuzzyTabledRelation implements FuzzyRelation {

	#es: number[];
	#ds: Domain[];
	#ms: number[];

	constructor(elms: number[], doms: Domain[]) {
		this.#es = [...elms];
		this.#ds = [...doms];
		this.#ms = new Array(doms.length);

		let m: number = 1;
		for (let i: number = this.#ms.length - 1; i >= 0; --i) {
			this.#ms[i] = m;
			m *= doms[i].size();
		}
	}

	/**
	 * Gets the satisfaction degree in this fuzzy relation.
	 * @param vs Values of each variable
	 * @return A satisfaction degree d (0 <= d <= 1).
	 */
	satisfactionDegree(...vs: number[]): number {
		if (this.#ms.length !== vs.length) {
			throw new RangeError();
		}
		let index: number = 0;
		for (let i: number = 0; i < this.#ms.length; ++i) {
			index += this.#ms[i] * this.#ds[i].indexOf(vs[i]);
		}
		return this.#es[index];
	}

}


// -----------------------------------------------------------------------------


/**
 * Crisp relation views of fuzzy relations.
 */
export class CrispRelationView implements CrispRelation {

	#that: FuzzyRelation;

	constructor(that: FuzzyRelation) {
		this.#that = that;
	}

	isSatisfied(...vs: number[]): -1 | 0 | 1 {
		return this.#that.satisfactionDegree(...vs) === 1 ? 1 : 0;
	}

}

/**
 * Fuzzy relation views of crisp relations.
 */
export class FuzzyRelationView implements FuzzyRelation {

	#that: CrispRelation;

	constructor(that: CrispRelation) {
		this.#that = that;
	}

	satisfactionDegree(...vs: number[]): number {
		return this.#that.isSatisfied(...vs) ? 1 : 0;
	}

}
