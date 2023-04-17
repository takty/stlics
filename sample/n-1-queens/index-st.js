import { Problem }       from '../../src/problem/problem.js';
import { N_1_queens }    from '../../src/model/n-1-queens.js';
import { SolverFactory } from '../../src/solver/solver-factory.js';

import { createLogOutput } from './util.js';

const COUNT       = 1;   // Interaction count
const QUEEN_NUM   = 20;  // Number of queens
const SOLVER_TYPE = 4;

document.addEventListener('DOMContentLoaded', async () => {
	const log = createLogOutput();
	const sn  = SolverFactory.fuzzySolverNames()[SOLVER_TYPE];

	let sum_time = 0;
	let sum_deg  = 0;

	for (let i = 0; i < COUNT; ++i) {
		const nq = new N_1_queens(QUEEN_NUM);
		const p  = nq.createProblem(new Problem());
		const t  = Date.now();  // Start time measurement

		const s = await SolverFactory.createSolver(sn, p);
		// s.setTargetRate(null);
		s.setTimeLimit(10000);
		s.setDebugOutput(log);
		const result = s.solve();

		const time = Date.now() - t;  // Stop time measurement
		const deg  = p.worstSatisfactionDegree();
		log(`solver: ${s.name()}   ${result ? 'success' : 'failure'}`);
		log(`trial: ${i + 1}   time: ${time}   degree: ${deg}`);
		nq.setDebugOutput(log);
		nq.printResult(p);
		sum_time += time;
		sum_deg  += deg;
	}
	log(`average time: ${sum_time / COUNT}   average degree: ${sum_deg / COUNT}`);
});
