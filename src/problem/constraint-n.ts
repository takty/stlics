/**
 * The class represents an n-ary constraint.
 * The constructor is not called directly, since it is created by the Problem.
 *
 * @author Takuto Yanagida
 * @version 2024-10-21
 */

import { Constraint } from './constraint';
import { Variable } from './variable';
import { Domain } from './domain';
import { Relation } from './relation';

export class ConstraintN extends Constraint {

	#xs: Variable[];
	#vs: number[];  // For reuse.

	// Called only from Problem.
	constructor(r: Relation, ...xs: Variable[]) {
		super(r);
		this.#xs = [...xs];
		this.#vs = new Array(this.#xs.length);
	}

	/**
	 * {@inheritDoc}
	 */
	size(): number {
		return this.#xs.length;
	}

	/**
	 * {@inheritDoc}
	 */
	at(index: number): Variable | undefined {
		return this.#xs.at(index);
	}

	/**
	 * {@inheritDoc}
	 */
	has(x: Variable): boolean {
		return this.#xs.includes(x);
	}

	/**
	 * {@inheritDoc}
	 */
	indexOf(x: Variable): number {
		return this.#xs.indexOf(x);
	}

	/**
	 * {@inheritDoc}
	 */
	neighbors(): Constraint[] {
		const cs: Constraint[] = [];

		for (const x of this.#xs) {
			for (const c of x) {
				if (c !== this) {
					cs.push(c);
				}
			}
		}
		return cs;
	}

	/**
	 * {@inheritDoc}
	 */
	[Symbol.iterator](): Iterator<Variable> {
		return this.#xs[Symbol.iterator]();
	}


	// -------------------------------------------------------------------------


	/**
	 * {@inheritDoc}
	 */
	emptyVariableSize(): number {
		let n: number = 0;

		for (const x of this.#xs) {
			if (x.isEmpty()) {
				++n;
			}
		}
		return n;
	}

	/**
	 * {@inheritDoc}
	 */
	isDefined(): boolean {
		for (const x of this.#xs) {
			if (x.isEmpty()) {
				return false;
			}
		}
		return true;
	}

	/**
	 * {@inheritDoc}
	 */
	isSatisfied(): -1 | 0 | 1 {
		for (let i: number = 0; i < this.#xs.length; ++i) {
			const x: Variable = this.#xs[i];
			if (x.isEmpty()) {
				return -1;
			}
			this.#vs[i] = x.value();
		}
		return this.crispRelation().isSatisfied(...this.#vs) ? 1 : 0;
	}

	/**
	 * {@inheritDoc}
	 */
	satisfactionDegree(): number {
		for (let i: number = 0; i < this.#xs.length; ++i) {
			const x: Variable = this.#xs[i];
			if (x.isEmpty()) {
				return Constraint.UNDEFINED;
			}
			this.#vs[i] = x.value();
		}
		return this.fuzzyRelation().satisfactionDegree(...this.#vs);
	}

	/**
	 * {@inheritDoc}
	 */
	highestConsistencyDegree(): number {
		const sd: number = this.satisfactionDegree();
		if (sd !== Constraint.UNDEFINED) {
			return sd;
		}
		const emptyIndices = new Array(this.emptyVariableSize());
		let c: number = 0;

		for (let i: number = 0; i < this.#xs.length; ++i) {
			const x: Variable = this.#xs[i];
			if (x.isEmpty()) {
				emptyIndices[c++] = i;
			} else {
				this.#vs[i] = x.value();
			}
		}
		return this.checkHCD(emptyIndices, 0, 0);
	}

	/**
	 * {@inheritDoc}
	 */
	lowestConsistencyDegree(): number {
		const sd: number = this.satisfactionDegree();
		if (sd !== Constraint.UNDEFINED) {
			return sd;
		}
		const emptyIndices = new Array(this.emptyVariableSize());
		let c: number = 0;

		for (let i: number = 0; i < this.#xs.length; ++i) {
			const x: Variable = this.#xs[i];
			if (x.isEmpty()) {
				emptyIndices[c++] = i;
			} else {
				this.#vs[i] = x.value();
			}
		}
		return this.checkLCD(emptyIndices, 0, 1);
	}

	checkHCD(emptyIndices: number[], currentStep: number, cd: number): number {
		const index: number = emptyIndices[currentStep];
		const d: Domain = this.#xs[index].domain();

		if (currentStep === emptyIndices.length - 1) {
			for (const v of d) {
				this.#vs[index] = v;
				const s: number = this.fuzzyRelation().satisfactionDegree(...this.#vs);
				if (s > cd) {
					cd = s;
				}
				if (cd === 1) {
					break;
				}
			}
		} else {
			for (const v of d) {
				this.#vs[index] = v;
				cd = this.checkLCD(emptyIndices, currentStep + 1, cd);
			}
		}
		return cd;
	}

	checkLCD(emptyIndices: number[], currentStep: number, cd: number): number {
		const index: number = emptyIndices[currentStep];
		const d: Domain = this.#xs[index].domain();

		if (currentStep === emptyIndices.length - 1) {
			for (const v of d) {
				this.#vs[index] = v;
				const s: number = this.fuzzyRelation().satisfactionDegree(...this.#vs);
				if (s < cd) {
					cd = s;
				}
				if (cd === 0) {
					break;
				}
			}
		} else {
			for (const v of d) {
				this.#vs[index] = v;
				cd = this.checkLCD(emptyIndices, currentStep + 1, cd);
			}
		}
		return cd;
	}

}
