/**
 * Utility class for constraint satisfaction problems.
 *
 * @author Takuto Yanagida
 * @version 2023-04-11
 */

class Problems {

	static #averagePathLength(p, v, length, baseLength, vo) {
		const vn = [];

		for (const c of v) {
			for (const vi of c) {
				if (length[vi.index()] === Number.MAX_VALUE) {
					vn.push(vi);
					length[vi.index()] = baseLength + 1;
				}
			}
		}
		for (const vi of vn) vo.add(vi);
		for (const vi of vn) {
			Problems.#averagePathLength(p, vi, length, baseLength + 1, vo);
		}
	}

	/**
	 * Calculates the average path length for a given variable.
	 * @param p A problem.
	 * @param v A variable of the problem.
	 * @return Average path length.
	 */
	static averagePathLength(p, v) {
		const ls = new Array(p.variableSize());
		ls.fill(Number.MAX_VALUE);

		const vs = new Set();
		vs.add(v);

		ls[v.index()] = 0;
		Problems.#averagePathLength(p, v, ls, 0, vs);

		let connectedSize = 0;
		let sum           = 0;

		for (let i = 0; i < ls.length; ++i) {
			if (ls[i] !== Number.MAX_VALUE && i !== v.index()) {
				++connectedSize;
				sum += ls[i];
			}
		}
		if (connectedSize === 0) {
			return 0;
		}
		return sum / connectedSize;
	}

	/**
	 * Calculates the average path length.
	 * @param p A problem.
	 * @return Average path length.
	 */
	static averagePathLengths(p) {
		const ls = new Array(p.variableSize());

		for (const v of p.variables()) {
			ls[v.index()] = Problems.averagePathLength(p, v);
		}
		return ls;
	}

	/**
	 * Gets an array containing all domains.
	 * @param p A problem.
	 * @return Array of domains.
	 */
	static domains(p) {
		const ds = [];

		for (const v of p.variables()) {
			ds.push(v.domain());
		}
		return ds;
	}

	/**
	 * Returns the array of possible satisfaction degree values for all unary constraints.
	 * @param p A problem.
	 * @param degrees Array of degree values.
	 * @return The array.
	 */
	static possibleSatisfactionDegreesOfUnaryConstraints(p, degrees) {
		for (const c of p.constraints()) {
			if (c.size() !== 1) continue;
			const v       = c.at(0);
			const origVal = v.value();  // Save the value.

			for (const val of v.domain()) {
				v.assign(val);
				degrees.add(c.satisfactionDegree());
			}
			v.assign(origVal);  // Restore the value.
		}
		return degrees;
	}

	/**
	 * Set up all domains.
	 * @param p A problem.
	 * @param ds Array of domains.
	 */
	static setDomains(p, ds) {
		for (let i = 0; i < ds.length; ++i) {
			p.variableAt(i).setDomain(ds[i]);
		}
	}

	/**
	 * Returns a view of the fuzzy constraint satisfaction problem as a crisp constraint satisfaction problem.
	 * The relations and domains of the specified fuzzy constraint satisfaction problem are reused, but the other elements are newly generated.
	 * Note: Assignments to variables and changes to domains of the view are reflected in the variables of the original problem.
	 * @param p A fuzzy constraint satisfaction problem.
	 * @param threshold The threshold of constraint satisfaction degree. A constraint is considered satisfied when the constraint satisfaction degree is greater than or equal to this value.
	 * @return A crisp constraint satisfaction problem.
	 */
	static toViewAsCrispProblem(p, threshold) {
		const cp = new CrispFuzzyProblem();

		for (const v of p.variables()) {
			cp.createVariable(v);
		}
		for (c of p.constraints()) {
			const vs = [];

			for (const v of c) {
				vs.push(cp.variableAt(v.index()));
			}
			const r = c.crispRelation();

			if (c.isFuzzy()) {
				r = new CrispFuzzyRelation(c.fuzzyRelation(), threshold);
			}
			cp.createConstraint({ relation: r, variables: vs });
		}
		return cp;
	}

}

class CrispFuzzyProblem extends CrispProblem {

	createVariable(v) {
		const iv = new ImaginaryVariable(v);
		this.addVariable(iv);
		return v;
	}

}

class CrispFuzzyRelation extends CrispRelation {

	#th;
	#fr;

	constructor(fr, th) {
		this.#fr = fr;
		this.#th = th;
	}

	isSatisfied(...vs) {
		return this.#fr.satisfactionDegree(vs) >= this.#th;
	}

}

class ImaginaryVariable extends Variable {

	#orig;

	constructor(v) {
		super(v.owner(), v.domain());
		this.#orig = v;
		setName(v.name());
		assign(v.value());
	}

	assign(value) {
		this.#orig.assign(value);
	}

	domain() {
		return this.#orig.domain();
	}

	setDomain(dom) {
		this.#orig.setDomain(dom);
	}

	value() {
		return this.#orig.value();
	}

}
