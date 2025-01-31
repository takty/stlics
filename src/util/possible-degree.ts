/**
 * Utilities for collecting possible degrees.
 *
 * @author Takuto Yanagida
 * @version 2025-01-31
 */

import { Problem } from '../problem/problem';
import { Variable } from '../problem/variable';
import { Domain } from '../problem/domain';
import { Constraint } from '../problem/constraint';

/**
 * Collects possible degrees of a problem.
 *
 * @param p A problem
 * @returns A set of possible degrees
 */
export function possibleDegreesOfProblem(p: Problem): Set<number> {
	const dest: Set<number> = new Set<number>();
	for (const c of p.constraints()) {
		possibleDegrees(c, dest);
	}
	return dest;
}

/**
 * Collects possible degrees of a constraint.
 *
 * @param c A constraint
 * @param dest A set of possible degrees
 */
export function possibleDegrees(c: Constraint, dest: Set<number>): void {
	switch (c.size()) {
		case 1: possibleDegrees1(c, dest); break;
		case 2: possibleDegrees2(c, dest); break;
		case 3: possibleDegrees3(c, dest); break;
		default: possibleDegreesN(c, dest); break;
	}
}

function possibleDegrees1(c: Constraint, dest: Set<number>): void {
	const x: Variable = (c.at(0) as Variable);

	for (const v of x.domain()) {
		dest.add(c.relation()(v));
	}
}

function possibleDegrees2(c: Constraint, dest: Set<number>): void {
	const x0: Variable = c.at(0) as Variable;
	const x1: Variable = c.at(1) as Variable;

	const d0: Iterable<number> = x0.isEmpty() ? x0.domain() : [x0.value()];
	const d1: Iterable<number> = x1.isEmpty() ? x1.domain() : [x1.value()];

	for (const v0 of d0) {
		for (const v1 of d1) {
			dest.add(c.relation()(v0, v1));
		}
	}
}

function possibleDegrees3(c: Constraint, dest: Set<number>): void {
	const x0: Variable = c.at(0) as Variable;
	const x1: Variable = c.at(1) as Variable;
	const x2: Variable = c.at(2) as Variable;

	const d0: Iterable<number> = x0.isEmpty() ? x0.domain() : [x0.value()];
	const d1: Iterable<number> = x1.isEmpty() ? x1.domain() : [x1.value()];
	const d2: Iterable<number> = x2.isEmpty() ? x2.domain() : [x2.value()];

	for (const v0 of d0) {
		for (const v1 of d1) {
			for (const v2 of d2) {
				dest.add(c.relation()(v0, v1, v2));
			}
		}
	}
}

function possibleDegreesN(c: Constraint, dest: Set<number>): void {
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
	checkHCD(c, vs, emptyIndices, 0, 0, dest);
}

function checkHCD(c: Constraint, vs: number[], emptyIndices: number[], currentStep: number, cd: number, dest: Set<number>): void {
	const index: number = emptyIndices[currentStep];
	const d    : Domain = (c.at(index) as Variable).domain();

	if (currentStep === emptyIndices.length - 1) {
		for (const v of d) {
			vs[index] = v;
			dest.add(c.relation()(...vs));
		}
	} else {
		for (const v of d) {
			vs[index] = v;
			checkHCD(c, vs, emptyIndices, currentStep + 1, cd, dest);
		}
	}
}
