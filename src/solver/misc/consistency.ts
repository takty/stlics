/**
 * Utilities for calculating consistency degree.
 *
 * @author Takuto Yanagida
 * @version 2025-01-16
 */

import { Problem } from '../../problem/problem';
import { Variable } from '../../problem/variable';
import { Constraint } from '../../problem/constraint';
import { Domain } from '../../problem/domain';

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
		if (h > H) H = h;
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
	if (s === 1) return highestConsistencyDegree1(c);
	if (s === 2) return highestConsistencyDegree2(c);
	if (s === 3) return highestConsistencyDegree3(c);
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
	if (s === 1) return lowestConsistencyDegree1(c);
	if (s === 2) return lowestConsistencyDegree2(c);
	if (s === 3) return lowestConsistencyDegree3(c);
	return lowestConsistencyDegreeN(c);
}

/**
 * {@override}
 */
function highestConsistencyDegree1(c: Constraint): number {
	const d: number = c.degree();
	if (d !== Constraint.UNDEFINED) {
		return d;
	}
	let cd: number = 0;
	const fn = (v: number): boolean => {
		const d: number = c.rel.degree(v);
		if (d > cd) {
			cd = d;
		}
		return (cd === 1);
	}
	const x1: Variable = (c.at(0) as Variable);
	for (const v of x1.domain()) {
		if (fn(v)) break;
	}
	return cd;
}

/**
 * {@override}
 */
function lowestConsistencyDegree1(c: Constraint): number {
	const d: number = c.degree();
	if (d !== Constraint.UNDEFINED) {
		return d;
	}
	let cd: number = 1;
	const fn = (v: number): boolean => {
		const d: number = c.rel.degree(v);
		if (d < cd) {
			cd = d;
		}
		return (cd === 0);
	}
	const x1: Variable = (c.at(0) as Variable);
	for (const v of x1.domain()) {
		if (fn(v)) break;
	}
	return cd;
}

/**
 * {@override}
 */
function highestConsistencyDegree2(c: Constraint): number {
	const d: number = c.degree();
	if (d !== Constraint.UNDEFINED) {
		return d;
	}
	let cd: number = 0;
	const fn = (v1: number, v2: number): boolean => {
		const d: number = c.rel.degree(v1, v2);
		if (d > cd) {
			cd = d;
		}
		return (cd === 1);
	}
	const x1: Variable = (c.at(0) as Variable);
	const x2: Variable = (c.at(1) as Variable);

	const v1: number = x1.value();
	const v2: number = x2.value();
	const d1: Domain = x1.domain();
	const d2: Domain = x2.domain();

	if (x1.isEmpty() && !x2.isEmpty()) {
		for (const v1 of d1) {
			if (fn(v1, v2)) break;
		}
	} else if (!x1.isEmpty() && x2.isEmpty()) {
		for (const v2 of d2) {
			if (fn(v1, v2)) break;
		}
	} else {
		for (const v1 of d1) {
			for (const v2 of d2) {
				if (fn(v1, v2)) break;
			}
		}
	}
	return cd;
}

/**
 * {@override}
 */
function lowestConsistencyDegree2(c: Constraint): number {
	const d: number = c.degree();
	if (d !== Constraint.UNDEFINED) {
		return d;
	}
	let cd: number = 1;
	const fn = (v1: number, v2: number): boolean => {
		const d: number = c.rel.degree(v1, v2);
		if (d < cd) {
			cd = d;
		}
		return (cd === 0);
	}
	const x1: Variable = (c.at(0) as Variable);
	const x2: Variable = (c.at(1) as Variable);

	const v1: number = x1.value();
	const v2: number = x2.value();
	const d1: Domain = x1.domain();
	const d2: Domain = x2.domain();

	if (x1.isEmpty() && !x2.isEmpty()) {
		for (const v1 of d1) {
			if (fn(v1, v2)) break;
		}
	} else if (!x1.isEmpty() && x2.isEmpty()) {
		for (const v2 of d2) {
			if (fn(v1, v2)) break;
		}
	} else {
		for (const v1 of d1) {
			for (const v2 of d2) {
				if (fn(v1, v2)) break;
			}
		}
	}
	return cd;
}

/**
 * {@override}
 */
function highestConsistencyDegree3(c: Constraint): number {
	const d: number = c.degree();
	if (d !== Constraint.UNDEFINED) {
		return d;
	}
	let cd: number = 0;
	const fn = (v1: number, v2: number, v3: number): boolean => {
		const d: number = c.rel.degree(v1, v2, v3);
		if (d > cd) {
			cd = d;
		}
		return (cd === 1);
	}
	const x1: Variable = (c.at(0) as Variable);
	const x2: Variable = (c.at(1) as Variable);
	const x3: Variable = (c.at(2) as Variable);

	const v1: number = x1.value();
	const v2: number = x2.value();
	const v3: number = x3.value();
	const d1: Domain = x1.domain();
	const d2: Domain = x2.domain();
	const d3: Domain = x3.domain();

	if (x1.isEmpty() && !x2.isEmpty() && !x3.isEmpty()) {
		for (const v1 of d1) {
			if (fn(v1, v2, v3)) break;
		}
	} else if (!x1.isEmpty() && x2.isEmpty() && !x3.isEmpty()) {
		for (const v2 of d2) {
			if (fn(v1, v2, v3)) break;
		}
	} else if (!x1.isEmpty() && !x2.isEmpty() && x3.isEmpty()) {
		for (const v3 of d3) {
			if (fn(v1, v2, v3)) break;
		}
	} else if (x1.isEmpty() && x2.isEmpty() && !x3.isEmpty()) {
		for (const v1 of d1) {
			for (const v2 of d2) {
				if (fn(v1, v2, v3)) break;
			}
		}
	} else if (x1.isEmpty() && !x2.isEmpty() && x3.isEmpty()) {
		for (const v1 of d1) {
			for (const v3 of d3) {
				if (fn(v1, v2, v3)) break;
			}
		}
	} else if (!x1.isEmpty() && x2.isEmpty() && x3.isEmpty()) {
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
function lowestConsistencyDegree3(c: Constraint): number {
	const d: number = c.degree();
	if (d !== Constraint.UNDEFINED) {
		return d;
	}
	let cd: number = 1;
	const fn = (v1: number, v2: number, v3: number): boolean => {
		const d: number = c.rel.degree(v1, v2, v3);
		if (d < cd) {
			cd = d;
		}
		return (cd === 0);
	}
	const x1: Variable = (c.at(0) as Variable);
	const x2: Variable = (c.at(1) as Variable);
	const x3: Variable = (c.at(2) as Variable);

	const v1: number = x1.value();
	const v2: number = x2.value();
	const v3: number = x3.value();
	const d1: Domain = x1.domain();
	const d2: Domain = x2.domain();
	const d3: Domain = x3.domain();

	if (x1.isEmpty() && !x2.isEmpty() && !x3.isEmpty()) {
		for (const v1 of d1) {
			if (fn(v1, v2, v3)) break;
		}
	} else if (!x1.isEmpty() && x2.isEmpty() && !x3.isEmpty()) {
		for (const v2 of d2) {
			if (fn(v1, v2, v3)) break;
		}
	} else if (!x1.isEmpty() && !x2.isEmpty() && x3.isEmpty()) {
		for (const v3 of d3) {
			if (fn(v1, v2, v3)) break;
		}
	} else if (x1.isEmpty() && x2.isEmpty() && !x3.isEmpty()) {
		for (const v1 of d1) {
			for (const v2 of d2) {
				if (fn(v1, v2, v3)) break;
			}
		}
	} else if (x1.isEmpty() && !x2.isEmpty() && x3.isEmpty()) {
		for (const v1 of d1) {
			for (const v3 of d3) {
				if (fn(v1, v2, v3)) break;
			}
		}
	} else if (!x1.isEmpty() && x2.isEmpty() && x3.isEmpty()) {
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
function highestConsistencyDegreeN(c: Constraint): number {
	const d: number = c.degree();
	if (d !== Constraint.UNDEFINED) {
		return d;
	}
	const emptyIndices = new Array(c.emptyVariableSize());
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
 * {@override}
 */
function lowestConsistencyDegreeN(c: Constraint): number {
	const d: number = c.degree();
	if (d !== Constraint.UNDEFINED) {
		return d;
	}
	const emptyIndices = new Array(c.emptyVariableSize());
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
			const s: number = c.rel.degree(...vs);
			if (s > cd) {
				cd = s;
			}
			if (cd === 1) {
				break;
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
			const s: number = c.rel.degree(...vs);
			if (s < cd) {
				cd = s;
			}
			if (cd === 0) {
				break;
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
