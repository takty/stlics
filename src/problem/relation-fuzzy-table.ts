/**
 * This class represents fuzzy relationships by table.
 *
 * @author Takuto YANAGIDA
 * @version 2023-03-26
 */

import { FuzzyRelation } from './relation-fuzzy';
import { Domain } from './domain';

export class FuzzyTabledRelation implements FuzzyRelation {

	#elms: number[];
	#doms: Domain[];
	#mul: number[];

	constructor(elms: number[], doms: Domain[]) {
		this.#elms = [...elms];
		this.#doms = [...doms];
		this.#mul  = new Array(doms.length);

		let m = 1;
		for (let i = this.#mul.length - 1; i >= 0; --i) {
			this.#mul[i] = m;
			m *= doms[i].size();
		}
	}

	/**
	 * Gets the satisfaction degree in this fuzzy relation.
	 * @param vals Values of each variable
	 * @return A satisfaction degree d (0 <= d <= 1).
	 */
	satisfactionDegree(...vals: number[]): number {
		if (this.#mul.length !== vals.length) {
			throw new RangeError();
		}
		let index = 0;
		for (let i = 0; i < this.#mul.length; ++i) {
			index += this.#mul[i] * this.#doms[i].indexOf(vals[i]);
		}
		return this.#elms[index];
	}

}
