/**
 * Relations.
 *
 * @author Takuto Yanagida
 * @version 2025-01-02
 */

import { CrispRelation, FuzzyRelation } from '../problem/relation';
import { Domain } from '../problem/domain';

/**
 * Crisp relations defined by functions.
 */
export class CrispRelationFunction extends CrispRelation {

	#fn: (...vs: number[]) => -1 | 0 | 1;

	constructor(fn: (...vs: number[]) => -1 | 0 | 1) {
		super();
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
export class FuzzyRelationFunction extends FuzzyRelation {

	#fn: (...vs: number[]) => number;

	constructor(fn: (...vs: number[]) => number) {
		super();
		this.#fn = fn;
	}

	/**
	 * Gets the satisfaction degree in this fuzzy relation.
	 * @param vs Values of each variable
	 * @return A satisfaction degree d (0 <= d <= 1).
	 */
	degree(...vs: number[]): number {
		return this.#fn(...vs);
	}

}


// -----------------------------------------------------------------------------


/**
 * Crisp relations defined by tables.
 */
export class CrispTabledRelation extends CrispRelation {

	#es: (0 | 1)[];
	#ds: Domain[];
	#ms: number[];

	constructor(elms: (0 | 1)[], doms: Domain[]) {
		super();
		this.#es = [...elms];
		this.#ds = [...doms];
		this.#ms = new Array(doms.length);

		let m: number = 1;
		for (let i: number = this.#ms.length - 1; i >= 0; --i) {
			this.#ms[i] = m;
			m *= this.#ds[i].size();
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
export class FuzzyTabledRelation extends FuzzyRelation {

	#es: number[];
	#ds: Domain[];
	#ms: number[];

	constructor(elms: number[], doms: Domain[]) {
		super();
		this.#es = [...elms];
		this.#ds = [...doms];
		this.#ms = new Array(doms.length);

		let m: number = 1;
		for (let i: number = this.#ms.length - 1; i >= 0; --i) {
			this.#ms[i] = m;
			m *= this.#ds[i].size();
		}
	}

	/**
	 * Gets the satisfaction degree in this fuzzy relation.
	 * @param vs Values of each variable
	 * @return A satisfaction degree d (0 <= d <= 1).
	 */
	degree(...vs: number[]): number {
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


export class CrispFuzzyRelation extends CrispRelation {

	#th: number;
	#fr: FuzzyRelation;

	constructor(fr: FuzzyRelation, th: number) {
		super();
		this.#fr = fr;
		this.#th = th;
	}

	/**
	 * Gets whether or not the relation is satisfied in this crisp relation.
	 * @param vs Values of each variable
	 * @return Whether or not it is satisfied.
	 */
	isSatisfied(...vs: number[]): -1 | 0 | 1 {
		const d: number = this.#fr.degree(...vs);
		return (0 < d && d < this.#th) ? 0 : d as -1 | 0 | 1;
	}

}
