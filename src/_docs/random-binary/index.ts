import { SolverFactory } from '../../../stlics.ts';
import { waitFor, createLogOutput } from '../util.js';

const COUNT         = 1;  // Interaction count
const SOLVER_TYPE   = 0;
const TARGET        = 0.8;
const TIME_LIMIT    = 4000;
const VAR_NUM       = 10;
const DENSITY       = 0.5;
const AVE_TIGHTNESS = 0.5;

document.addEventListener('DOMContentLoaded', async (): Promise<void> => {
	const solTypeSel = document.getElementById('solver-type') as HTMLSelectElement;
	solTypeSel.value = '' + SOLVER_TYPE;

	SolverFactory.fuzzySolverNames().forEach((sn: string, i: number): void => {
		const o: HTMLOptionElement = document.createElement('option');
		o.textContent = sn;
		o.value       = '' + i;
		solTypeSel.appendChild(o);
	});

	const varNum       = document.getElementById('var-num') as HTMLInputElement;
	varNum.value       = '' + VAR_NUM;
	const density      = document.getElementById('density') as HTMLInputElement;
	density.value      = '' + DENSITY;
	const aveTightness = document.getElementById('ave-tightness') as HTMLInputElement;
	aveTightness.value = '' + AVE_TIGHTNESS;
	const iterNum = document.getElementById('iter-num') as HTMLInputElement;
	iterNum.value = '' + COUNT;

	const target = document.getElementById('target') as HTMLInputElement;
	target.value = '' + TARGET;
	const targetOn = document.getElementById('target-on') as HTMLInputElement;

	const timeLimit = document.getElementById('time-limit') as HTMLInputElement;
	timeLimit.value = '' + TIME_LIMIT;
	const timeLimitOn = document.getElementById('time-limit-on') as HTMLInputElement;

	const debugOn = document.getElementById('debug-on') as HTMLInputElement;

	const output = document.getElementById('output') as HTMLOutputElement;
	const log: (e: any) => void = createLogOutput();

	const indicator = document.getElementById('indicator') as HTMLInputElement;

	let worker: Worker|null = null;

	const solStartBtn = document.getElementById('solver-start') as HTMLButtonElement;
	const solStopBtn  = document.getElementById('solver-stop') as HTMLButtonElement;
	solStartBtn.addEventListener('click', (): void => {
		solStartBtn.disabled = true;
		solStopBtn.disabled  = false;

		output.value = '';

		worker = initialize((): void => solStopBtn.click());
		start(
			worker,
			parseInt(solTypeSel.value),
			targetOn.checked ? parseFloat(target.value) : -1,
			timeLimitOn.checked ? parseInt(timeLimit.value) : -1,
			debugOn.checked,
			parseFloat(varNum.value),
			parseFloat(density.value),
			parseFloat(aveTightness.value)
		);
	});
	solStopBtn.addEventListener('click', (): void => {
		solStartBtn.disabled = false;
		solStopBtn.disabled  = true;
		if (worker) worker.terminate();
	});


	// -------------------------------------------------------------------------


	let count: number = 0;

	function initialize(onFinish): Worker {
		let sumTime: number = 0;
		let sumDeg : number = 0;
		count = 0;

		const maxCount: number = parseInt(iterNum.value);

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

				log(`Solver: ${solver}    ${result ? 'Success' : 'Failure'}`);
				log(`Trial: ${count}    time: ${time}    degree: ${deg}`);

				if (maxCount <= count) {
					log(`Avg. time: ${sumTime / maxCount}    Avg. degree: ${sumDeg / maxCount}`);
					indicator.innerHTML = `Avg. time: ${Math.round(10 * sumTime / maxCount) / 10}&emsp;Avg. degree: ${Math.round(10000 * sumDeg / maxCount) / 10000}`;
					onFinish();
				}
			}
		};
		return ww;
	}

	async function start(ww: Worker, solverType: number, target: number, timeLimit: number, debug: boolean, varNum: number, density: number, aveTightness: number) {
		const maxCount: number = parseInt(iterNum.value);

		for (let i: number = 0; i < maxCount; ++i) {
			const now: number = count;
			ww.postMessage({ task: 'create', args: [varNum, density, aveTightness] });
			ww.postMessage({ task: 'solve', args: [solverType, target, timeLimit, debug] });
			await waitFor((): boolean => (count !== now));
		}
	}
});
