/**
 * The class implements AC-3, one of the arc consistency algorithms.
 *
 * @author Takuto Yanagida
 * @version 2025-01-18
 */

import { Problem } from '../../problem/problem';
import { Variable } from '../../problem/variable';
import { Constraint } from '../../problem/constraint';
import { Domain } from '../../problem/domain';

export class AC3 {

	static #checkConsistency(c: Constraint, x_j: Variable): boolean {
		for (const v of x_j.domain()) {  // Is there a partner that satisfies the constraint?
			x_j.assign(v);

			if (c.isSatisfied() === 1) {  // It exists!
				return true;  // Current assignment of v_i is consistent.
			}
		}
		return false;
	}

	static #reviseDomain(p: Problem, x_i: Variable, x_j: Variable): boolean {
		const v_i: number = x_i.value();
		const v_j: number = x_j.value();  // Save the value.
		const d_i: Domain = x_i.domain();
		const vs : number[] = [];

		const cs: Constraint[] = p.constraintsBetween(x_i, x_j);

		vs: for (const v of d_i) {
			x_i.assign(v);

			for (const c of cs) {
				if (c.size() !== 2) continue;  // Check the next constraint
				if (!AC3.#checkConsistency(c, x_j)) continue vs;   // Since there is no partner satisfying the constraint, check the next value.
			}
			vs.push(v);
		}
		x_i.assign(v_i);  // Restore the value.
		x_j.assign(v_j);  // Restore the value.

		if (vs.length !== d_i.size()) {
			const nd = p.createDomain(vs) as Domain;
			x_i.domain(nd);
			console.log(d_i.size() + ' -> ' + nd.size());
			return true;
		}
		return false;
	}

	static apply(p: Problem): void {
		const cs: Constraint[] = [];

		for (const c of p.constraints()) {
			if (c.size() === 2) cs.push(c);
		}
		while (cs.length) {
			const c = cs.pop() as Constraint;
			const v_k = c.at(0) as Variable;
			const v_m = c.at(1) as Variable;

			if (AC3.#reviseDomain(p, v_k, v_m)) {
				for (const c1 of p.constraints()) {
					if (c1.size() === 2 && c1.at(1) === v_k && c1.at(0) !== v_m) {
						cs.unshift(c1);
					}
				}
			}
		}
	}

}
