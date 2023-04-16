/**
 * A sample implementation of the N queens problem.
 *
 * @author Takuto Yanagida
 * @version 2023-03-31
 */

import { ProblemFactory } from '../util/_problem-factory.js';
import { CrispRelation } from '../problem/_relation-crisp.js';

export class N_queens extends ProblemFactory {

	#size;

	constructor(queenSize) {
		super();
		this.#size = queenSize;
	}

	getQueenSize() {
		return this.#size;
	}

	setQueenSize(size) {
		this.#size = size;
	}

	isFuzzy() {
		return false;
	}

	createProblem(p) {
		const v = [];
		for (let i = 0; i < this.#size; ++i) {
			v.push(p.createVariable({ name: `Queen ${i}`, domain: p.createDomain({ min: 1, max: this.#size }), value: 1 }));
		}
		for (let i = 0; i < this.#size; ++i) {
			for (let j = i + 1; j < this.#size; ++j) {
				p.createConstraint({ relation: new CrispQueenRelation(i, j), variables: [v[i], v[j]] });
			}
		}
		return p;
	}

	printResult(p) {
		for (let y = 0; y < this.#size; ++y) {
			let l = '';
			if (p.variableAt(y).isEmpty()) {
				for (let x = 0; x < this.#size; ++x) {
					l += '- ';
				}
			} else {
				for (let x = 0; x < this.#size; ++x) {
					if (p.variableAt(y).value() - 1 === x) {
						l += 'o ';
					} else {
						l += '- ';
					}
				}
			}
			console.log(l);
		}
	}

}

class CrispQueenRelation extends CrispRelation {

	#dist;

	constructor(i, j) {
		super();
		this.#dist = j - i;
	}

	isSatisfied(...vs) {
		const [v1, v2] = vs;
		if ((v1 !== v2) && (v1 !== v2 + this.#dist) && (v1 !== v2 - this.#dist)) return true;
		return false;
	}

}
