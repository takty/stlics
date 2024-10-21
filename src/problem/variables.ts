/**
 * Classes of utility variables.
 *
 * @author Takuto Yanagida
 * @version 2024-10-21
 */

import { Problem } from './problem';
import { Variable } from './variable';
import { Domain } from './domain';

/**
 * Class that represents an observable variable.
 */
export class ObservableVariable extends Variable {

	#observer: ((x: Variable, v: number) => void) | null;

	// Called only from Problem.
	constructor(owner: Problem, d: Domain, observer: (x: Variable, v: number) => void) {
		super(owner, d);
		this.#observer = observer;
	}

	/**
	 * Assign a value.
	 * @param v Value.
	 */
	assign(v: number): void {
		super.assign(v);
		if (this.#observer) {
			this.#observer(this, v);
		}
	}

}

/**
 * Class that represents an imaginary variable.
 */
export class ImaginaryVariable extends Variable {

	#orig: Variable;

	constructor(x: Variable) {
		super(x.owner(), x.domain());
		this.#orig = x;
		this.setName(x.name());
		this.assign(x.value());
	}

	assign(v: number): void {
		this.#orig.assign(v);
	}

	domain(): Domain;

	domain(d: Domain): void;

	domain(d?: Domain): Domain | void {
		if (d === undefined) {
			return this.#orig.domain();
		} else {
			this.#orig.domain(d);
		}
	}

	value(): number {
		return this.#orig.value();
	}

}
