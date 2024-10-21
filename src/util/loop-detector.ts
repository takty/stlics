/**
 * This class detects that a solver's operation is looping.
 *
 * @author Takuto Yanagida
 * @version 2024-10-22
 */

export class LoopDetector {

	#loopLength: number;
	#iterCount: number;

	#is: number[] = [];
	#vs: number[] = [];

	#cur: number = 0;

	constructor(loopLength: number = 30, iterCount: number = 3) {
		this.#loopLength = loopLength;
		this.#iterCount = iterCount;
		this.#initArrays();
	}

	#assignToVariable(index: number, value: number): void {
		this.#is[this.#cur] = index;
		this.#vs[this.#cur] = value;

		if (--this.#cur === -1) {
			this.#cur = this.#is.length - 1;
		}
	}

	#checkLooping(): number {
		const is = new Array(this.#loopLength);
		const vs = new Array(this.#loopLength);

		out: for (let length: number = 1; length <= this.#loopLength; ++length) {
			let offset: number = this.#cur + 1;
			for (let i: number = 0; i < length; ++i) {
				if (i + offset === this.#is.length) {
					offset -= this.#is.length;
				}
				is[i] = this.#is[i + offset];
				vs[i] = this.#vs[i + offset];
			}
			let fi: number = length;
			for (let i: number = 0; i < this.#iterCount - 1; ++i) {
				offset = this.#cur + 1;
				for (let j: number = 0; j < length; ++j) {
					if (fi + j + offset >= this.#is.length) {
						offset -= this.#is.length;
					}
					if (this.#is[fi + j + offset] !== is[j] || this.#vs[fi + j + offset] !== vs[j]) {
						continue out;
					}
				}
				fi += length;
			}
			return length;
		}
		return 0;
	}

	#initArrays(): void {
		this.#is = new Array(this.#loopLength * this.#iterCount);
		this.#vs = new Array(this.#loopLength * this.#iterCount);
		this.#is.fill(-1);
		this.#vs.fill(-1);
		this.#cur = this.#is.length - 1;
	}

	checkLoop(variableIndex: number, value: number): number {
		this.#assignToVariable(variableIndex, value);
		return this.#checkLooping();
	}

	clear(): void {
		this.#is.fill(-1);
		this.#vs.fill(-1);
	}

	iterationCount(): number {
		return this.#iterCount;
	}

	loopLength(): number {
		return this.#loopLength;
	}

	values(): number[] {
		return this.#vs.slice();
	}

	variableIndices(): number[] {
		return this.#is.slice();
	}

}
