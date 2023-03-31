/**
 * This class detects that a solver's operation is looping.
 *
 * @author Takuto Yanagida
 * @version 2023-03-26
 */

class LoopDetector {

	#indices    = [];
	#values     = [];
	#cur        = null;
	#loopLength = null;
	#iterCount  = null;

	constructor(loopLength = 30, iterCount = 3) {
		this.#loopLength = loopLength;
		this.#iterCount  = iterCount;
		this.#initArrays();
	}

	#assignToVariable(index, value) {
		this.#indices[this.#cur] = index;
		this.#values[this.#cur]  = value;
		if(--this.#cur === -1) {
			this.#cur = this.#indices.length - 1;
		}
	}

	#checkLooping() {
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
					if (this.#indices[fi + j + offset] !== key[j] || this.#values[fi + j + offset] !== val[j] ) {
						continue out;
					}
				}
				fi += length;
			}
			return length;
		}
		return 0;
	}

	#initArrays() {
		this.#indices = new Array(this.#loopLength * this.#iterCount);
		this.#values  = new Array(this.#loopLength * this.#iterCount);
		this.#indices.fill(-1);
		this.#values.fill(-1);
		this.#cur = this.#indices.length - 1;
	}

	checkLoop(variableIndex, value) {
		this.#assignToVariable(variableIndex, value);
		return this.#checkLooping();
	}

	clear() {
		this.#indices.fill(-1);
		this.#values.fill(-1);
	}

	iterationCount() {
		return this.#iterCount;
	}

	loopLength() {
		return this.#loopLength;
	}

	values() {
		return this.#values.clone();
	}

	variableIndices() {
		return this.#indices.clone();
	}

}
