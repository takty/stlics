/**
 * Class of post-stabilization.
 *
 * @author Takuto Yanagida
 * @version 2023-03-26
 */

class PostStabilization {

	static apply(p, orig) {
		console.log('start post-stabilization');

		let stabilized;
		let count = 0;

		do {
			console.log('post-stabilization: count ' + count++);

			stabilized = false;
			let C_min = p.worstSatisfactionDegree();

			for (let i = 0; i < p.variableSize(); ++i) {
				const v = p.variableAt(i);
				const org = v.value();

				const a = orig.get(i);
				if (org === a.value()) continue;

				a.apply();  // Try to assign the original.
				if (p.worstSatisfactionDegree() >= C_min) {
					stabilized = true;
				} else {
					v.assign(org);  // Restore.
				}
			}
		} while (stabilized);

		console.log('finish post-stabilization');
		return true;
	}

}
