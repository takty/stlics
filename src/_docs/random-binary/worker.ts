import { Problem } from '../../problem/problem';
import { Solver } from '../../solver/solver';
import { Model } from '../../_model/model';
import { SolverFactory } from '../../solver/solver-factory';
import { RandomBinary }  from '../../_model/random-binary';

onmessage = async e => {
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

let m: Model|null = null;
let p: Problem|null = null;

function create(varNum: number, density: number, aveTightness: number): void {
	m = new RandomBinary(varNum, density, aveTightness);
	m.setDebugOutput(log);
	p = m.createProblem(new Problem());
}

async function solve(type: string, targetRate: number): Promise<void> {
	const t  = Date.now();  // Start time measurement
	const sn = SolverFactory.fuzzySolverNames()[type];

	const s = await SolverFactory.createSolver(sn, p as Problem) as Solver;
	s.setTargetRate(targetRate);
	s.setDebugOutput(log);

	const result = s.solve();
	const time   = Date.now() - t;  // Stop time measurement
	const deg    = (p as Problem).worstSatisfactionDegree();

	postMessage({ result, time, deg, solver: s.name() });
}

function log(e) {
	postMessage({ log: e });
}
