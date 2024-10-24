/**
 * Utility class that performs node consistency.
 *
 * @author Takuto Yanagida
 * @version 2024-10-21
 */

import { Problem } from '../../problem/problem';
import { CrispProblem } from '../../problem/problem-crisp';
import { Domain } from '../../problem/domain';

export class NodeConsistency {

	/**
	 * Guarantees consistency of fuzzy unary constraints. The domain of each variable is replaced as needed.
	 * Deletes elements from domains that do not meet the specified worst satisfaction degree.
	 * @param p A problem.
	 * @param threshold Worst satisfaction degree.
	 * @return True if there is no empty domain.
	 */
	static applyToProblem(p: Problem, threshold: number): boolean {
		for (const x of p.variables()) {
			const d: Domain = x.domain();
			const origV: number = x.value();  // Save the value.
			const elms: number[] = [];

			for (const c of x) {
				if (c.size() !== 1) continue;

				for (const v of d) {
					x.assign(v);

					if (c.satisfactionDegree() >= threshold) {
						elms.push(v);
					}
				}
				p.removeConstraint(c);
			}
			x.assign(origV);  // Restore the value.
			if (elms.length === 0) {
				return false;
			}
			x.domain(p.createDomain({ values: elms }) as Domain);
		}
		return true;
	}

	/**
	 * Guarantees consistency of crisp unary constraints. The domain of each variable is replaced as needed.
	 * It cannot be applied to crisp views of fuzzy constraint satisfaction problems because it changes the structure of the constraint graph.
	 * @param p A crisp problem.
	 * @return True if there is no empty domain.
	 */
	static applyToCrispProblem(p: CrispProblem) {
		for (const x of p.variables()) {
			const d: Domain = x.domain();
			const origV: number = x.value();  // Save the value.
			const elms: number[] = [];

			for (const c of x) {
				if (c.size() !== 1) continue;

				for (const v of d) {
					x.assign(v);

					if (c.isSatisfied() === 1) {
						elms.push(v);
					}
				}
				p.removeConstraint(c);
			}
			x.assign(origV);  // Restore the value.
			if (elms.length === 0) {
				return false;
			}
			x.domain(p.createDomain({ values: elms }) as Domain);
		}
		return true;
	}

}