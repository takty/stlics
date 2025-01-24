/**
 * Classes of utility variables.
 *
 * @author Takuto Yanagida
 * @version 2025-01-24
 */

import { Variable } from '../problem/variable';
import { Domain } from '../problem/domain';

/**
 * Class that represents an observable variable.
 */
export class ObservableVariable extends Variable {

	#observer: ((x: Variable, v: number) => void) | null;

	// Called only from Problem.
	constructor(d: Domain, observer: (x: Variable, v: number) => void) {
		super(d);
		this.#observer = observer;
	}

	/**
	 * Assign a value.
	 * @param v Value.
	 */
	override assign(v: number): void {
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
		super(x.domain());
		this.#orig = x;
		this.setName(x.name());
		this.assign(x.value());
	}

	override assign(v: number): void {
		this.#orig.assign(v);
	}

	override domain(): Domain;

	override domain(d: Domain): void;

	override domain(d?: Domain): Domain | void {
		if (d === undefined) {
			return this.#orig.domain();
		} else {
			this.#orig.domain(d);
		}
	}

	override value(): number {
		return this.#orig.value();
	}

}
