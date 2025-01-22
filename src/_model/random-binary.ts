/**
 * Sample implementation of a random binary problem.
 *
 * @author Takuto Yanagida
 * @version 2025-01-22
 */

import { Problem } from '../problem/problem';
import { Variable } from '../problem/variable';
import { Constraint } from '../problem/constraint';
import { random } from './beta';
import { Model } from './model';

export class RandomBinary extends Model {

	#size: number;
	#den : number;
	#t   : number;
	#sig : number;

	constructor(varCount: number, density: number, aveTightness: number, domainSize: number | null = null) {
		super();
		this.#size = varCount;
		this.#den  = density;
		this.#t    = aveTightness;
		this.#sig  = domainSize ?? varCount;
	}

	getVariableCount(): number {
		return this.#size;
	}

	setVariableCount(count: number): void {
		this.#size = count;
	}

	getDensity(): number {
		return this.#den;
	}

	setDensity(density: number): void {
		this.#den = density;
	}

	getAverageTightness(): number {
		return this.#t;
	}

	setAverageTightness(tightness: number): void {
		this.#t = tightness;
	}

	getDomainSize(): number {
		return this.#sig;
	}

	setDomainSize(size: number): void {
		this.#sig = size;
	}

	createProblem(p: Problem): Problem {
		const r: number = (this.#den * ((this.#size * this.#size - this.#size) / 2)) | 0;
		const xs: Variable[] = [];
		for (let i: number = 0; i < this.#size; ++i) {
			const x: Variable = p.createVariable(p.createDomain(0, this.#sig - 1), 0);
			xs.push(x);
		}
		while (p.constraintSize() < r) {
			const i: number = nextInt(this.#size);
			const j: number = nextInt(this.#size);

			if (i !== j) {
				const temp: Constraint[] = p.constraintsBetween(xs[i], xs[j]);
				if (0 === temp.length) {
					const table: number[][] = this.#getRelationTable();
					p.createConstraint(
						(v0: number, v1: number): number => table[v0][v1],
						[xs[i], xs[j]]
					);
				}
			}
		}
		return p;
	}

	#getRelationTable(): number[][] {
		const tab: number[][] = [];
		for (let i: number = 0; i < this.#sig; ++i) {
			tab.push(new Array(this.#sig));
		}
		for (let i: number = 0; i < this.#sig; ++i) {
			for (let j: number = 0; j < this.#sig; ++j) {
				const q: number = (0 === this.#t) ? Number.MAX_VALUE : (1 - this.#t) / this.#t;
				tab[i][j] = random(1, q);
			}
		}
		return tab;
	}

}

function nextInt(max: number): number {
	return Math.floor(Math.random() * Math.floor(max));
}
