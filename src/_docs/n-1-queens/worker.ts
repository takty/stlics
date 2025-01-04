import { Problem, Variable, ObservableVariable, Domain, Solver, SolverFactory, Monitor } from '../../../stlics.ts';
import { N_1_queens } from '../../_model/n-1-queens';

onmessage = async (e: MessageEvent<any>): Promise<void> => {
	const { task, args } = e.data;
	switch (task) {
		case 'create':
			create(...(args as [number]));
			break;
		case 'solve':
			solve(...(args as [string, number, number, boolean]));
			break;
	}
};

let m: N_1_queens | null = null;
let p: Problem | null    = null;

let pm: boolean = false;

function create(num: number): void {
	m = new N_1_queens(num);
	m.setDebugOutput(log);

	const obs: (x: Variable, v: number) => void = (x: Variable, v: number): void => board(v - 1, x.index());

	p = new Problem();
	p.setVariableFactory((o: Problem, d: Domain): ObservableVariable => new ObservableVariable(o, d, obs));
	p = m.createProblem(p);
}

async function solve(type: string, target: number, timeLimit: number, debug: boolean): Promise<void> {
	const t : number = Date.now();  // Start time measurement
	const sn: string = SolverFactory.fuzzySolverNames()[type];

	const mon = new Monitor();
	mon.setTarget(target === -1 ? null : target);
	mon.setTimeLimit(timeLimit === -1 ? null : timeLimit);
	mon.setDebugOutput(log);
	mon.setDebugMode(debug);

	const s = await SolverFactory.createSolver(sn) as Solver;

	pm = debug;
	const res : boolean = s.solve(p as Problem, mon);
	const time: number  = Date.now() - t;  // Stop time measurement
	const ev  : number  = (p as Problem).degree();
	pm = true;

	(m as N_1_queens).printResult(p as Problem);
	for (const x of (p as Problem).variables()) x.assign(x.value());
	postMessage({ result: res, time, ev, solver: s.name() });
}

function log(e: any): void {
	if (pm) postMessage({ log: e });
}

function board(x: number, y: number): void {
	if (pm) postMessage({ board: { x, y } });
}
