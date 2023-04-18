import { CrispProblem }       from '../../src/problem/problem-crisp.js';
import { N_queens }           from '../../src/model/n-queens.js';
import { SolverFactory }      from '../../src/solver/solver-factory.js';
import { ObservableVariable } from '../../src/problem/observable-variable.js';

onmessage = async e => {
	const { task, args } = e.data;
	switch (task) {
		case 'create':
			create(...args);
			break;
		case 'solve':
			solve(...args);
			break;
	}
};

let m = null;
let p = null;

function create(num) {
	m = new N_queens(num);
	m.setDebugOutput(log);

	const obs = (v, val) => board(val - 1, v.index());

	p = new CrispProblem();
	p.setVariableFactory((o, d) => new ObservableVariable(o, d, obs));
	p = m.createProblem(p);
}

async function solve(type, targetRate) {
	const t  = Date.now();  // Start time measurement
	const sn = SolverFactory.crispSolverNames()[type];

	const s = await SolverFactory.createSolver(sn, p);
	s.setTargetRate(targetRate);
	s.setDebugOutput(log);

	const result = s.solve();
	const time   = Date.now() - t;  // Stop time measurement
	const rate   = p.satisfiedConstraintRate();

	m.printResult(p);
	postMessage({ result, time, rate, solver: s.name() });
}

function log(e) {
	postMessage({ log: e });
}

function board(x, y) {
	postMessage({ board: { x, y } });
}
