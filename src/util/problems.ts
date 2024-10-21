/**
 * Utility class for constraint satisfaction problems.
 *
 * @author Takuto Yanagida
 * @version 2023-04-18
 */

import { Problem } from '../problem/problem';
import { CrispProblem } from '../problem/problem-crisp';
import { Variable } from '../problem/variable';
import { Domain } from '../problem/domain';
import { Relation } from '../problem/relation';
import { CrispRelation } from '../problem/relation-crisp';
import { FuzzyRelation } from '../problem/relation-fuzzy';

export class Problems {

	static #averagePathLength(p: Problem, v: Variable, length: number[], baseLength: number, vo: Set<Variable>): void {
		const vn: Variable[] = [];

		for (const c of v) {
			for (const vi of c) {
				if (length[vi.index()] === Number.MAX_VALUE) {
					vn.push(vi);
					length[vi.index()] = baseLength + 1;
				}
			}
		}
		for (const vi of vn) vo.add(vi);
		for (const vi of vn) {
			Problems.#averagePathLength(p, vi, length, baseLength + 1, vo);
		}
	}

	/**
	 * Calculates the average path length for a given variable.
	 * @param p A problem.
	 * @param v A variable of the problem.
	 * @return Average path length.
	 */
	static averagePathLength(p: Problem, v: Variable) {
		const ls = new Array(p.variableSize());
		ls.fill(Number.MAX_VALUE);

		const vs = new Set<Variable>();
		vs.add(v);

		ls[v.index()] = 0;
		Problems.#averagePathLength(p, v, ls, 0, vs);

		let connectedSize = 0;
		let sum = 0;

		for (let i = 0; i < ls.length; ++i) {
			if (ls[i] !== Number.MAX_VALUE && i !== v.index()) {
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
	static averagePathLengths(p: Problem) {
		const ls = new Array(p.variableSize());

		for (const v of p.variables()) {
			ls[v.index()] = Problems.averagePathLength(p, v);
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

		for (const v of p.variables()) {
			ds.push(v.domain());
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
			const v: Variable = c.at(0);
			const origVal: number = v.value();  // Save the value.

			for (const val of v.domain()) {
				v.assign(val);
				degrees.push(c.satisfactionDegree());
			}
			v.assign(origVal);  // Restore the value.
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
			p.variableAt(i).setDomain(ds[i]);
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

		for (const v of p.variables()) {
			cp.createVariable({ variable: v });
		}
		for (const c of p.constraints()) {
			const vs: Variable[] = [];

			for (const v of c) {
				vs.push(cp.variableAt(v.index()));
			}
			let r: Relation;
			if (c.isFuzzy()) {
				r = new CrispFuzzyRelation(c.fuzzyRelation(), threshold);
			} else {
				r = c.crispRelation();
			}
			cp.createConstraint({ relation: r, variables: vs });
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

class ImaginaryVariable extends Variable {

	#orig: Variable;

	constructor(v: Variable) {
		super(v.owner(), v.domain());
		this.#orig = v;
		this.setName(v.name());
		this.assign(v.value());
	}

	assign(value: number): void {
		this.#orig.assign(value);
	}

	domain(): Domain {
		return this.#orig.domain();
	}

	setDomain(dom: Domain): void {
		this.#orig.setDomain(dom);
	}

	value(): number {
		return this.#orig.value();
	}

}
