/**
 * Relations.
 *
 * @author Takuto Yanagida
 * @version 2025-01-22
 */

import { Domain } from '../problem/domain';

/**
 * Crisp relations defined by tables.
 */
export function createCrispTabledRelation(elms: (0 | 1)[], doms: Domain[]): (...vs: number[]) => number {
	const es: (0 | 1)[] = [...elms];
	const ds: Domain[]  = [...doms];
	const ms: number[]  = new Array(doms.length);

	let m: number = 1;
	for (let i: number = ms.length - 1; i >= 0; --i) {
		ms[i] = m;
		m *= ds[i].size();
	}

	return (...vs: number[]): -1 | 0 | 1 => {
		if (ms.length !== vs.length) {
			throw new RangeError();
		}
		let index: number = 0;
		for (let i: number = 0; i < ms.length; ++i) {
			index += ms[i] * ds[i].indexOf(vs[i]);
		}
		return es[index];
	};
}

/**
 * Fuzzy relations defined by tables.
 */
export function createFuzzyTabledRelation(elms: number[], doms: Domain[]): (...vs: number[]) => number {
	const es: number[] = [...elms];
	const ds: Domain[] = [...doms];
	const ms = new Array(doms.length);

	let m: number = 1;
	for (let i: number = ms.length - 1; i >= 0; --i) {
		ms[i] = m;
		m *= ds[i].size();
	}

	return (...vs: number[]): number => {
		if (ms.length !== vs.length) {
			throw new RangeError();
		}
		let index: number = 0;
		for (let i: number = 0; i < ms.length; ++i) {
			index += ms[i] * ds[i].indexOf(vs[i]);
		}
		return es[index];
	};
}


// -----------------------------------------------------------------------------


export function createCrispFuzzyRelation(fn: (...vs: number[]) => number, th: number): (...vs: number[]) => number {
	return (...vs: number[]): -1 | 0 | 1 => {
		const d: number = fn(...vs);
		return (0 < d && d < th) ? 0 : d as -1 | 0 | 1;
	};
}
