/**
 * Class of post-stabilization.
 *
 * @author Takuto Yanagida
 * @version 2025-01-03
 */

import { Problem } from '../../problem/problem';
import { Variable } from '../../problem/variable';
import { Assignment } from '../misc/assignment';
import { AssignmentList } from '../misc/assignment-list';
import { Solver } from '../solver';

/**
 * Apply post-stabilization.
 *
 * @param p    Problem.
 * @param orig Original assignment list.
 * @param log  Log function.
 */
export function applyPostStabilization(p: Problem, orig: AssignmentList, log: (e: string) => void = (e: string): void => console.log(e)): boolean {
	log('Start Post-Stabilization');

	let stabilized: boolean;
	let count: number = 0;

	do {
		log('\tPost-Stabilization: count ' + count++);

		stabilized = false;
		let ev_min: number = p.degree();

		const xs: Variable[] = p.variables();
		for (let i: number = 0; i < xs.length; ++i) {
			const x: Variable = xs[i];
			const v: number   = x.value();

			const a: Assignment = orig.at(i);
			if (v === a.value()) {
				continue;
			}
			a.apply();  // Try to assign the original.
			if (ev_min <= p.degree()) {
				stabilized = true;
			} else {
				x.assign(v);  // Restore.
			}
		}
	} while (stabilized);

	log('Finish Post-Stabilization');
	return stabilized;
}

/**
 * Wrap the solver with post-stabilizer.
 *
 * @param solver Solver.
 * @return Wrapped solver.
 */
export function wrapWithPostStabilizer(solver: Solver): Solver {
	return new PostStabilizerWrapper(solver);
}

/**
 * Class of post-stabilizer wrapper.
 */
export class PostStabilizerWrapper extends Solver {

	#solver: Solver;

	constructor(solver: Solver) {
		super();
		this.#solver = solver;
	}

	/**
	 * {@override}
	 */
	name(): string {
		return this.#solver.name() + ' + PF';
	}

	/**
	 * {@override}
	 */
	protected exec(): boolean {
		let ev : number = 0;
		let evs: number = 0;
		if (this.monitor.isDebugMode()) {
			ev  = this.pro.isFuzzy() ? this.pro.degree() : this.pro.ratio();
			evs = this.pro.emptyVariableSize();
		}
		const orig = new AssignmentList();
		orig.setProblem(this.pro);

		const res: boolean = this.#solver.solve(this.pro, this.monitor);
		if (res) {
			applyPostStabilization(this.pro, orig, this.monitor.outputDebugString.bind(this.monitor));
		}
		this.monitor.outputDebugString(`Solver result: ${res ? 'Success' : 'Failure'}`);
		this.monitor.outputDebugString(`Evaluation: ${ev} -> ${this.pro.isFuzzy() ? this.pro.degree() : this.pro.ratio()}`);
		this.monitor.outputDebugString(`Empty variable size: ${evs} -> ${this.pro.emptyVariableSize()}`);
		return res;
	}

}
