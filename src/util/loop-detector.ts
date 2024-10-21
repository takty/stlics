/**
 * This class detects that a solver's operation is looping.
 *
 * @author Takuto Yanagida
 * @version 2023-04-16
 */

export class LoopDetector {

	#indices: number[] = [];
	#values: number[] = [];
	#loopLength: number;
	#iterCount: number;
	#cur: number = 0;

	constructor(loopLength: number = 30, iterCount: number = 3) {
		this.#loopLength = loopLength;
		this.#iterCount = iterCount;
		this.#initArrays();
	}

	#assignToVariable(index: number, value: number): void {
		this.#indices[this.#cur] = index;
		this.#values[this.#cur] = value;
		if (--this.#cur === -1) {
			this.#cur = this.#indices.length - 1;
		}
	}

	#checkLooping(): number {
		const key = new Array(this.#loopLength);
		const val = new Array(this.#loopLength);
		out: for (let length = 1; length <= this.#loopLength; ++length) {
			let offset = this.#cur + 1;
			for (let i = 0; i < length; ++i) {
				if (i + offset === this.#indices.length) {
					offset -= this.#indices.length;
				}
				key[i] = this.#indices[i + offset];
				val[i] = this.#values[i + offset];
			}
			let fi = length;
			for (let i = 0; i < this.#iterCount - 1; ++i) {
				offset = this.#cur + 1;
				for (let j = 0; j < length; ++j) {
					if (fi + j + offset >= this.#indices.length) {
						offset -= this.#indices.length;
					}
					if (this.#indices[fi + j + offset] !== key[j] || this.#values[fi + j + offset] !== val[j]) {
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
		this.#indices = new Array(this.#loopLength * this.#iterCount);
		this.#values = new Array(this.#loopLength * this.#iterCount);
		this.#indices.fill(-1);
		this.#values.fill(-1);
		this.#cur = this.#indices.length - 1;
	}

	checkLoop(variableIndex: number, value: number): number {
		this.#assignToVariable(variableIndex, value);
		return this.#checkLooping();
	}

	clear(): void {
		this.#indices.fill(-1);
		this.#values.fill(-1);
	}

	iterationCount(): number {
		return this.#iterCount;
	}

	loopLength(): number {
		return this.#loopLength;
	}

	values(): number[] {
		return this.#values.slice();
	}

	variableIndices(): number[] {
		return this.#indices.slice();
	}

}
