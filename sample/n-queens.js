import { CrispProblem } from '../src/problem/problem-crisp.js';
import { N_queens } from '../src/model/n-queens.js';
import { SolverFactory } from '../src/solver/solver-factory.js';

const COUNT     = 1;   // Interaction count
const QUEEN_NUM = 20;  // Number of queens

document.addEventListener('DOMContentLoaded', async () => {
	const output = document.getElementById('output');
	const log    = e => output.value += `${e}\n`;

	const sn = SolverFactory.crispSolverNames()[6];

	let sum_time = 0;
	let sum_rate = 0;

	for (let i = 0; i < COUNT; ++i) {
		const nq = new N_queens(QUEEN_NUM);
		const p  = nq.createProblem(new CrispProblem());
		const t  = Date.now();  // Start time measurement

		const s = await SolverFactory.createSolver(sn, p);
		// s.setTargetRate(null);
		s.setTimeLimit(10000);
		s.setDebugOutput(log);
		const res = s.solve();

		const ct = Date.now() - t;  // Stop time measurement
		const cr = p.satisfiedConstraintRate();
		log(`solver: ${s.name()}   ${res ? 'success' : 'failure'}`);
		log(`trial: ${i + 1}   time: ${ct}   rate: ${cr}`);
		nq.setDebugOutput(log);
		nq.printResult(p);
		sum_time += ct;
		sum_rate += cr;
	}
	log(`average time: ${sum_time / COUNT}   average rate: ${sum_rate / COUNT}`);
});
