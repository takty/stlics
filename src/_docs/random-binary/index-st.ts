import { Problem, Solver, SolverFactory } from '../../../stlics.ts';
import { RandomBinary } from '../../_model/random-binary';

const COUNT = 1;  // Interaction count
const VAR_NUM = 10;  // Number of variables
const DENSITY = 0.5;
const AVE_TIGHTNESS = 0.5;

document.addEventListener('DOMContentLoaded', async (): Promise<void> => {
	const output = document.getElementById('output') as HTMLOutputElement;
	const log: (e: any) => string = (e: any): string => output.value += `${e}\n`;
	const sn: string = SolverFactory.fuzzySolverNames()[1];

	let sum_time: number = 0;
	let sum_deg: number = 0;

	for (let i: number = 0; i < COUNT; ++i) {
		const rp = new RandomBinary(VAR_NUM, DENSITY, AVE_TIGHTNESS);
		const p: Problem = rp.createProblem(new Problem());
		const t: number = Date.now();  // Start time measurement

		const s = await SolverFactory.createSolver(sn, p) as Solver;
		// s.setTargetRate(null);
		s.setTimeLimit(10000);
		s.setDebugOutput(log);
		const res: boolean = s.solve();

		const ct: number = Date.now() - t;  // Stop time measurement
		const cd: number = p.worstSatisfactionDegree();
		log(`solver: ${s.name()}   ${res ? 'success' : 'failure'}`);
		log(`trial: ${i + 1}   time: ${ct}   degree: ${cd}`);
		sum_time += ct;
		sum_deg += cd;
	}
	log(`average time: ${sum_time / COUNT}   average degree: ${sum_deg / COUNT}`);
});
