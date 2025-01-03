import { Problem, Variable, ObservableVariable, Domain, Solver, SolverFactory, Monitor } from '../../../stlics.ts';
import { N_1_queens } from '../../_model/n-1-queens';

onmessage = async (e: MessageEvent<any>): Promise<void> => {
	const { task, args } = e.data;
	switch (task) {
		case 'create':
			create(...(args as [number]));
			break;
		case 'solve':
			solve(...(args as [string, number]));
			break;
	}
};

let m: N_1_queens | null = null;
let p: Problem | null    = null;

function create(num: number): void {
	m = new N_1_queens(num);
	m.setDebugOutput(log);

	const obs: (x: Variable, v: number) => void = (x: Variable, v: number): void => board(v - 1, x.index());

	p = new Problem();
	p.setVariableFactory((o: Problem, d: Domain): ObservableVariable => new ObservableVariable(o, d, obs));
	p = m.createProblem(p);
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
	const ev  : number  = (p as Problem).degree();

	(m as N_1_queens).printResult(p as Problem);
	postMessage({ result: res, time, ev, solver: s.name() });
}

function log(e: any): void {
	postMessage({ log: e });
}

function board(x: number, y: number): void {
	postMessage({ board: { x, y } });
}
