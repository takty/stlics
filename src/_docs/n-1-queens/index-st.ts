import { Problem, Solver, SolverFactory } from '../../../stlics.ts';
import { N_1_queens } from '../../_model/n-1-queens';
import { createLogOutput } from '../util';

const COUNT = 1;   // Interaction count
const QUEEN_NUM = 20;  // Number of queens
const SOLVER_TYPE = 4;

document.addEventListener('DOMContentLoaded', async (): Promise<void> => {
	const log: (e: any) => void = createLogOutput();
	const sn: string = SolverFactory.fuzzySolverNames()[SOLVER_TYPE];

	let sum_time: number = 0;
	let sum_deg: number = 0;

	for (let i: number = 0; i < COUNT; ++i) {
		const nq = new N_1_queens(QUEEN_NUM);
		const p: Problem = nq.createProblem(new Problem());
		const t: number = Date.now();  // Start time measurement

		const s = await SolverFactory.createSolver(sn, p) as Solver;
		// s.setTargetRate(null);
		s.setTimeLimit(10000);
		s.setDebugOutput(log);
		const result: boolean = s.solve();

		const time: number = Date.now() - t;  // Stop time measurement
		const deg: number = p.worstSatisfactionDegree();
		log(`solver: ${s.name()}   ${result ? 'success' : 'failure'}`);
		log(`trial: ${i + 1}   time: ${time}   degree: ${deg}`);
		nq.setDebugOutput(log);
		nq.printResult(p);
		sum_time += time;
		sum_deg += deg;
	}
	log(`average time: ${sum_time / COUNT}   average degree: ${sum_deg / COUNT}`);
});
