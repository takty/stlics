import { Problem } from '../src/problem/_problem.js';
import { N_1_queens } from '../src/model/_n-1-queens.js';

import { FuzzyForwardChecking } from '../src/solver/fuzzy/_fuzzy-forward-checking.js';
import { FuzzyForwardCheckingBc } from '../src/solver/fuzzy/_fuzzy-forward-checking-bc.js';
import { FlexibleLocalChanges } from '../src/solver/fuzzy/_flexible-local-changes.js';
import { FlexibleLocalChangesEx } from '../src/solver/fuzzy/_flexible-local-changes-ex.js';
import { FuzzyBreakout } from '../src/solver/fuzzy/_fuzzy-breakout.js';
import { FuzzyGENET } from '../src/solver/fuzzy/_fuzzy-genet.js';
import { SRS3 } from '../src/solver/fuzzy/_srs3.js';
import { SRS3_PF } from '../src/solver/fuzzy/_srs3-pf.js';

const COUNT     = 1;   // Interaction count
const QUEEN_NUM = 20;  // Number of queens

function main() {
	let sum_time   = 0;
	let sum_degree = 0;

	for (let i = 0; i < COUNT; ++i) {
		const nq = new N_1_queens(QUEEN_NUM);
		const p  = nq.createProblem(new Problem());
		const t  = Date.now();  // Start time measurement

		// const s = new FuzzyForwardChecking(p);
		// const s = new FuzzyForwardCheckingBc(p);
		// const s = new FlexibleLocalChanges(p);
		// const s = new FlexibleLocalChangesEx(p);
		const s = new FuzzyBreakout(p);
		// const s = new FuzzyGENET(p);
		// const s = new SRS3(p);
		// const s = new SRS3_PF(p);
		// s.setTargetRate(null);
		s.setTimeLimit(10000);
		const res = s.solve();

		const ct = Date.now() - t;  // Stop time measurement
		const cd = p.worstSatisfactionDegree();
		console.log(`solver: ${s.name()}   ${res ? 'success' : 'failure'}`);
		console.log(`trial: ${i + 1}   time: ${ct}   degree: ${cd}`);
		nq.printResult(p);
		sum_time   += ct;
		sum_degree += cd;
	}
	console.log(`average time: ${sum_time / COUNT}   average degree: ${sum_degree / COUNT}`);
}
main();
