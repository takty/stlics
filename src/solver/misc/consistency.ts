/**
 * Utilities for calculating consistency degree.
 *
 * @author Takuto Yanagida
 * @version 2025-01-23
 */

import { Problem } from '../../problem/problem';
import { Variable } from '../../problem/variable';
import { Domain } from '../../problem/domain';
import { Constraint } from '../../problem/constraint';

/**
 * Calculates the highest and lowest consistency degrees.
 * @param p A problem.
 * @return The pair of the highest and lowest consistency degrees.
 */
export function consistencyDegreeOfProblem(p: Problem): [number, number] {
	let L: number = 1;
	let H: number = 0;

	for (const c of p.constraints()) {
		const l: number = lowestConsistencyDegree(c);
		const h: number = highestConsistencyDegree(c);
		if (l < L) L = l;
		if (H < h) H = h;
	}
	return [L, H];
}

/**
 * Calculates the highest consistency degree.
 * That is, it seeks the highest satisfaction degree of the possible combinations of variable assignments for a given constraint.
 * When all associated variables have been assigned values, it returns the same value as degree().
 * @param c A constraint.
 * @return The highest consistency degree.
 */
export function highestConsistencyDegree(c: Constraint): number {
	const s: number = c.size();
	if (1 === s) return highestConsistencyDegree1(c);
	if (2 === s) return highestConsistencyDegree2(c);
	if (3 === s) return highestConsistencyDegree3(c);
	return highestConsistencyDegreeN(c);
}

/**
 * Calculates the lowest consistency degree.
 * That is, it seeks the lowest satisfaction degree of the possible combinations of variable assignments for a given constraint.
 * When all associated variables have been assigned values, it returns the same value as degree().
 * @param c A constraint.
 * @return The lowest consistency degree.
 */
export function lowestConsistencyDegree(c: Constraint): number {
	const s: number = c.size();
	if (1 === s) return lowestConsistencyDegree1(c);
	if (2 === s) return lowestConsistencyDegree2(c);
	if (3 === s) return lowestConsistencyDegree3(c);
	return lowestConsistencyDegreeN(c);
}

/**
 * Calculates the highest consistency degree of a unary constraint.
 * @param c A constraint.
 * @return The highest consistency degree.
 */
function highestConsistencyDegree1(c: Constraint): number {
	const ev: number = c.degree();
	if (0 <= ev) {  // ev !== UNDEFINED
		return ev;
	}
	const x: Variable = (c.at(0) as Variable);
	let cd: number = 0;
	for (const v of x.domain()) {
		const ev: number = c.relation()(v);
		if (cd < ev) {
			cd = ev;
		}
		if (1 === cd) return 1;
	}
	return cd;
}

/**
 * Calculates the lowest consistency degree of a unary constraint.
 * @param c A constraint.
 * @return The lowest consistency degree.
 */
function lowestConsistencyDegree1(c: Constraint): number {
	const ev: number = c.degree();
	if (0 <= ev) {  // ev !== UNDEFINED
		return ev;
	}
	const x: Variable = (c.at(0) as Variable);
	let cd: number = 1;
	for (const v of x.domain()) {
		const ev: number = c.relation()(v);
		if (ev < cd) {
			cd = ev;
		}
		if (0 === cd) return 0;
	}
	return cd;
}

/**
 * Calculates the highest consistency degree of a binary constraint.
 * @param c A constraint.
 * @return The highest consistency degree.
 */
function highestConsistencyDegree2(c: Constraint): number {
	const ev: number = c.degree();
	if (0 <= ev) {  // ev !== UNDEFINED
		return ev;
	}
	const x0: Variable = c.at(0) as Variable;
	const x1: Variable = c.at(1) as Variable;

	const d0: Iterable<number> = x0.isEmpty() ? x0.domain() : [x0.value()];
	const d1: Iterable<number> = x1.isEmpty() ? x1.domain() : [x1.value()];

	let cd: number = 0;
	for (const v0 of d0) {
		for (const v1 of d1) {
			const ev: number = c.relation()(v0, v1);
			if (cd < ev) {
				cd = ev;
			}
			if (1 === cd) return 1
		}
	}
	return cd;
}

/**
 * Calculates the lowest consistency degree of a binary constraint.
 * @param c A constraint.
 * @return The lowest consistency degree.
 */
function lowestConsistencyDegree2(c: Constraint): number {
	const ev: number = c.degree();
	if (0 <= ev) {  // ev !== UNDEFINED
		return ev;
	}
	const x0: Variable = c.at(0) as Variable;
	const x1: Variable = c.at(1) as Variable;

	const d0: Iterable<number> = x0.isEmpty() ? x0.domain() : [x0.value()];
	const d1: Iterable<number> = x1.isEmpty() ? x1.domain() : [x1.value()];

	let cd: number = 1;
	for (const v0 of d0) {
		for (const v1 of d1) {
			const ev: number = c.relation()(v0, v1);
			if (ev < cd) {
				cd = ev;
			}
			if (0 === cd) return 0;
		}
	}
	return cd;
}

/**
 * Calculates the highest consistency degree of a trinary constraint.
 * @param c A constraint.
 * @return The highest consistency degree.
 */
function highestConsistencyDegree3(c: Constraint): number {
	const ev: number = c.degree();
	if (0 <= ev) {  // ev !== UNDEFINED
		return ev;
	}
	const x0: Variable = c.at(0) as Variable;
	const x1: Variable = c.at(1) as Variable;
	const x2: Variable = c.at(2) as Variable;

	const d0: Iterable<number> = x0.isEmpty() ? x0.domain() : [x0.value()];
	const d1: Iterable<number> = x1.isEmpty() ? x1.domain() : [x1.value()];
	const d2: Iterable<number> = x2.isEmpty() ? x2.domain() : [x2.value()];

	let cd: number = 0;
	for (const v0 of d0) {
		for (const v1 of d1) {
			for (const v2 of d2) {
				const ev: number = c.relation()(v0, v1, v2);
				if (cd < ev) {
					cd = ev;
				}
				if (1 === cd) return 1;
			}
		}
	}
	return cd;
}

/**
 * Calculates the lowest consistency degree of a trinary constraint.
 * @param c A constraint.
 * @return The lowest consistency degree.
 */
function lowestConsistencyDegree3(c: Constraint): number {
	const ev: number = c.degree();
	if (0 <= ev) {  // ev !== UNDEFINED
		return ev;
	}
	const x0: Variable = c.at(0) as Variable;
	const x1: Variable = c.at(1) as Variable;
	const x2: Variable = c.at(2) as Variable;

	const d0: Iterable<number> = x0.isEmpty() ? x0.domain() : [x0.value()];
	const d1: Iterable<number> = x1.isEmpty() ? x1.domain() : [x1.value()];
	const d2: Iterable<number> = x2.isEmpty() ? x2.domain() : [x2.value()];

	let cd: number = 1;
	for (const v0 of d0) {
		for (const v1 of d1) {
			for (const v2 of d2) {
				const ev: number = c.relation()(v0, v1, v2);
				if (ev < cd) {
					cd = ev;
				}
				if (0 === cd) return 0;
			}
		}
	}
	return cd;
}

/**
 * Calculates the highest consistency degree of a N-ary constraint.
 * @param c A constraint.
 * @return The highest consistency degree.
 */
function highestConsistencyDegreeN(c: Constraint): number {
	const ev: number = c.degree();
	if (0 <= ev) {  // ev !== UNDEFINED
		return ev;
	}
	const emptyIndices = new Array(c.emptySize());
	let j: number = 0;

	const vs: number[] = new Array(c.size());
	for (let i: number = 0, I: number = c.size(); i < I; ++i) {
		const x: Variable = (c.at(i) as Variable);
		if (x.isEmpty()) {
			emptyIndices[j++] = i;
		} else {
			vs[i] = x.value();
		}
	}
	return checkHCD(c, vs, emptyIndices, 0, 0);
}

/**
 * Calculates the lowest consistency degree of a N-ary constraint.
 * @param c A constraint.
 * @return The lowest consistency degree.
 */
function lowestConsistencyDegreeN(c: Constraint): number {
	const ev: number = c.degree();
	if (0 <= ev) {  // ev !== UNDEFINED
		return ev;
	}
	const emptyIndices = new Array(c.emptySize());
	let j: number = 0;

	const vs: number[] = new Array(c.size());
	for (let i: number = 0, I: number = c.size(); i < I; ++i) {
		const x: Variable = (c.at(i) as Variable);
		if (x.isEmpty()) {
			emptyIndices[j++] = i;
		} else {
			vs[i] = x.value();
		}
	}
	return checkLCD(c, vs, emptyIndices, 0, 1);
}

function checkHCD(c: Constraint, vs: number[], emptyIndices: number[], currentStep: number, cd: number): number {
	const index: number = emptyIndices[currentStep];
	const d    : Domain = (c.at(index) as Variable).domain();

	if (currentStep === emptyIndices.length - 1) {
		for (const v of d) {
			vs[index] = v;
			const ev: number = c.relation()(...vs);
			if (cd < ev) {
				cd = ev;
			}
			if (1 === cd) {
				return 1;
			}
		}
	} else {
		for (const v of d) {
			vs[index] = v;
			cd = checkHCD(c, vs, emptyIndices, currentStep + 1, cd);
		}
	}
	return cd;
}

function checkLCD(c: Constraint, vs: number[], emptyIndices: number[], currentStep: number, cd: number): number {
	const index: number = emptyIndices[currentStep];
	const d    : Domain = (c.at(index) as Variable).domain();

	if (currentStep === emptyIndices.length - 1) {
		for (const v of d) {
			vs[index] = v;
			const ev: number = c.relation()(...vs);
			if (ev < cd) {
				cd = ev;
			}
			if (0 === cd) {
				return 0;
			}
		}
	} else {
		for (const v of d) {
			vs[index] = v;
			cd = checkLCD(c, vs, emptyIndices, currentStep + 1, cd);
		}
	}
	return cd;
}
