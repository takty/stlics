/**
 * Utility class for constraint satisfaction problems.
 *
 * @author Takuto Yanagida
 * @version 2025-01-22
 */

import { Problem } from '../problem/problem';
import { Variable } from '../problem/variable';
import { Constraint } from '../problem/constraint';
import { Domain } from '../problem/domain';
import { ImaginaryVariable } from './variables';
import { createCrispFuzzyRelation } from './relations';

/**
 * Create a table that caches constraints between two variables.
 * @param pro A problem.
 * @param xs  An array of variables.
 * @return A table that caches constraints between two variables.
 */
export function createRelatedConstraintTable(pro: Problem, xs: Variable[]): Constraint[][][] {
	const rct: Constraint[][][] = [];

	for (let j: number = 0; j < xs.length; ++j) {
		rct.push(new Array(xs.length));

		for (let i: number = 0; i < xs.length; ++i) {
			if (i < j) {
				rct[j][i] = pro.constraintsBetween(xs[i], xs[j]);
			}
		}
	}
	return rct;
}


// -----------------------------------------------------------------------------


/**
 * Calculates the average path length.
 * @param p A problem.
 * @return Average path length.
 */
export function averagePathLengths(p: Problem): number[] {
	const ls = new Array(p.variableSize());
	for (const x of p.variables()) {
		ls[x.index()] = averagePathLength(p, x);
	}
	return ls;
}

/**
 * Calculates the average path length for a given variable.
 * @param p A problem.
 * @param x A variable of the problem.
 * @return Average path length.
 */
export function averagePathLength(p: Problem, x: Variable): number {
	const ls = new Array(p.variableSize());
	ls.fill(Number.MAX_VALUE);

	const xs = new Set<Variable>();
	xs.add(x);

	ls[x.index()] = 0;
	getPathLength(p, x, ls, 0, xs);

	let connectedSize: number = 0;
	let sum: number = 0;

	for (let i: number = 0; i < ls.length; ++i) {
		if (ls[i] !== Number.MAX_VALUE && i !== x.index()) {
			++connectedSize;
			sum += ls[i];
		}
	}
	if (0 === connectedSize) {
		return 0;
	}
	return sum / connectedSize;
}

function getPathLength(p: Problem, x: Variable, length: number[], baseLength: number, xo: Set<Variable>): void {
	const xn: Variable[] = [];

	for (const c of x) {
		for (const xi of c) {
			if (length[xi.index()] === Number.MAX_VALUE) {
				xn.push(xi);
				length[xi.index()] = baseLength + 1;
			}
		}
	}
	for (const xi of xn) {
		xo.add(xi);
	}
	for (const xi of xn) {
		getPathLength(p, xi, length, baseLength + 1, xo);
	}
}


// -----------------------------------------------------------------------------


/**
 * Gets an array containing all domains.
 * @param p A problem.
 * @return Array of domains.
 */
export function domains(p: Problem): Domain[] {
	const ds: Domain[] = [];
	for (const x of p.variables()) {
		ds.push(x.domain());
	}
	return ds;
}

/**
 * Set up all domains.
 * @param p A problem.
 * @param ds Array of domains.
 */
export function setDomains(p: Problem, ds: Domain[]): void {
	for (let i: number = 0; i < ds.length; ++i) {
		p.variableAt(i).domain(ds[i]);
	}
}


// -----------------------------------------------------------------------------


/**
 * Returns the array of possible satisfaction degree values for all unary constraints.
 * @param p A problem.
 * @param degrees Array of degree values.
 * @return The array.
 */
export function possibleDegreesOfUnaryConstraints(p: Problem, degrees: number[]): number[] {
	for (const c of p.constraints()) {
		if (c.size() !== 1) continue;
		const x: Variable = c.at(0) as Variable;
		const origV: number = x.value();  // Save the value.

		for (const v of x.domain()) {
			x.assign(v);
			degrees.push(c.degree());
		}
		x.assign(origV);  // Restore the value.
	}
	return degrees;
}


// -----------------------------------------------------------------------------


/**
 * Returns a view of the fuzzy constraint satisfaction problem as a crisp constraint satisfaction problem.
 * The relations and domains of the specified fuzzy constraint satisfaction problem are reused, but the other elements are newly generated.
 * Note: Assignments to variables and changes to domains of the view are reflected in the variables of the original problem.
 * @param p A fuzzy constraint satisfaction problem.
 * @param threshold The threshold of constraint satisfaction degree. A constraint is considered satisfied when the constraint satisfaction degree is greater than or equal to this value.
 * @return A crisp constraint satisfaction problem.
 */
export function toViewAsCrispProblem(p: Problem, threshold: number): CrispFuzzyProblem {
	const cp = new CrispFuzzyProblem();

	for (const x of p.variables()) {
		cp.createVariable(x);
	}
	for (const c of p.constraints()) {
		const xs: Variable[] = [];

		for (const x of c) {
			xs.push(cp.variableAt(x.index()));
		}
		cp.createConstraint(createCrispFuzzyRelation(c.relation(), threshold), xs);
	}
	return cp;
}

class CrispFuzzyProblem extends Problem {

	override createVariable(d_x: Domain | Variable, _value: number | null = null, _name: string = ''): Variable {
		if (d_x instanceof Variable) {
			const iv = new ImaginaryVariable(d_x);
			this.addVariable(iv);
			return iv;
		}
		throw new RangeError();
	}

}
