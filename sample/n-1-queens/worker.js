import { Problem }       from '../../src/problem/problem.js';
import { N_1_queens }    from '../../src/model/n-1-queens.js';
import { SolverFactory } from '../../src/solver/solver-factory.js';

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
	p = m.createProblem(new Problem());
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
