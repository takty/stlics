/**
 * Sample implementation of a random binary problem.
 *
 * @author Takuto Yanagida
 * @version 2024-10-21
 */

import { Problem } from '../problem/problem';
import { Variable } from '../problem/variable';
import { Constraint } from '../problem/constraint';
import { Domain } from '../problem/domain';
import { FuzzyRelation } from '../problem/relation';
import { Beta } from './beta';
import { Model } from './model';

export class RandomBinary extends Model {

	static nextInt(max: number): number {
		return Math.floor(Math.random() * Math.floor(max));
	}

	#size: number;
	#den: number;
	#t: number;
	#sig: number;

	constructor(varCount: number, density: number, aveTightness: number, domainSize: number | null = null) {
		super();
		this.#size = varCount;
		this.#den = density;
		this.#t = aveTightness;
		this.#sig = domainSize ?? varCount;
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

	isFuzzy(): boolean {
		return true;
	}

	createProblem(p: Problem): Problem {
		const r: number = (this.#den * ((this.#size * this.#size - this.#size) / 2)) | 0;
		const xs: Variable[] = [];
		for (let i: number = 0; i < this.#size; ++i) {
			xs.push(p.createVariable({ domain: p.createDomain({ min: 0, max: this.#sig - 1 }) as Domain, value: 0, name: '' }));
		}
		while (p.constraintSize() < r) {
			const i: number = RandomBinary.nextInt(this.#size);
			const j: number = RandomBinary.nextInt(this.#size);

			if (i !== j) {
			const temp: Constraint[] = p.constraintsBetween(xs[i], xs[j]);
				if (0 === temp.length) {
					p.createConstraint({ relation: new TableRelation(this.#getRelationTable()), variables: [xs[i], xs[j]] });
				}
			}
		}
		return p;
	}

	#getRelationTable(): number[][] {
		const table: number[][] = [];
		for (let i: number = 0; i < this.#sig; ++i) {
			table.push(new Array(this.#sig));
		}
		for (let i: number = 0; i < this.#sig; ++i) {
			for (let j: number = 0; j < this.#sig; ++j) {
				const q: number = (this.#t === 0) ? Number.MAX_VALUE : (1 - this.#t) / this.#t;
				table[i][j] = Beta.random(1, q);
			}
		}
		return table;
	}

}

class TableRelation implements FuzzyRelation {

	#table: number[][];

	constructor(table: number[][]) {
		this.#table = table;
	}

	satisfactionDegree(value1: number, value2: number): number {
		return this.#table[value1][value2];
	}

}
