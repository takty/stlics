import { Problem, Solver, SolverFactory, Monitor } from '../../../stlics.ts';
import { RandomBinary } from '../../_model/random-binary';

const COUNT         = 1;  // Interaction count
const VAR_NUM       = 10;  // Number of variables
const DENSITY       = 0.5;
const AVE_TIGHTNESS = 0.5;

document.addEventListener('DOMContentLoaded', async (): Promise<void> => {
	const output = document.getElementById('output') as HTMLOutputElement;
	const log: (e: any) => string = (e: any): string => output.value += `${e}\n`;
	const sn: string = SolverFactory.fuzzySolverNames()[1];

	let sumTime: number = 0;
	let sumEv  : number = 0;

	for (let i: number = 0; i < COUNT; ++i) {
		const rp         = new RandomBinary(VAR_NUM, DENSITY, AVE_TIGHTNESS);
		const p: Problem = rp.createProblem(new Problem());
		const t: number  = Date.now();  // Start time measurement

		const mon = new Monitor();
		mon.setTimeLimit(5000);
		mon.setTarget(0.8);
		mon.setDebugOutput(log);
		mon.setDebugMode(true);

		const s = await SolverFactory.createSolver(sn) as Solver;

		const res : boolean = s.solve(p, mon);
		const time: number  = Date.now() - t;  // Stop time measurement
		const ev  : number  = p.degree();

		log(`Solver: ${s.name()}    ${res ? 'Success' : 'Failure'}`);
		log(`Trial: ${i + 1}    time: ${time}    degree: ${ev}`);
		sumTime += time;
		sumEv   += ev;
	}
	log(`average time: ${sumTime / COUNT}   average degree: ${sumEv / COUNT}`);
});
