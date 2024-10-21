/**
 * The class represents an binary constraint.
 * The constructor is not called directly, since it is created by the Problem.
 *
 * @author Takuto Yanagida
 * @version 2024-10-21
 */

import { Constraint } from './constraint';
import { Variable } from './variable';
import { Domain } from './domain';
import { Relation } from './relation';

export class Constraint2 extends Constraint {

	#xs: [Variable, Variable] = [] as unknown as [Variable, Variable];

	// Called only from Problem.
	constructor(r: Relation, x1: Variable, x2: Variable) {
		super(r);
		this.#xs = [x1, x2];
	}

	/**
	 * {@inheritDoc}
	 */
	size(): number {
		return 2;
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
		return this.#xs[0] === x || this.#xs[1] === x;
	}

	/**
	 * {@inheritDoc}
	 */
	indexOf(x: Variable): number {
		if (x === this.#xs[0]) return 0;
		if (x === this.#xs[1]) return 1;
		return -1;
	}

	/**
	 * {@inheritDoc}
	 */
	neighbors(): Constraint[] {
		const cs: Constraint[] = [];

		for (const c of this.#xs[0]) {
			if (c !== this) {
				cs.push(c);
			}
		}
		for (const c of this.#xs[1]) {
			if (c !== this) {
				cs.push(c);
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

		if (this.#xs[0].isEmpty()) ++n;
		if (this.#xs[1].isEmpty()) ++n;
		return n;
	}

	/**
	 * {@inheritDoc}
	 */
	isDefined(): boolean {
		return !this.#xs[0].isEmpty() && !this.#xs[1].isEmpty();
	}

	/**
	 * {@inheritDoc}
	 */
	isSatisfied(): -1 | 0 | 1 {
		if (this.#xs[0].isEmpty() || this.#xs[1].isEmpty()) {
			return Constraint.UNDEFINED;
		}
		return this.crispRelation().isSatisfied(this.#xs[0].value(), this.#xs[1].value()) ? 1 : 0;
	}

	/**
	 * {@inheritDoc}
	 */
	satisfactionDegree(): number {
		if (this.#xs[0].isEmpty() || this.#xs[1].isEmpty()) {
			return Constraint.UNDEFINED;
		}
		return this.fuzzyRelation().satisfactionDegree(this.#xs[0].value(), this.#xs[1].value());
	}

	/**
	 * {@inheritDoc}
	 */
	highestConsistencyDegree(): number {
		const sd: number = this.satisfactionDegree();
		if (sd !== Constraint.UNDEFINED) {
			return sd;
		}
		let cd: number = 0;
		const v1: number = this.#xs[0].value();
		const v2: number = this.#xs[1].value();
		const d1: Domain = this.#xs[0].domain();
		const d2: Domain = this.#xs[1].domain();

		if (this.#xs[0].isEmpty() && !this.#xs[1].isEmpty()) {
			for (const v1 of d1) {
				const s: number = this.fuzzyRelation().satisfactionDegree(v1, v2);
				if (s > cd) {
					cd = s;
				}
				if (cd === 1) {
					break;
				}
			}
		} else if (!this.#xs[0].isEmpty() && this.#xs[1].isEmpty()) {
			for (const v2 of d2) {
				const s: number = this.fuzzyRelation().satisfactionDegree(v1, v2);
				if (s > cd) {
					cd = s;
				}
				if (cd === 1) {
					break;
				}
			}
		} else {
			for (const v1 of d1) {
				for (const v2 of d2) {
					const s: number = this.fuzzyRelation().satisfactionDegree(v1, v2);
					if (s > cd) {
						cd = s;
					}
					if (cd === 1) {
						break;
					}
				}
			}
		}
		return cd;
	}

	/**
	 * {@inheritDoc}
	 */
	lowestConsistencyDegree(): number {
		const sd: number = this.satisfactionDegree();
		if (sd !== Constraint.UNDEFINED) {
			return sd;
		}
		let cd: number = 1;
		const v1: number = this.#xs[0].value();
		const v2: number = this.#xs[1].value();
		const d1: Domain = this.#xs[0].domain();
		const d2: Domain = this.#xs[1].domain();

		if (this.#xs[0].isEmpty() && !this.#xs[1].isEmpty()) {
			for (const v1 of d1) {
				const s: number = this.fuzzyRelation().satisfactionDegree(v1, v2);
				if (s < cd) {
					cd = s;
				}
				if (cd === 0) {
					break;
				}
			}
		} else if (!this.#xs[0].isEmpty() && this.#xs[1].isEmpty()) {
			for (const v2 of d2) {
				const s: number = this.fuzzyRelation().satisfactionDegree(v1, v2);
				if (s < cd) {
					cd = s;
				}
				if (cd === 0) {
					break;
				}
			}
		} else {
			for (const v1 of d1) {
				for (const v2 of d2) {
					const s: number = this.fuzzyRelation().satisfactionDegree(v1, v2);
					if (s < cd) {
						cd = s;
					}
					if (cd === 0) {
						break;
					}
				}
			}
		}
		return cd;
	}

}
