/**
 * A sample implementation of the N queens problem.
 *
 * @author Takuto Yanagida
 * @version 2023-03-31
 */

class N_queens extends ProblemFactory {

	// ################################################################

	static COUNT     = 1;  // Interaction count
	static QUEEN_NUM = 20;  // Number of queens

	static main() {
		let sum_time = 0;
		let sum_rate = 0;

		for (let i = 0; i < N_queens.COUNT; ++i) {
			const nq = new N_queens(N_queens.QUEEN_NUM);
			const p  = nq.createProblem(new CrispProblem());
			const t  = Date.now();  // Start time measurement

			const s = new ForwardChecking(p);
			// const s = new MaxForwardChecking(p);
			// const s = new LocalChanges(p);
			// const s = new LocalChangesEx(p);
			// const s = new Breakout(p);
			// const s = new GENET(p);
			// const s = new CrispSRS3(p);
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
		console.log(`average time: ${sum_time / N_queens.COUNT}   average rate: ${sum_rate / N_queens.COUNT}`);
	}

	// ################################################################

	#size;

	constructor(queenSize) {
		super();
		this.#size = queenSize;
	}

	getQueenSize() {
		return this.#size;
	}

	setQueenSize(size) {
		this.#size = size;
	}

	isFuzzy() {
		return false;
	}

	createProblem(p) {
		const v = [];
		for (let i = 0; i < this.#size; ++i) {
			v.push(p.createVariable({ name: `Queen ${i}`, domain: p.createDomain({ min: 1, max: this.#size }), value: 1 }));
		}
		for (let i = 0; i < this.#size; ++i) {
			for (let j = i + 1; j < this.#size; ++j) {
				p.createConstraint({ relation: new CrispQueenRelation(i, j), variables: [v[i], v[j]] });
			}
		}
		return p;
	}

	printResult(p) {
		for (let y = 0; y < this.#size; ++y) {
			let l = '';
			if (p.variableAt(y).isEmpty()) {
				for (let x = 0; x < this.#size; ++x) {
					l += '- ';
				}
			} else {
				for (let x = 0; x < this.#size; ++x) {
					if (p.variableAt(y).value() - 1 === x) {
						l += 'o ';
					} else {
						l += '- ';
					}
				}
			}
			console.log(l);
		}
	}

}

class CrispQueenRelation extends CrispRelation {

	#dist;

	constructor(i, j) {
		super();
		this.#dist = j - i;
	}

	isSatisfied(...vs) {
		const [v1, v2] = vs;
		if ((v1 !== v2) && (v1 !== v2 + this.#dist) && (v1 !== v2 - this.#dist)) return true;
		return false;
	}

}
