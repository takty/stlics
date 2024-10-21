/**
 * Class of post-stabilization.
 *
 * @author Takuto Yanagida
 * @version 2024-10-21
 */

import { Problem } from '../../problem/problem';
import { Variable } from '../../problem/variable';
import { Assignment } from '../../util/assignment';
import { AssignmentList } from '../../util/assignment-list';

export class PostStabilization {

	static apply(p: Problem, orig: AssignmentList): boolean {
		console.log('start post-stabilization');

		let stabilized: boolean;
		let count: number = 0;

		do {
			console.log('post-stabilization: count ' + count++);

			stabilized = false;
			let C_min: number = p.worstSatisfactionDegree();

			const xs: Variable[] = p.variables();
			for (let i: number = 0; i < xs.length; ++i) {
				const x: Variable = xs[i];
				const org: number = x.value();

				const a: Assignment = orig.at(i);
				if (org === a.value()) continue;

				a.apply();  // Try to assign the original.
				if (p.worstSatisfactionDegree() >= C_min) {
					stabilized = true;
				} else {
					x.assign(org);  // Restore.
				}
			}
		} while (stabilized);

		console.log('finish post-stabilization');
		return true;
	}

}
