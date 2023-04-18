/**
 * Class that represents an observable variable.
 *
 * @author Takuto Yanagida
 * @version 2023-04-18
 */

import { Variable } from './variable.js';

export class ObservableVariable extends Variable {

	#observer;

	// Called only from Problem.
	constructor(owner, d, observer) {
		super(owner, d);
		this.#observer = observer;
	}

	/**
	 * Assign a value.
	 * @param value Value.
	 */
	assign(value) {
		super.assign(value);
		if (this.#observer) {
			this.#observer(this, value);
		}
	}

}
