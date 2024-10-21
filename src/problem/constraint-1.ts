/**
 * The class represents an unary constraint.
 * The constructor is not called directly, since it is created by the Problem.
 *
 * @author Takuto Yanagida
 * @version 2024-10-21
 */

import { Constraint } from './constraint';
import { Variable } from './variable';
import { Relation } from './relation';

export class Constraint1 extends Constraint {

	#xs: [Variable] = [] as unknown as [Variable];

	// Called only from Problem.
	constructor(r: Relation, x: Variable) {
		super(r);
		this.#xs = [x];
	}

	/**
	 * {@inheritDoc}
	 */
	size(): number {
		return 1;
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
	has(x: Variable) {
		return x === this.#xs[0];
	}

	/**
	 * {@inheritDoc}
	 */
	indexOf(x: Variable): number {
		return (x === this.#xs[0]) ? 0 : -1;
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
		return this.#xs[0].isEmpty() ? 1 : 0;
	}

	/**
	 * {@inheritDoc}
	 */
	isDefined(): boolean {
		return !this.#xs[0].isEmpty();
	}

	/**
	 * {@inheritDoc}
	 */
	isSatisfied(): -1 | 0 | 1 {
		if (this.#xs[0].isEmpty()) {
			return Constraint.UNDEFINED;
		}
		return this.crispRelation().isSatisfied(this.#xs[0].value()) ? 1 : 0;
	}

	/**
	 * {@inheritDoc}
	 */
	satisfactionDegree(): number {
		if (this.#xs[0].isEmpty()) {
			return Constraint.UNDEFINED;
		}
		return this.fuzzyRelation().satisfactionDegree(this.#xs[0].value());
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

		for (const v of this.#xs[0].domain()) {
			const s: number = this.fuzzyRelation().satisfactionDegree(v);
			if (s > cd) {
				cd = s;
			}
			if (cd === 1) {
				break;
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

		for (const v of this.#xs[0].domain()) {
			const s: number = this.fuzzyRelation().satisfactionDegree(v);
			if (s < cd) {
				cd = s;
			}
			if (cd === 0) {
				break;
			}
		}
		return cd;
	}

}
