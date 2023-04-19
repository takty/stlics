/**
 * A sample implementation of the N-1 Queen Problem.
 * The problem is to place N queens on a board of N vertical squares and N-1 horizontal squares in such a way that as few queens as possible are taken from each other.
 * If two queens are in a position to be taken, the farther apart they are, the higher the satisfaction degree.
 *
 * @author Takuto Yanagida
 * @version 2023-04-16
 */

import { FuzzyRelation } from '../problem/relation-fuzzy.js';
import { Model } from './model.js';

export class N_1_queens extends Model {

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
		return true;
	}

	createProblem(p) {
		const v = [];
		for (let i = 0; i < this.#size; ++i) {
			v.push(p.createVariable({ name:`Queen ${i}`, domain: p.createDomain({ min: 1, max: this.#size - 1 }), value: 1 }));
		}
		for (let i = 0; i < this.#size; ++i) {
			for (let j = i + 1; j < this.#size; ++j) {
				p.createConstraint({ relation: new FuzzyQueenRelation(i, j, this.#size), variables: [v[i], v[j]] });
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
			this._debugOutput(l);
		}
	}

}

class FuzzyQueenRelation extends FuzzyRelation {

	#dist;
	#size;

	constructor(i, j, size) {
		super();
		this.#dist = j - i;
		this.#size = size;
	}

	satisfactionDegree(v1, v2) {
		if ((v1 !== v2) && (v1 !== v2 + this.#dist) && (v1 !== v2 - this.#dist)) return 1;
		return (this.#dist - 1) / (this.#size - 1);
	}

}
