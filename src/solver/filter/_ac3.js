/**
 * The class implements AC-3, one of the arc consistency algorithms.
 *
 * @author Takuto Yanagida
 * @version 2023-04-10
 */

export class AC3 {

	static #checkConsistency(c, v_j) {
		for (const val of v_j.domain()) {  // Is there a partner that satisfies the constraint?
			v_j.assign(val);

			if (c.isSatisfied() === 1) {  // It exists!
				return true;  // Current assignment of v_i is consistent.
			}
		}
		return false;
	}

	static #reviseDomain(p, v_i, v_j) {
		const val_i = v_i.value();
		const val_j = v_j.value();  // Save the value.
		const d_i   = v_i.domain();
		const temp  = [];

		const cs = p.constraintsBetween(v_i, v_j);

		vals: for (const val of d_i) {
			v_i.assign(val);

			for (const c of cs) {
				if (c.size() !== 2) continue;  // Check the next constraint
				if (!AC3.#checkConsistency(c, v_j)) continue vals;   // Since there is no partner satisfying the constraint, check the next value.
			}
			temp.push(val);
		}
		v_i.assign(val_i);  // Restore the value.
		v_j.assign(val_j);  // Restore the value.

		if (temp.length !== d_i.size()) {
			const nd = p.createDomain({ values: temp });
			v_i.setDomain(nd);
			console.log(d_i.size() + ' -> ' + nd.size());
			return true;
		}
		return false;
	}

	static apply(p) {
		const cs = [];

		for (const c of p.constraints()) {
			if (c.size() === 2) cs.add(c);
		}
		while (!cs.isEmpty()) {
			const c   = cs.remove(cs.size() - 1);
			const v_k = c.at(0);
			const v_m = c.at(1);

			if (AC3.#reviseDomain(p, v_k, v_m)) {
				for (const c1 of p.constraints()) {
					if (c1.size() === 2 && c1.at(1) === v_k && c1.at(0) !== v_m) {
						cs.add(0, c1);
					}
				}
			}
		}
	}

}
