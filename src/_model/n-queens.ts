/**
 * A sample implementation of the N queens problem.
 *
 * @author Takuto Yanagida
 * @version 2023-04-16
 */

import { Problem } from '../problem/problem';
import { Variable } from '../problem/variable';
import { Domain } from '../problem/domain';
import { CrispRelation } from '../problem/relation-crisp';
import { Model } from './model';

export class N_queens extends Model {

	#size: number;

	constructor(queenSize: number) {
		super();
		this.#size = queenSize;
	}

	getQueenSize(): number {
		return this.#size;
	}

	setQueenSize(size: number): void {
		this.#size = size;
	}

	isFuzzy(): boolean {
		return false;
	}

	createProblem(p: Problem): Problem {
		const v: Variable[] = [];
		for (let i = 0; i < this.#size; ++i) {
			v.push(p.createVariable({ name: `Queen ${i}`, domain: p.createDomain({ min: 1, max: this.#size }) as Domain, value: 1 }));
		}
		for (let i = 0; i < this.#size; ++i) {
			for (let j = i + 1; j < this.#size; ++j) {
				p.createConstraint({ relation: new CrispQueenRelation(i, j), variables: [v[i], v[j]] });
			}
		}
		return p;
	}

	printResult(p: Problem) {
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

class CrispQueenRelation implements CrispRelation {

	#dist: number;

	constructor(i: number, j: number) {
		this.#dist = j - i;
	}

	isSatisfied(...vs: number[]): -1|0|1 {
		const [v1, v2]: number[] = vs;
		if ((v1 !== v2) && (v1 !== v2 + this.#dist) && (v1 !== v2 - this.#dist)) return 1;
		return 0;
	}

}
