import { Problem } from '../../problem/problem';
import { Solver } from '../../solver/solver';
import { SolverFactory } from '../../solver/solver-factory';
import { RandomBinary } from '../../_model/random-binary';

const COUNT = 1;  // Interaction count
const VAR_NUM = 10;  // Number of variables
const DENSITY = 0.5;
const AVE_TIGHTNESS = 0.5;

document.addEventListener('DOMContentLoaded', async () => {
	const output = document.getElementById('output') as HTMLOutputElement;
	const log = e => output.value += `${e}\n`;

	const sn = SolverFactory.fuzzySolverNames()[1];

	let sum_time = 0;
	let sum_deg = 0;

	for (let i = 0; i < COUNT; ++i) {
		const rp = new RandomBinary(VAR_NUM, DENSITY, AVE_TIGHTNESS);
		const p = rp.createProblem(new Problem());
		const t = Date.now();  // Start time measurement

		const s = await SolverFactory.createSolver(sn, p) as Solver;
		// s.setTargetRate(null);
		s.setTimeLimit(10000);
		s.setDebugOutput(log);
		const res = s.solve();

		const ct = Date.now() - t;  // Stop time measurement
		const cd = p.worstSatisfactionDegree();
		log(`solver: ${s.name()}   ${res ? 'success' : 'failure'}`);
		log(`trial: ${i + 1}   time: ${ct}   degree: ${cd}`);
		sum_time += ct;
		sum_deg += cd;
	}
	log(`average time: ${sum_time / COUNT}   average degree: ${sum_deg / COUNT}`);
});
