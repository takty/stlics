import { Problem, Solver, SolverFactory, Monitor } from '../../../stlics.ts';
import { N_queens } from '../../_model/n-queens';
import { createLogOutput } from '../util';

const COUNT = 1;   // Interaction count
const QUEEN_NUM = 20;  // Number of queens
const SOLVER_TYPE = 4;

document.addEventListener('DOMContentLoaded', async (): Promise<void> => {
	const log: (e: any) => void = createLogOutput();
	const sn: string = SolverFactory.crispSolverNames()[SOLVER_TYPE];

	let sum_time: number = 0;
	let sum_rate: number = 0;

	for (let i: number = 0; i < COUNT; ++i) {
		const nq = new N_queens(QUEEN_NUM);
		const p: Problem = nq.createProblem(new Problem());
		const t: number = Date.now();  // Start time measurement

		const mon = new Monitor();
		mon.setTimeLimit(5000);
		mon.setTarget(1);
		mon.setDebugOutput(log);
		mon.setDebugMode(true);

		const s = await SolverFactory.createSolver(sn, p) as Solver;
		s.setMonitor(mon);

		const res : boolean = s.solve();
		const time: number  = Date.now() - t;  // Stop time measurement
		const rate: number  = p.ratio();

		log(`solver: ${s.name()}   ${res ? 'success' : 'failure'}`);
		log(`trial: ${i + 1}   time: ${time}   rate: ${rate}`);
		nq.setDebugOutput(log);
		nq.printResult(p);
		sum_time += time;
		sum_rate += rate;
	}
	log(`average time: ${sum_time / COUNT}   average rate: ${sum_rate / COUNT}`);
});
