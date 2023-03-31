/**
 * A sample implementation of the N-1 Queen Problem.
 * The problem is to place N queens on a board of N vertical squares and N-1 horizontal squares in such a way that as few queens as possible are taken from each other.
 * If two queens are in a position to be taken, the farther apart they are, the higher the satisfaction degree.
 *
 * @author Takuto Yanagida
 * @version 2023-03-31
 */

class N_1_queens extends ProblemFactory {

	// ################################################################

	static COUNT     = 1;   // Interaction count
	static QUEEN_NUM = 20;  // Number of queens

	static main() {
		let sum_time   = 0;
		let sum_degree = 0;

		for (let i = 0; i < N_1_queens.COUNT; ++i) {
			const nq = new N_1_queens(N_1_queens.QUEEN_NUM);
			const p  = nq.createProblem(new Problem());
			const t  = Date.now();  // Start time measurement

			const s = new FuzzyForwardChecking(p);
			// const s = new FuzzyForwardCheckingBc(p);
			// const s = new FlexibleLocalChanges(p);
			// const s = new FlexibleLocalChangesEx(p);
			// const s = new FuzzyBreakout(p);
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
		console.log(`average time: ${sum_time / N_1_queens.COUNT}   average degree: ${sum_degree / N_1_queens.COUNT}`);
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
		return true;
	}

	createProblem(p) {
		const v = [];
		for (let i = 0; i < this.#size; ++i) {
			v.push(p.createVariable({ name:`Queen ${i}`, domain: p.createDomain({ min: 1, max: this.#size - 1 }), value: 1 }));
		}
		for (let i = 0; i < this.#size; ++i) {
			for (let j = i + 1; j < this.#size; ++j) {
				p.createConstraint({ relation: new FuzzyQueenRelation(i, j, this.#size), variables: [v[i], v[j]] });
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

class FuzzyQueenRelation extends FuzzyRelation {

	#dist;
	#size;

	constructor(i, j, size) {
		super();
		this.#dist = j - i;
		this.#size = size;
	}

	satisfactionDegree(v1, v2) {
		if ((v1 !== v2) && (v1 !== v2 + this.#dist) && (v1 !== v2 - this.#dist)) return 1;
		return (this.#dist - 1) / (this.#size - 1);
	}

}
