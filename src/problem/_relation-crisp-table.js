/**
 * This class represents crisp relationships by table.
 *
 * @author Takuto YANAGIDA
 * @version 2023-03-26
 */

class CrispTabledRelation extends CrispRelation {

	#elms;
	#doms;
	#mul;

	constructor(elms, doms) {
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
	 * Gets whether or not the relation is satisfied in this crisp relation.
	 * @param vals Values of each variable
	 * @return Whether or not it is satisfied.
	 */
	isSatisfied(...vals) {
		if (this.#mul.length !== vals.length) {
			throw new Exception();
		}
		let index = 0;
		for (let i = 0; i < this.#mul.length; ++i) {
			index += this.#mul[i] * this.#doms[i].indexOf(vals[i]);
		}
		return this.#elms[index];
	}

}
