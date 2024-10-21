/**
 * Utility class for constraint satisfaction problems.
 *
 * @author Takuto Yanagida
 * @version 2024-10-22
 */

import { Problem } from '../problem/problem';
import { CrispProblem } from '../problem/problem-crisp';
import { Variable } from '../problem/variable';
import { ImaginaryVariable } from '../problem/variables';
import { Domain } from '../problem/domain';
import { Relation } from '../problem/relation';
import { CrispRelation, FuzzyRelation } from '../problem/relation';

export class Problems {

	static #averagePathLength(p: Problem, x: Variable, length: number[], baseLength: number, xo: Set<Variable>): void {
		const xn: Variable[] = [];

		for (const c of x) {
			for (const xi of c) {
				if (length[xi.index()] === Number.MAX_VALUE) {
					xn.push(xi);
					length[xi.index()] = baseLength + 1;
				}
			}
		}
		for (const xi of xn) xo.add(xi);
		for (const xi of xn) {
			Problems.#averagePathLength(p, xi, length, baseLength + 1, xo);
		}
	}

	/**
	 * Calculates the average path length for a given variable.
	 * @param p A problem.
	 * @param x A variable of the problem.
	 * @return Average path length.
	 */
	static averagePathLength(p: Problem, x: Variable): number {
		const ls = new Array(p.variableSize());
		ls.fill(Number.MAX_VALUE);

		const xs = new Set<Variable>();
		xs.add(x);

		ls[x.index()] = 0;
		Problems.#averagePathLength(p, x, ls, 0, xs);

		let connectedSize: number = 0;
		let sum: number = 0;

		for (let i: number = 0; i < ls.length; ++i) {
			if (ls[i] !== Number.MAX_VALUE && i !== x.index()) {
				++connectedSize;
				sum += ls[i];
			}
		}
		if (connectedSize === 0) {
			return 0;
		}
		return sum / connectedSize;
	}

	/**
	 * Calculates the average path length.
	 * @param p A problem.
	 * @return Average path length.
	 */
	static averagePathLengths(p: Problem): number[] {
		const ls = new Array(p.variableSize());

		for (const x of p.variables()) {
			ls[x.index()] = Problems.averagePathLength(p, x);
		}
		return ls;
	}

	/**
	 * Gets an array containing all domains.
	 * @param p A problem.
	 * @return Array of domains.
	 */
	static domains(p: Problem): Domain[] {
		const ds: Domain[] = [];

		for (const x of p.variables()) {
			ds.push(x.domain());
		}
		return ds;
	}

	/**
	 * Returns the array of possible satisfaction degree values for all unary constraints.
	 * @param p A problem.
	 * @param degrees Array of degree values.
	 * @return The array.
	 */
	static possibleSatisfactionDegreesOfUnaryConstraints(p: Problem, degrees: number[]): number[] {
		for (const c of p.constraints()) {
			if (c.size() !== 1) continue;
			const x: Variable = c.at(0) as Variable;
			const origVal: number = x.value();  // Save the value.

			for (const v of x.domain()) {
				x.assign(v);
				degrees.push(c.satisfactionDegree());
			}
			x.assign(origVal);  // Restore the value.
		}
		return degrees;
	}

	/**
	 * Set up all domains.
	 * @param p A problem.
	 * @param ds Array of domains.
	 */
	static setDomains(p: Problem, ds: Domain[]): void {
		for (let i: number = 0; i < ds.length; ++i) {
			p.variableAt(i).domain(ds[i]);
		}
	}

	/**
	 * Returns a view of the fuzzy constraint satisfaction problem as a crisp constraint satisfaction problem.
	 * The relations and domains of the specified fuzzy constraint satisfaction problem are reused, but the other elements are newly generated.
	 * Note: Assignments to variables and changes to domains of the view are reflected in the variables of the original problem.
	 * @param p A fuzzy constraint satisfaction problem.
	 * @param threshold The threshold of constraint satisfaction degree. A constraint is considered satisfied when the constraint satisfaction degree is greater than or equal to this value.
	 * @return A crisp constraint satisfaction problem.
	 */
	static toViewAsCrispProblem(p: Problem, threshold: number): CrispFuzzyProblem {
		const cp = new CrispFuzzyProblem();

		for (const x of p.variables()) {
			cp.createVariable({ variable: x });
		}
		for (const c of p.constraints()) {
			const xs: Variable[] = [];

			for (const x of c) {
				xs.push(cp.variableAt(x.index()));
			}
			let r: Relation;
			if (c.isFuzzy()) {
				r = new CrispFuzzyRelation(c.fuzzyRelation(), threshold);
			} else {
				r = c.crispRelation();
			}
			cp.createConstraint({ relation: r, variables: xs });
		}
		return cp;
	}

}

class CrispFuzzyProblem extends CrispProblem {

	createVariable(args: { variable: Variable; }): Variable {
		const iv = new ImaginaryVariable(args.variable);
		this.addVariable(iv);
		return iv;
	}

}

class CrispFuzzyRelation implements CrispRelation {

	#th: number;
	#fr: FuzzyRelation;

	constructor(fr: FuzzyRelation, th: number) {
		this.#fr = fr;
		this.#th = th;
	}

	isSatisfied(...vs: number[]): 0 | 1 {
		return this.#fr.satisfactionDegree(...vs) >= this.#th ? 1 : 0;
	}

}
