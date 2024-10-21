/**
 * A sample implementation of the N-1 Queen Problem.
 * The problem is to place N queens on a board of N vertical squares and N-1 horizontal squares in such a way that as few queens as possible are taken from each other.
 * If two queens are in a position to be taken, the farther apart they are, the higher the satisfaction degree.
 *
 * @author Takuto Yanagida
 * @version 2024-10-21
 */

import { Problem } from '../problem/problem';
import { Variable } from '../problem/variable';
import { Domain } from '../problem/domain';
import { FuzzyRelation } from '../problem/relation';
import { Model } from './model';

export class N_1_queens extends Model {

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
		return true;
	}

	createProblem(p: Problem): Problem {
		const xs: Variable[] = [];
		for (let i: number = 0; i < this.#size; ++i) {
			xs.push(p.createVariable({ name: `Queen ${i}`, domain: p.createDomain({ min: 1, max: this.#size - 1 }) as Domain, value: 1 }));
		}
		for (let i: number = 0; i < this.#size; ++i) {
			for (let j: number = i + 1; j < this.#size; ++j) {
				p.createConstraint({ relation: new FuzzyQueenRelation(i, j, this.#size), variables: [xs[i], xs[j]] });
			}
		}
		return p;
	}

	printResult(p: Problem) {
		for (let y: number = 0; y < this.#size; ++y) {
			let l: string = '';
			if (p.variableAt(y).isEmpty()) {
				for (let x: number = 0; x < this.#size; ++x) {
					l += '- ';
				}
			} else {
				for (let x: number = 0; x < this.#size; ++x) {
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

class FuzzyQueenRelation implements FuzzyRelation {

	#dist: number;
	#size: number;

	constructor(i: number, j: number, size: number) {
		this.#dist = j - i;
		this.#size = size;
	}

	satisfactionDegree(v1: number, v2: number): number {
		if ((v1 !== v2) && (v1 !== v2 + this.#dist) && (v1 !== v2 - this.#dist)) return 1;
		return (this.#dist - 1) / (this.#size - 1);
	}

}
