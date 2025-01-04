import { Problem, Solver, SolverFactory, Monitor } from '../../../stlics.ts';
import { N_queens } from '../../_model/n-queens';
import { createLogOutput } from '../util';

const COUNT       = 1;   // Interaction count
const QUEEN_NUM   = 20;  // Number of queens
const SOLVER_TYPE = 4;

document.addEventListener('DOMContentLoaded', async (): Promise<void> => {
	const log: (e: any) => void = createLogOutput();
	const sn: string = SolverFactory.crispSolverNames()[SOLVER_TYPE];

	let sumTime: number = 0;
	let sumEv  : number = 0;

	for (let i: number = 0; i < COUNT; ++i) {
		const nq         = new N_queens(QUEEN_NUM);
		const p: Problem = nq.createProblem(new Problem());
		const t: number  = Date.now();  // Start time measurement

		const mon = new Monitor();
		mon.setTimeLimit(5000);
		mon.setTarget(1);
		mon.setDebugOutput(log);
		mon.setDebugMode(true);

		const s = await SolverFactory.createSolver(sn) as Solver;

		const res : boolean = s.solve(p, mon);
		const time: number  = Date.now() - t;  // Stop time measurement
		const ev  : number  = p.ratio();

		log(`Solver: ${s.name()}    ${res ? 'Success' : 'Failure'}`);
		log(`Trial: ${i + 1}    time: ${time}    rate: ${ev}`);
		nq.setDebugOutput(log);
		nq.printResult(p);
		sumTime += time;
		sumEv   += ev;
	}
	log(`Avg. time: ${sumTime / COUNT}   Avg. rate: ${sumEv / COUNT}`);
});
