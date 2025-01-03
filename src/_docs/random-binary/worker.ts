import { Problem, Solver, SolverFactory, Monitor } from '../../../stlics.ts';
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
let p: Problem | null      = null;

function create(varNum: number, density: number, aveTightness: number): void {
	m = new RandomBinary(varNum, density, aveTightness);
	m.setDebugOutput(log);
	p = m.createProblem(new Problem());
}

async function solve(type: string, target: number): Promise<void> {
	const t : number = Date.now();  // Start time measurement
	const sn: string = SolverFactory.fuzzySolverNames()[type];

	const mon = new Monitor();
	mon.setTimeLimit(5000);
	mon.setTarget(target);
	mon.setDebugOutput(log);
	mon.setDebugMode(true);

	const s = await SolverFactory.createSolver(sn) as Solver;

	const res : boolean = s.solve(p as Problem, mon);
	const time: number  = Date.now() - t;  // Stop time measurement
	const deg : number  = (p as Problem).degree();

	postMessage({ result: res, time, deg, solver: s.name() });
}

function log(e: any): void {
	postMessage({ log: e });
}
