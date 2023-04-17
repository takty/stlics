import { waitFor, createLogOutput } from '../util.js';

const COUNT       = 1;   // Interaction count
const QUEEN_NUM   = 20;  // Number of queens
const SOLVER_TYPE = 4;

document.addEventListener('DOMContentLoaded', async () => {
	const log = createLogOutput();

	let sum_time = 0;
	let sum_deg  = 0;
	let count    = 0;

	const ww = new Worker(new URL('worker.js', import.meta.url), { type: 'module' });
	ww.onmessage = e => {
		const { data } = e;
		if ('log' in data) {
			log(data.log);
		} else if ('result' in data) {
			const { result, solver, time, deg } = data;
			sum_time += time;
			sum_deg  += deg;
			count    += 1;

			log(`solver: ${solver}   ${result ? 'success' : 'failure'}`);
			log(`trial: ${count}   time: ${time}   degree: ${deg}`);

			if (COUNT <= count) {
				log(`average time: ${sum_time / COUNT}   average rate: ${sum_deg / COUNT}`);
			}
		}
	};

	for (let i = 0; i < COUNT; ++i) {
		const now = count;
		ww.postMessage({ task: 'create', args: [QUEEN_NUM] });
		ww.postMessage({ task: 'solve', args: [SOLVER_TYPE] });
		await waitFor(() => (count !== now));
	}
});
