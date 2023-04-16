/**
 * Utility class that performs node consistency.
 *
 * @author Takuto Yanagida
 * @version 2023-04-11
 */

export class NodeConsistency {

	/**
	 * Guarantees consistency of fuzzy unary constraints. The domain of each variable is replaced as needed.
	 * Deletes elements from domains that do not meet the specified worst satisfaction degree.
	 * @param p A problem.
	 * @param threshold Worst satisfaction degree.
	 * @return True if there is no empty domain.
	 */
	static apply(p, threshold) {
		for (const v of p.variables()) {
			const d       = v.domain();
			const origVal = v.value();  // Save the value.
			const elms    = [];

			for (const c of v) {
				if (c.size() !== 1) continue;

				for (const val of d) {
					v.assign(val);

					if (c.satisfactionDegree() >= threshold) {
						elms.push(val);
					}
				}
				p.removeConstraint(c);
			}
			v.assign(origVal);  // Restore the value.
			if (elms.length === 0) {
				return false;
			}
			v.setDomain(p.createDomain({ values: elms }));
		}
		return true;
	}

	/**
	 * Guarantees consistency of crisp unary constraints. The domain of each variable is replaced as needed.
	 * It cannot be applied to crisp views of fuzzy constraint satisfaction problems because it changes the structure of the constraint graph.
	 * @param p A crisp problem.
	 * @return True if there is no empty domain.
	 */
	static apply(p) {
		for (const v of p.variables()) {
			const d       = v.domain();
			const origVal = v.value();  // Save the value.
			const elms    = [];

			for (const c of v) {
				if (c.size() !== 1) continue;

				for (const val of d) {
					v.assign(val);

					if (c.isSatisfied() === 1) {
						elms.push(val);
					}
				}
				p.removeConstraint(c);
			}
			v.assign(origVal);  // Restore the value.
			if (elms.length === 0) {
				return false;
			}
			v.setDomain(p.createDomain({ values: elms }));
		}
		return true;
	}

}
