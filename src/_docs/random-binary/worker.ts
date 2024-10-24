import { Problem, Solver, SolverFactory } from '../../../stlics.ts';
import { RandomBinary } from '../../_model/random-binary';

onmessage = async (e: MessageEvent<any>): Promise<void> => {
	const { task, args } = e.data;
	switch (task) {
		case 'create':
			create(...(args as [number, number, number]));
			break;
		case 'solve':
			solve(...(args as [string, number]));
			break;
	}
};

let m: RandomBinary | null = null;
let p: Problem | null = null;

function create(varNum: number, density: number, aveTightness: number): void {
	m = new RandomBinary(varNum, density, aveTightness);
	m.setDebugOutput(log);
	p = m.createProblem(new Problem());
}

async function solve(type: string, targetRate: number): Promise<void> {
	const t: number = Date.now();  // Start time measurement
	const sn: string = SolverFactory.fuzzySolverNames()[type];

	const s = await SolverFactory.createSolver(sn, p as Problem) as Solver;
	s.setTargetRate(targetRate);
	s.setDebugOutput(log);

	const result: boolean = s.solve();
	const time: number = Date.now() - t;  // Stop time measurement
	const deg: number = (p as Problem).worstSatisfactionDegree();

	postMessage({ result, time, deg, solver: s.name() });
}

function log(e: any): void {
	postMessage({ log: e });
}
