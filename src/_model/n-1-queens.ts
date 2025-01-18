/**
 * A sample implementation of the N-1 Queen Problem.
 * The problem is to place N queens on a board of N vertical squares and N-1 horizontal squares in such a way that as few queens as possible are taken from each other.
 * If two queens are in a position to be taken, the farther apart they are, the higher the satisfaction degree.
 *
 * @author Takuto Yanagida
 * @version 2025-01-18
 */

import { Problem } from '../problem/problem';
import { Variable } from '../problem/variable';
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
			const x: Variable = p.createVariable(p.createDomain(1, this.#size - 1), 1, `Queen ${i}`);
			xs.push(x);
		}
		for (let i: number = 0; i < this.#size; ++i) {
			for (let j: number = i + 1; j < this.#size; ++j) {
				p.createConstraint(new FuzzyQueenRelation(i, j, this.#size), [xs[i], xs[j]]);
			}
		}
		return p;
	}

	printResult(p: Problem): void {
		for (let y: number = 0; y < this.#size; ++y) {
			let l: string = '';
			if (p.variableAt(y).isEmpty()) {
				for (let x: number = 0; x < this.#size - 1; ++x) {
					l += '- ';
				}
			} else {
				for (let x: number = 0; x < this.#size - 1; ++x) {
					l += (p.variableAt(y).value() - 1 === x) ? 'o ' : '- ';
				}
			}
			this._debugOutput(l);
		}
	}

}

class FuzzyQueenRelation extends FuzzyRelation {

	#dist: number;
	#size: number;

	constructor(i: number, j: number, size: number) {
		super();
		this.#dist = j - i;
		this.#size = size;
	}

	degree(v1: number, v2: number): number {
		if ((v1 !== v2) && (v1 !== v2 + this.#dist) && (v1 !== v2 - this.#dist)) return 1;
		return (this.#dist - 1) / (this.#size - 1);
	}

}
