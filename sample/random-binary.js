import { Problem } from '../src/problem/problem.js';
import { RandomBinary } from '../src/model/random-binary.js';

import { FuzzyForwardChecking } from '../src/solver/fuzzy/fuzzy-forward-checking.js';
import { FuzzyForwardCheckingBc } from '../src/solver/fuzzy/fuzzy-forward-checking-bc.js';
import { FlexibleLocalChanges } from '../src/solver/fuzzy/flexible-local-changes.js';
import { FlexibleLocalChangesEx } from '../src/solver/fuzzy/flexible-local-changes-ex.js';
import { FuzzyBreakout } from '../src/solver/fuzzy/fuzzy-breakout.js';
import { FuzzyGENET } from '../src/solver/fuzzy/fuzzy-genet.js';
import { SRS3 } from '../src/solver/fuzzy/srs3.js';
import { SRS3_PF } from '../src/solver/fuzzy/srs3-pf.js';

const COUNT         = 1;  // Interaction count
const VAR_NUM       = 10;  // Number of variables
const DENSITY       = 0.5;
const AVE_TIGHTNESS = 0.5;

document.addEventListener('DOMContentLoaded', function () {
	const output = document.getElementById('output');
	const log    = e => output.value += `${e}\n`;

	let sum_time   = 0;
	let sum_degree = 0;

	for (let i = 0; i < COUNT; ++i) {
		const rp = new RandomBinary(VAR_NUM, DENSITY, AVE_TIGHTNESS);
		const p  = rp.createProblem(new Problem());
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
		s.setDebugOutput(log);
		const res = s.solve();

		const ct = Date.now() - t;  // Stop time measurement
		const cd = p.worstSatisfactionDegree();
		log(`solver: ${s.name()}   ${res ? 'success' : 'failure'}`);
		log(`trial: ${i + 1}   time: ${ct}   degree: ${cd}`);
		sum_time   += ct;
		sum_degree += cd;
	}
	log(`average time: ${sum_time / COUNT}   average degree: ${sum_degree / COUNT}`);
});
