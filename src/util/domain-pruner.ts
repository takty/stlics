/**
 * This class holds the branch pruning states for a domain.
 *
 * @author Takuto Yanagida
 * @version 2023-03-25
 */

export class DomainPruner {

	static #UNHIDDEN: number = -1;

	#hiddenLevels: number[];
	#hiddenSize: number = 0;

	/**
	 * Generates a class that holds branch pruning states for a domain.
	 * @param size Size of the corresponding domain
	 */
	constructor(size: number) {
		this.#hiddenLevels = new Array(size);
		this.#hiddenLevels.fill(DomainPruner.#UNHIDDEN);
	}

	/**
	 * Returns the size of the erased element.
	 * @return Size of the erased element.
	 */
	hiddenSize(): number {
		return this.#hiddenSize;
	}

	/**
	 * Erases the element at the specified index.
	 * @param index Index.
	 * @param level Level.
	 */
	hide(index: number, level: number): void {
		if (this.#hiddenLevels[index] === DomainPruner.#UNHIDDEN) {
			++this.#hiddenSize;
		}
		this.#hiddenLevels[index] = level;
	}

	/**
	 * Returns whether the element is empty or not.
	 * Returns true if all elements have been erased.
	 * @return True if empty.
	 */
	isEmpty(): boolean {
		return this.#hiddenLevels.length === this.#hiddenSize;
	}

	/**
	 * Returns whether or not the element at the specified index has been erased.
	 * @param index Index.
	 * @return True if erased.
	 */
	isValueHidden(index: number): boolean {
		return this.#hiddenLevels[index] !== DomainPruner.#UNHIDDEN;
	}

	/**
	 * Restores the value that had been erased, by specifying a level.
	 * @param level Level
	 */
	reveal(level: number): void {
		for (let i = 0; i < this.#hiddenLevels.length; ++i) {
			if (this.#hiddenLevels[i] === level) {
				this.#hiddenLevels[i] = DomainPruner.#UNHIDDEN;
				--this.#hiddenSize;
			}
		}
	}

	/**
	 * Restores all erased values.
	 */
	revealAll(): void {
		this.#hiddenLevels.fill(DomainPruner.#UNHIDDEN);
		this.#hiddenSize = 0;
	}

}
