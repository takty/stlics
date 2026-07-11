export type QueenBoardMode = 'crisp' | 'fuzzy';

type Beam = {
	x0: number;
	y0: number;
	x1: number;
	y1: number;
	e : number;
};

export class QueenBoardRenderer {

	static readonly MAX_BOARD_WIDTH = 768;
	static readonly MAX_CELL_SIZE   = 16;

	#can: HTMLCanvasElement;
	#ctx: CanvasRenderingContext2D;

	#rowSize: number;
	#colSize: number;
	#mode   : QueenBoardMode;

	#qCols: number[];

	#cellSize = 0;
	#cssW     = 0;
	#cssH     = 0;

	#aniFrameId    : number | null         = null;
	#resizeObserver: ResizeObserver | null = null;

	constructor(
		can    : HTMLCanvasElement,
		rowSize: number,
		colSize: number,
		mode   : QueenBoardMode
	) {
		this.#can     = can;
		this.#ctx     = can.getContext('2d') as CanvasRenderingContext2D;
		this.#rowSize = rowSize;
		this.#colSize = colSize;
		this.#mode    = mode;

		this.#qCols = Array(rowSize).fill(-1);

		this.#can.style.display      = 'block';
		this.#can.style.marginInline = 'auto';

		this.#resize();

		const parent = this.#can.parentElement;
		if (parent && typeof ResizeObserver !== 'undefined') {
			this.#resizeObserver = new ResizeObserver((): void => {
				this.#resize();
				this.#requestRedraw();
			});
			this.#resizeObserver.observe(parent);
		}
	}

	setQueen(x: number, y: number): void {
		if (y < 0 || this.#rowSize <= y) return;

		this.#qCols[y] = (0 <= x && x < this.#colSize) ? x : -1;
		this.#requestRedraw();
	}

	clear(): void {
		this.#qCols.fill(-1);

		if (this.#aniFrameId !== null) {
			cancelAnimationFrame(this.#aniFrameId);
			this.#aniFrameId = null;
		}
		this.#redraw();
	}

	dispose(): void {
		if (this.#aniFrameId !== null) {
			cancelAnimationFrame(this.#aniFrameId);
			this.#aniFrameId = null;
		}
		this.#resizeObserver?.disconnect();
		this.#resizeObserver = null;
	}


	// -------------------------------------------------------------------------


	#requestRedraw(): void {
		if (this.#aniFrameId !== null) return;

		this.#aniFrameId = requestAnimationFrame((): void => {
			this.#aniFrameId = null;
			this.#redraw();
		});
	}

	#resize(): void {
		const parentW    = this.#can.parentElement?.clientWidth ?? QueenBoardRenderer.MAX_BOARD_WIDTH;
		const availableW = Math.min(parentW, QueenBoardRenderer.MAX_BOARD_WIDTH);

		this.#cellSize = Math.min(
			QueenBoardRenderer.MAX_CELL_SIZE,
			availableW / this.#colSize
		);

		this.#cssW = this.#cellSize * this.#colSize;
		this.#cssH = this.#cellSize * this.#rowSize;

		const dpr = window.devicePixelRatio || 1;

		this.#can.style.width  = `${this.#cssW}px`;
		this.#can.style.height = `${this.#cssH}px`;
		this.#can.width        = Math.round(this.#cssW * dpr);
		this.#can.height       = Math.round(this.#cssH * dpr);

		this.#ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
	}

	#redraw(): void {
		this.#drawBackground();
		this.#drawGrid();
		const { bs, qEs } = this.#analyzeConflicts();
		this.#drawBeams(bs);
		this.#drawQueens(qEs);
	}

	#drawBackground(): void {
		const ctx = this.#ctx;
		ctx.clearRect(0, 0, this.#cssW, this.#cssH);
		ctx.fillStyle = '#fff';
		ctx.fillRect(0, 0, this.#cssW, this.#cssH);
	}

	#drawGrid(): void {
		const ctx = this.#ctx;
		ctx.beginPath();

		for (let x = 0; x <= this.#colSize; ++x) {
			const px = x * this.#cellSize;
			ctx.moveTo(px, 0);
			ctx.lineTo(px, this.#cssH);
		}
		for (let y = 0; y <= this.#rowSize; ++y) {
			const py = y * this.#cellSize;
			ctx.moveTo(0, py);
			ctx.lineTo(this.#cssW, py);
		}
		ctx.strokeStyle = '#000';
		ctx.lineWidth   = 0.5;
		ctx.stroke();
	}

	#drawBeams(beams: Beam[]): void {
		const ctx = this.#ctx;
		ctx.lineWidth = Math.max(1, this.#cellSize * 0.12);
		ctx.lineCap   = 'round';

		for (const b of beams) {
			ctx.beginPath();
			ctx.moveTo(this.#centerX(b.x0), this.#centerY(b.y0));
			ctx.lineTo(this.#centerX(b.x1), this.#centerY(b.y1));
			ctx.strokeStyle = this.#colorFromEvaluation(b.e);
			ctx.stroke();
		}
	}

	#drawQueens(queenEvaluations: number[]): void {
		const ctx      = this.#ctx;
		const fontSize = Math.max(4, this.#cellSize * 0.8);

		ctx.font         = `bold ${fontSize}px sans-serif`;
		ctx.textAlign    = 'center';
		ctx.textBaseline = 'middle';

		for (let y = 0; y < this.#rowSize; ++y) {
			const x = this.#qCols[y];
			if (x < 0) continue;

			const evaluation = queenEvaluations[y];
			ctx.fillStyle = evaluation < 1 ? this.#colorFromEvaluation(evaluation) : '#000';
			ctx.fillText('▲', this.#centerX(x), this.#centerY(y));
		}
	}

	#analyzeConflicts(): { bs: Beam[]; qEs: number[] } {
		const bs : Beam[]   = [];
		const qEs: number[] = Array(this.#rowSize).fill(1);

		for (let y0 = 0; y0 < this.#rowSize; ++y0) {
			const x0 = this.#qCols[y0];
			if (x0 < 0) continue;

			for (let y1 = y0 + 1; y1 < this.#rowSize; ++y1) {
				const x1 = this.#qCols[y1];
				if (x1 < 0) continue;

				if (this.#isConflict(x0, y0, x1, y1)) {
					const e = this.#conflictEvaluation(y0, y1);
					bs.push({ x0, y0, x1, y1, e: e });
					qEs[y0] = Math.min(qEs[y0], e);
					qEs[y1] = Math.min(qEs[y1], e);
				}
			}
		}
		return { bs, qEs };
	}

	#isConflict(x0: number, y0: number, x1: number, y1: number): boolean {
		const dx = Math.abs(x1 - x0);
		const dy = Math.abs(y1 - y0);
		return dx === 0 || dx === dy;
	}

	#conflictEvaluation(y0: number, y1: number): number {
		if (this.#mode === 'crisp') return 0;
		const dist = Math.abs(y1 - y0);
		return (dist - 1) / (this.#rowSize - 1);
	}

	#colorFromEvaluation(evaluation: number): string {
		const e  = Math.max(0, Math.min(1, evaluation));
		const f  = 0.25 + (1 - 0.25) * (1 - e);
		const gb = Math.round(255 * (1 - f));
		return `rgb(255, ${gb}, ${gb})`;
	}

	#centerX(x: number): number {
		return (x + 0.5) * this.#cellSize;
	}

	#centerY(y: number): number {
		return (y + 0.5) * this.#cellSize;
	}

}
