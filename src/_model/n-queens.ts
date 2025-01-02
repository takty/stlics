/**
 * A sample implementation of the N queens problem.
 *
 * @author Takuto Yanagida
 * @version 2024-12-17
 */

import { Problem } from '../problem/problem';
import { Variable } from '../problem/variable';
import { Domain } from '../problem/domain';
import { CrispRelation } from '../problem/relation';
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
		const xs: Variable[] = [];
		for (let i: number = 0; i < this.#size; ++i) {
			const x: Variable = p.createVariable({
				domain: p.createDomain({ min: 1, max: this.#size }) as Domain,
				value : 1,
				name  : `Queen ${i}`,
			});
			xs.push(x);
		}
		for (let i: number = 0; i < this.#size; ++i) {
			for (let j: number = i + 1; j < this.#size; ++j) {
				p.createConstraint({
					relation : new CrispQueenRelation(i, j),
					variables: [xs[i], xs[j]],
				});
			}
		}
		return p;
	}

	printResult(p: Problem): void {
		for (let y: number = 0; y < this.#size; ++y) {
			let l: string = '';
			if (p.variableAt(y).isEmpty()) {
				for (let x: number = 0; x < this.#size; ++x) {
					l += '- ';
				}
			} else {
				for (let x: number = 0; x < this.#size; ++x) {
					l += (p.variableAt(y).value() - 1 === x) ? 'o ' : '- ';
				}
			}
			this._debugOutput(l);
		}
	}

}

class CrispQueenRelation extends CrispRelation {

	#dist: number;

	constructor(i: number, j: number) {
		super();
		this.#dist = j - i;
	}

	isSatisfied(v1: number, v2: number): -1 | 0 | 1 {
		if ((v1 !== v2) && (v1 !== v2 + this.#dist) && (v1 !== v2 - this.#dist)) return 1;
		return 0;
	}

}
