import { Problem, ObservableVariable, SolverFactory } from '../../dist/stlics.esm.js';
import { N_1_queens } from '../../src/model/n-1-queens.js';

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
	m = new N_1_queens(num);
	m.setDebugOutput(log);

	const obs = (v, val) => board(val - 1, v.index());

	p = new Problem();
	p.setVariableFactory((o, d) => new ObservableVariable(o, d, obs));
	p = m.createProblem(p);
}

async function solve(type, targetRate) {
	const t  = Date.now();  // Start time measurement
	const sn = SolverFactory.fuzzySolverNames()[type];

	const s = await SolverFactory.createSolver(sn, p);
	s.setTargetRate(targetRate);
	s.setDebugOutput(log);

	const result = s.solve();
	const time   = Date.now() - t;  // Stop time measurement
	const deg    = p.worstSatisfactionDegree();

	m.printResult(p);
	postMessage({ result, time, deg, solver: s.name() });
}

function log(e) {
	postMessage({ log: e });
}

function board(x, y) {
	postMessage({ board: { x, y } });
}
