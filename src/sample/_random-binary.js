/**
 * Sample implementation of a random binary problem.
 *
 * @author Takuto Yanagida
 * @version 2023-04-10
 */

class RandomBinary extends ProblemFactory {

	// ################################################################

	static COUNT         = 1;  // Interaction count
	static VAR_NUM       = 10;  // Number of variables
	static DENSITY       = 0.5;
	static AVE_TIGHTNESS = 0.5;

	static main() {
		let sum_time   = 0;
		let sum_degree = 0;

		for (let i = 0; i < RandomBinary.COUNT; ++i) {
			const rp = new RandomBinary(RandomBinary.VAR_NUM, RandomBinary.DENSITY, RandomBinary.AVE_TIGHTNESS);
			const p  = rp.createProblem(new Problem());
			const t  = Date.now();  // Start time measurement

			// const s = new FuzzyForwardChecking(p);
			// const s = new FuzzyForwardCheckingBc(p);
			// const s = new FlexibleLocalChanges(p);
			// const s = new FlexibleLocalChangesEx(p);
			// const s = new FuzzyBreakout(p);
			// const s = new FuzzyGENET(p);
			// const s = new SRS3(p);
			const s = new SRS3_PF(p);
			// s.setTargetRate(null);
			s.setTimeLimit(10000);
			const res = s.solve();

			const ct = Date.now() - t;  // Stop time measurement
			const cd = p.worstSatisfactionDegree();
			console.log(`solver: ${s.name()}   ${res ? 'success' : 'failure'}`);
			console.log(`trial: ${i + 1}   time: ${ct}   degree: ${cd}`);
			sum_time   += ct;
			sum_degree += cd;
		}
		console.log(`average time: ${sum_time / RandomBinary.COUNT}   average degree: ${sum_degree / RandomBinary.COUNT}`);
	}

	// ################################################################

	static nextInt(max) {
		return Math.floor(Math.random() * Math.floor(max));
	}

	#size;
	#den;
	#t;
	#sig;

	constructor(varCount, density, aveTightness, domainSize = null) {
		super();
		this.#size = varCount;
		this.#den  = density;
		this.#t    = aveTightness;
		this.#sig  = domainSize ?? varCount;
	}

	getVariableCount() {
		return this.#size;
	}

	setVariableCount(count) {
		this.#size = count;
	}

	getDensity() {
		return this.#den;
	}

	setDensity(density) {
		this.#den = density;
	}

	getAverageTightness() {
		return this.#t;
	}

	setAverageTightness(tightness) {
		this.#t = tightness;
	}

	getDomainSize() {
		return this.#sig;
	}

	setDomainSize(size) {
		this.#sig = size;
	}

	isFuzzy() {
		return true;
	}

	createProblem(p) {
		const r  = (this.#den * ((this.#size * this.#size - this.#size) / 2)) | 0;
		const vs = [];
		for (let i = 0; i <this.#size; ++i) {
			vs.push(p.createVariable({ domain: p.createDomain({ min: 0, max: this.#sig - 1 }), value: 0 }));
		}
		while (p.constraintSize() < r) {
			const i = RandomBinary.nextInt(this.#size);
			const j = RandomBinary.nextInt(this.#size);

			if (i !== j) {
				const temp = p.constraintsBetween(vs[i], vs[j]);
				if (0 === temp.length) {
					p.createConstraint({ relation: new TableRelation(this.#getRelationTable()), variables: [vs[i], vs[j]] });
				}
			}
		}
		return p;
	}

	#getRelationTable() {
		const table = [];
		for (let i = 0; i < this.#sig; ++i) {
			table.push(new Array(this.#sig));
		}
		for (let i = 0; i < this.#sig; ++i) {
			for (let j = 0; j < this.#sig; ++j) {
				const q = (this.#t === 0) ? Number.MAX_VALUE : (1 - this.#t) / this.#t;
				table[i][j] = Beta.random(1, q);
			}
		}
		return table;
	}

}

class TableRelation extends FuzzyRelation {

	#table;

	constructor(table) {
		super();
		this.#table = table;
	}

	satisfactionDegree(value1, value2) {
		return this.#table[value1][value2];
	}

}
