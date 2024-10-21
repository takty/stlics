import { Problem } from '../../problem/problem';
import { CrispProblem } from '../../problem/problem-crisp';
import { ObservableVariable } from '../../problem/variables';
import { Solver } from '../../solver/solver';
import { Model } from '../../_model/model';
import { SolverFactory } from '../../solver/solver-factory';
import { N_queens } from '../../_model/n-queens.js';

onmessage = async e => {
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

let m: N_queens|null = null;
let p: Problem|null = null;

function create(num: number) {
	m = new N_queens(num);
	m.setDebugOutput(log);

	const obs = (v, val) => board(val - 1, v.index());

	p = new CrispProblem();
	p.setVariableFactory((o, d) => new ObservableVariable(o, d, obs));
	p = m.createProblem(p);
}

async function solve(type: string, targetRate: number): Promise<void> {
	const t  = Date.now();  // Start time measurement
	const sn = SolverFactory.crispSolverNames()[type];

	const s = await SolverFactory.createSolver(sn, p as Problem) as Solver;
	s.setTargetRate(targetRate);
	s.setDebugOutput(log);

	const result = s.solve();
	const time   = Date.now() - t;  // Stop time measurement
	const rate   = (p as CrispProblem).satisfiedConstraintRate();

	(m as N_queens).printResult(p as Problem);
	postMessage({ result, time, rate, solver: s.name() });
}

function log(e) {
	postMessage({ log: e });
}

function board(x, y) {
	postMessage({ board: { x, y } });
}
