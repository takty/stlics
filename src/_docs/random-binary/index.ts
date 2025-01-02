import { SolverFactory } from '../../../stlics.ts';
import { waitFor, createLogOutput } from '../util.js';

const COUNT         = 1;  // Interaction count
const SOLVER_TYPE   = 0;
const TARGET_RATE   = 0.8;
const VAR_NUM       = 10;
const DENSITY       = 0.5;
const AVE_TIGHTNESS = 0.5;

document.addEventListener('DOMContentLoaded', async (): Promise<void> => {
	const solTypeSel = document.getElementById('solver-type') as HTMLSelectElement;
	SolverFactory.fuzzySolverNames().forEach((sn: string, i: number): void => {
		const o: HTMLOptionElement = document.createElement('option');
		o.textContent = sn;
		o.value       = '' + i;
		solTypeSel.appendChild(o);
	});
	solTypeSel.value = '' + SOLVER_TYPE;
	const targetRate = document.getElementById('target-rate') as HTMLInputElement;
	targetRate.value = '' + TARGET_RATE;

	const varNum       = document.getElementById('var-num') as HTMLInputElement;
	varNum.value       = '' + VAR_NUM;
	const density      = document.getElementById('density') as HTMLInputElement;
	density.value      = '' + DENSITY;
	const aveTightness = document.getElementById('ave-tightness') as HTMLInputElement;
	aveTightness.value = '' + AVE_TIGHTNESS;

	const output = document.getElementById('output') as HTMLOutputElement;
	const log: (e: any) => void = createLogOutput();

	let worker: Worker|null = null;

	const solStartBtn = document.getElementById('solver-start') as HTMLButtonElement;
	const solStopBtn  = document.getElementById('solver-stop') as HTMLButtonElement;
	solStartBtn.addEventListener('click', (): void => {
		solStartBtn.disabled = true;
		solStopBtn.disabled  = false;

		output.value = '';

		worker = initialize((): void => solStopBtn.click());
		start(worker, parseInt(solTypeSel.value), parseFloat(targetRate.value), parseFloat(varNum.value), parseFloat(density.value), parseFloat(aveTightness.value));
	});
	solStopBtn.addEventListener('click', (): void => {
		solStartBtn.disabled = false;
		solStopBtn.disabled  = true;
		if (worker) worker.terminate();
	});


	// -------------------------------------------------------------------------


	let count = 0;

	function initialize(onFinish): Worker {
		let sumTime: number = 0;
		let sumDeg: number  = 0;

		const ww = new Worker(new URL('worker.ts', import.meta.url), { type: 'module' });
		ww.onmessage = (e: MessageEvent<any>): void => {
			const { data } = e;
			if ('log' in data) {
				log(data.log);
			} else if ('result' in data) {
				const { result, solver, time, deg } = data;
				sumTime += time;
				sumDeg  += deg;
				count   += 1;

				log(`solver: ${solver}   ${result ? 'success' : 'failure'}`);
				log(`trial: ${count}   time: ${time}   degree: ${deg}`);

				if (COUNT <= count) {
					log(`average time: ${sumTime / COUNT}   average rate: ${sumDeg / COUNT}`);
					onFinish();
				}
			}
		};
		return ww;
	}

	async function start(ww: Worker, solverType: number, targetRate: number, varNum: number, density: number, aveTightness: number) {
		for (let i: number = 0; i < COUNT; ++i) {
			const now: number = count;
			ww.postMessage({ task: 'create', args: [varNum, density, aveTightness] });
			ww.postMessage({ task: 'solve', args: [solverType, targetRate] });
			await waitFor((): boolean => (count !== now));
		}
	}
});
