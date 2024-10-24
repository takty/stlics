import { Problem, Variable, ObservableVariable, Domain, Solver, SolverFactory } from '../../../stlics.ts';
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
let p: Problem | null = null;

function create(num: number): void {
	m = new N_1_queens(num);
	m.setDebugOutput(log);

	const obs: (x: Variable, v: number) => void = (x: Variable, v: number): void => board(v - 1, x.index());

	p = new Problem();
	p.setVariableFactory((o: Problem, d: Domain): ObservableVariable => new ObservableVariable(o, d, obs));
	p = m.createProblem(p);
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

	(m as N_1_queens).printResult(p as Problem);
	postMessage({ result, time, deg, solver: s.name() });
}

function log(e: any): void {
	postMessage({ log: e });
}

function board(x: number, y: number): void {
	postMessage({ board: { x, y } });
}
