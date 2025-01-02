/**
 * This class holds the branch pruning states for a domain.
 *
 * @author Takuto Yanagida
 * @version 2025-01-02
 */

import { Variable } from '../problem/variable';
import { Domain } from '../problem/domain';

export class DomainPruner {

	static #UNPRUNED: number = Number.MIN_SAFE_INTEGER;

	#prunedLvs : number[];
	#prunedSize: number = 0;

	/**
	 * Generates a class that holds branch pruning states for a domain.
	 * @param size Size of the corresponding domain
	 */
	constructor(size: number) {
		this.#prunedLvs = new Array(size);
		this.#prunedLvs.fill(DomainPruner.#UNPRUNED);
	}

	/**
	 * Returns the size of the erased element.
	 * @return Size of the erased element.
	 */
	prunedSize(): number {
		return this.#prunedSize;
	}

	/**
	 * Erases the element at the specified index.
	 * @param index Index.
	 * @param level Level.
	 */
	prune(index: number, level: number): void {
		if (this.#prunedLvs[index] === DomainPruner.#UNPRUNED) {
			++this.#prunedSize;
		} else {
			throw new Error();
		}
		this.#prunedLvs[index] = level;
	}

	/**
	 * Returns whether the element is empty or not.
	 * Returns true if all elements have been erased.
	 * @return True if empty.
	 */
	isEmpty(): boolean {
		return this.#prunedLvs.length === this.#prunedSize;
	}

	/**
	 * Returns whether or not the element at the specified index has been erased.
	 * @param index Index.
	 * @return True if erased.
	 */
	isPruned(index: number): boolean {
		return this.#prunedLvs[index] !== DomainPruner.#UNPRUNED;
	}

	/**
	 * Restores the value that had been erased, by specifying a level.
	 * @param level Level
	 */
	recover(level: number): void {
		for (let i: number = 0; i < this.#prunedLvs.length; ++i) {
			if (this.#prunedLvs[i] === level) {
				this.#prunedLvs[i] = DomainPruner.#UNPRUNED;
				--this.#prunedSize;
			}
		}
	}

	/**
	 * Restores all erased values.
	 */
	recoverAll(): void {
		this.#prunedLvs.fill(DomainPruner.#UNPRUNED);
		this.#prunedSize = 0;
	}

}


// -----------------------------------------------------------------------------


/**
 * Returns the index of the variable with the minimum remaining values (MRV).
 * @param xs An array of variables.
 * @param dps An array of domain pruners.
 * @return The index of the variable with the minimum remaining values.
 */
export function indexOfVariableWithMRV(xs: Variable[], dps: DomainPruner[]): number {
	let index: number = 0;
	let size : number = Number.MAX_VALUE;

	for (let i: number = 0; i < xs.length; ++i) {
		const x: Variable = xs[i];
		if (!x.isEmpty()) {
			continue;
		}
		const d: Domain = x.domain();
		const s: number = d.size() - dps[x.index()].prunedSize();
		if (s < size) {
			size  = s;
			index = i;
		}
	}
	return index;
}
