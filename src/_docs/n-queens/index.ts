import { SolverFactory } from '../../../stlics.ts';
import { waitFor, createLogOutput } from '../util.js';

const COUNT       = 1;  // Interaction count
const SOLVER_TYPE = 0;
const TARGET      = 1;
const TIME_LIMIT  = 4000;
const QUEEN_NUM   = 20;

document.addEventListener('DOMContentLoaded', async (): Promise<void> => {
	const solTypeSel = document.getElementById('solver-type') as HTMLSelectElement;
	solTypeSel.value = '' + SOLVER_TYPE;

	SolverFactory.crispSolverNames().forEach((sn: string, i: number): void => {
		const o: HTMLOptionElement = document.createElement('option');
		o.textContent = sn;
		o.value       = '' + i;
		solTypeSel.appendChild(o);
	});

	const queenNum = document.getElementById('queen-num') as HTMLInputElement;
	queenNum.value = '' + QUEEN_NUM;

	const target = document.getElementById('target') as HTMLInputElement;
	target.value = '' + TARGET;
	const targetOn = document.getElementById('target-on') as HTMLInputElement;

	const timeLimit = document.getElementById('time-limit') as HTMLInputElement;
	timeLimit.value = '' + TIME_LIMIT;
	const timeLimitOn = document.getElementById('time-limit-on') as HTMLInputElement;

	const board  = document.getElementById('board') as HTMLTableElement;
	const output = document.getElementById('output') as HTMLOutputElement;
	const log: (e: any) => void = createLogOutput();

	let trs: HTMLTableRowElement[]|null = null;
	let worker: Worker|null = null;

	const solStartBtn = document.getElementById('solver-start') as HTMLButtonElement;
	const solStopBtn  = document.getElementById('solver-stop') as HTMLButtonElement;
	solStartBtn.addEventListener('click', (): void => {
		solStartBtn.disabled = true;
		solStopBtn.disabled  = false;

		if (40 <= parseInt(queenNum.value)) {
			board.classList.add('small');
		} else {
			board.classList.remove('small');
		}

		trs = makeBoard(board, parseInt(queenNum.value));
		output.value = '';

		worker = initialize((): void => solStopBtn.click());
		start(
			worker,
			parseInt(solTypeSel.value),
			targetOn.checked ? parseFloat(target.value) : -1,
			timeLimitOn.checked ? parseInt(timeLimit.value) : -1,
			parseInt(queenNum.value)
		);
	});
	solStopBtn.addEventListener('click', (): void => {
		solStartBtn.disabled = false;
		solStopBtn.disabled  = true;

		if (worker) worker.terminate();
	});


	// -------------------------------------------------------------------------


	function makeBoard(board: HTMLTableElement, size: number): HTMLTableRowElement[] {
		const trs: HTMLTableRowElement[] = [];
		board.innerHTML = '';
		for (let i: number = 0; i < size; ++i) {
			const tr: HTMLTableRowElement = document.createElement('tr');
			board.appendChild(tr);
			trs.push(tr);

			for (let j: number = 0; j < size; ++j) {
				const td: HTMLTableCellElement = document.createElement('td');
				tr.appendChild(td);
			}
		}
		return trs;
	}


	// -------------------------------------------------------------------------


	let count: number = 0;

	function initialize(onFinish: () => void): Worker {
		let sumTime: number = 0;
		let sumEv  : number = 0;

		const ww = new Worker(new URL('worker.ts', import.meta.url), { type: 'module' });
		ww.onmessage = (e: MessageEvent<any>): void => {
			const { data } = e;
			if ('log' in data) {
				log(data.log);
			} else if ('board' in data) {
				const { x, y } = data.board;
				(trs as HTMLTableRowElement[])[y].className = 'p' + x;
			} else if ('result' in data) {
				const { result, solver, time, ev } = data;
				sumTime += time;
				sumEv   += ev;
				count   += 1;

				log(`solver: ${solver}   ${result ? 'success' : 'failure'}`);
				log(`trial: ${count}   time: ${time}   ratio: ${ev}`);

				if (COUNT <= count) {
					log(`average time: ${sumTime / COUNT}   average ratio: ${sumEv / COUNT}`);
					onFinish();
				}
			}
		};
		return ww;
	}

	async function start(ww: Worker, solverType: number, target: number, timeLimit: number, queenNum: number) {
		for (let i: number = 0; i < COUNT; ++i) {
			const now: number = count;
			ww.postMessage({ task: 'create', args: [queenNum] });
			ww.postMessage({ task: 'solve', args: [solverType, target, timeLimit] });
			await waitFor((): boolean => (count !== now));
		}
	}
});
