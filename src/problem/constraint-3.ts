/**
 * The class represents an 3-ary constraint.
 * The constructor is not called directly, since it is created by the Problem.
 *
 * @author Takuto Yanagida
 * @version 2024-12-17
 */

import { Constraint } from './constraint';
import { Relation } from './relation';
import { Variable } from './variable';
import { Domain } from './domain';

export class Constraint3 extends Constraint {

	#xs: [Variable, Variable, Variable] = [] as unknown as [Variable, Variable, Variable];

	// Called only from Problem.
	constructor(r: Relation, x1: Variable, x2: Variable, x3: Variable) {
		super(r);
		this.#xs = [x1, x2, x3];
	}

	/**
	 * {@override}
	 */
	size(): number {
		return 3;
	}

	/**
	 * {@override}
	 */
	at(index: number): Variable | undefined {
		return this.#xs.at(index);
	}

	/**
	 * {@override}
	 */
	has(x: Variable): boolean {
		return this.#xs[0] === x || this.#xs[1] === x || this.#xs[2] === x;
	}

	/**
	 * {@override}
	 */
	indexOf(x: Variable): number {
		if (x === this.#xs[0]) return 0;
		if (x === this.#xs[1]) return 1;
		if (x === this.#xs[2]) return 2;
		return -1;
	}

	/**
	 * {@override}
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
	 * {@override}
	 */
	[Symbol.iterator](): Iterator<Variable> {
		return this.#xs[Symbol.iterator]();
	}


	// -------------------------------------------------------------------------


	/**
	 * {@override}
	 */
	emptyVariableSize(): number {
		let n: number = 0;

		if (this.#xs[0].isEmpty()) ++n;
		if (this.#xs[1].isEmpty()) ++n;
		if (this.#xs[2].isEmpty()) ++n;
		return n;
	}

	/**
	 * {@override}
	 */
	isDefined(): boolean {
		return !this.#xs[0].isEmpty() && !this.#xs[1].isEmpty() && !this.#xs[2].isEmpty();
	}

	/**
	 * {@override}
	 */
	isSatisfied(): -1 | 0 | 1 {
		if (this.#xs[0].isEmpty() || this.#xs[1].isEmpty() || this.#xs[2].isEmpty()) {
			return Constraint.UNDEFINED;
		}
		return this.rel.isSatisfied(this.#xs[0].value(), this.#xs[1].value(), this.#xs[2].value()) ? 1 : 0;
	}

	/**
	 * {@override}
	 */
	degree(): number {
		if (this.#xs[0].isEmpty() || this.#xs[1].isEmpty() || this.#xs[2].isEmpty()) {
			return Constraint.UNDEFINED;
		}
		return this.rel.degree(this.#xs[0].value(), this.#xs[1].value(), this.#xs[2].value());
	}

	/**
	 * {@override}
	 */
	highestConsistencyDegree(): number {
		const d: number = this.degree();
		if (d !== Constraint.UNDEFINED) {
			return d;
		}
		let cd: number = 0;
		const fn = (v1: number, v2: number, v3: number): boolean => {
			const d: number = this.rel.degree(v1, v2, v3);
			if (d > cd) {
				cd = d;
			}
			return (cd === 1);
		}
		const v1: number = this.#xs[0].value();
		const v2: number = this.#xs[1].value();
		const v3: number = this.#xs[2].value();
		const d1: Domain = this.#xs[0].domain();
		const d2: Domain = this.#xs[1].domain();
		const d3: Domain = this.#xs[2].domain();

		if (this.#xs[0].isEmpty() && !this.#xs[1].isEmpty() && !this.#xs[2].isEmpty()) {
			for (const v1 of d1) {
				if (fn(v1, v2, v3)) break;
			}
		} else if (!this.#xs[0].isEmpty() && this.#xs[1].isEmpty() && !this.#xs[2].isEmpty()) {
			for (const v2 of d2) {
				if (fn(v1, v2, v3)) break;
			}
		} else if (!this.#xs[0].isEmpty() && !this.#xs[1].isEmpty() && this.#xs[2].isEmpty()) {
			for (const v3 of d3) {
				if (fn(v1, v2, v3)) break;
			}
		} else if (this.#xs[0].isEmpty() && this.#xs[1].isEmpty() && !this.#xs[2].isEmpty()) {
			for (const v1 of d1) {
				for (const v2 of d2) {
					if (fn(v1, v2, v3)) break;
				}
			}
		} else if (this.#xs[0].isEmpty() && !this.#xs[1].isEmpty() && this.#xs[2].isEmpty()) {
			for (const v1 of d1) {
				for (const v3 of d3) {
					if (fn(v1, v2, v3)) break;
				}
			}
		} else if (!this.#xs[0].isEmpty() && this.#xs[1].isEmpty() && this.#xs[2].isEmpty()) {
			for (const v2 of d2) {
				for (const v3 of d3) {
					if (fn(v1, v2, v3)) break;
				}
			}
		} else {
			for (const v1 of d1) {
				for (const v2 of d2) {
					for (const v3 of d3) {
						if (fn(v1, v2, v3)) break;
					}
				}
			}
		}
		return cd;
	}

	/**
	 * {@override}
	 */
	lowestConsistencyDegree(): number {
		const d: number = this.degree();
		if (d !== Constraint.UNDEFINED) {
			return d;
		}
		let cd: number = 1;
		const fn = (v1: number, v2: number, v3: number): boolean => {
			const d: number = this.rel.degree(v1, v2, v3);
			if (d < cd) {
				cd = d;
			}
			return (cd === 0);
		}
		const v1: number = this.#xs[0].value();
		const v2: number = this.#xs[1].value();
		const v3: number = this.#xs[2].value();
		const d1: Domain = this.#xs[0].domain();
		const d2: Domain = this.#xs[1].domain();
		const d3: Domain = this.#xs[2].domain();

		if (this.#xs[0].isEmpty() && !this.#xs[1].isEmpty() && !this.#xs[2].isEmpty()) {
			for (const v1 of d1) {
				if (fn(v1, v2, v3)) break;
			}
		} else if (!this.#xs[0].isEmpty() && this.#xs[1].isEmpty() && !this.#xs[2].isEmpty()) {
			for (const v2 of d2) {
				if (fn(v1, v2, v3)) break;
			}
		} else if (!this.#xs[0].isEmpty() && !this.#xs[1].isEmpty() && this.#xs[2].isEmpty()) {
			for (const v3 of d3) {
				if (fn(v1, v2, v3)) break;
			}
		} else if (this.#xs[0].isEmpty() && this.#xs[1].isEmpty() && !this.#xs[2].isEmpty()) {
			for (const v1 of d1) {
				for (const v2 of d2) {
					if (fn(v1, v2, v3)) break;
				}
			}
		} else if (this.#xs[0].isEmpty() && !this.#xs[1].isEmpty() && this.#xs[2].isEmpty()) {
			for (const v1 of d1) {
				for (const v3 of d3) {
					if (fn(v1, v2, v3)) break;
				}
			}
		} else if (!this.#xs[0].isEmpty() && this.#xs[1].isEmpty() && this.#xs[2].isEmpty()) {
			for (const v2 of d2) {
				for (const v3 of d3) {
					if (fn(v1, v2, v3)) break;
				}
			}
		} else {
			for (const v1 of d1) {
				for (const v2 of d2) {
					for (const v3 of d3) {
						if (fn(v1, v2, v3)) break;
					}
				}
			}
		}
		return cd;
	}

}
