import { CrispProblem, ObservableVariable, SolverFactory } from '../../../dist/stlics.esm.js';
import { N_queens } from '../../_model/n-queens.js';

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
