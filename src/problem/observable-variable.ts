/**
 * Class that represents an observable variable.
 *
 * @author Takuto Yanagida
 * @version 2023-04-18
 */

import { Problem } from './problem';
import { Variable } from './variable';
import { Domain } from './domain';

export class ObservableVariable extends Variable {

	#observer: ((v: Variable, val: number) => void)|null;

	// Called only from Problem.
	constructor(owner: Problem, d: Domain, observer: (v: Variable, val: number) => void) {
		super(owner, d);
		this.#observer = observer;
	}

	/**
	 * Assign a value.
	 * @param value Value.
	 */
	assign(value: number): void {
		super.assign(value);
		if (this.#observer) {
			this.#observer(this, value);
		}
	}

}
