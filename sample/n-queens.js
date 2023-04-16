import { CrispProblem } from '../src/problem/_problem-crisp.js';
import { N_queens } from '../src/model/_n-queens.js';

import { ForwardChecking } from '../src/solver/crisp/_forward-checking.js';
import { MaxForwardChecking } from '../src/solver/crisp/_max-forward-checking.js';
import { LocalChanges } from '../src/solver/crisp/_local-changes.js';
import { LocalChangesEx } from '../src/solver/crisp/_local-changes-ex.js';
import { Breakout } from '../src/solver/crisp/_breakout.js';
import { GENET } from '../src/solver/crisp/_genet.js';
import { CrispSRS3 } from '../src/solver/crisp/_crisp-srs3.js';

const COUNT     = 1;  // Interaction count
const QUEEN_NUM = 20;  // Number of queens

function main() {
	let sum_time = 0;
	let sum_rate = 0;

	for (let i = 0; i < COUNT; ++i) {
		const nq = new N_queens(QUEEN_NUM);
		const p  = nq.createProblem(new CrispProblem());
		const t  = Date.now();  // Start time measurement

		// const s = new ForwardChecking(p);
		// const s = new MaxForwardChecking(p);
		// const s = new LocalChanges(p);
		// const s = new LocalChangesEx(p);
		// const s = new Breakout(p);
		// const s = new GENET(p);
		const s = new CrispSRS3(p);
		// s.setTargetRate(null);
		s.setTimeLimit(10000);
		const res = s.solve();

		const ct = Date.now() - t;  // Stop time measurement
		const cr = p.satisfiedConstraintRate();
		console.log(`solver: ${s.name()}   ${res ? 'success' : 'failure'}`);
		console.log(`time: ${ct}   rate: ${cr}`);
		nq.printResult(p);
		sum_time += ct;
		sum_rate += cr;
	}
	console.log(`average time: ${sum_time / COUNT}   average rate: ${sum_rate / COUNT}`);
}
main();
