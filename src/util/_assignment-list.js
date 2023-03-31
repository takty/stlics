/**
 * The class represents multiple variables and their assignments.
 *
 * @author Takuto Yanagida
 * @version 2023-03-25
 */

class AssignmentList {

	static fromVariables(vs) {
		const al = new AssignmentList();
		al.setVariables(vs);
		return al;
	}

	#as = [];

	constructor() {
	}

	setProblem(problem) {
		this.#as.length = 0;
		this.addProblem(problem);
	}

	setAssignmentList(al) {
		this.#as.length = 0;
		for (let i = 0; i < al.size(); ++i) {
			this.addAssignment(al.get(i));
		}
	}

	setVariables(vs) {
		this.#as.length = 0;
		for (const v of vs) {
			this.#as.push(new Assignment({ variable: v, value: v.value() }));
		}
	}

	addProblem(problem) {
		for (const v of problem.variables()) {
			this.#as.push(new Assignment({ variable: v, value: v.value() }));
		}
	}

	addVariable(variable, value = null) {
		this.#as.push(new Assignment({ variable, value }));
	}

	addAssignment(a) {
		this.#as.push(new Assignment({ variable: a.variable(), value: a.value() }));
	}

	apply() {
		for (const a of this.#as) a.apply();
	}

	arbitraryAssignment() {
		return this.#as[Math.floor(Math.random() * this.#as.length)];
	}

	differenceSize() {
		let diff = 0;
		for (const a of this.#as) {
			if (a.variable().value() !== a.value()) ++diff;
		}
		return diff;
	}

	size() {
		return this.#as.length;
	}

	clear() {
		this.#as.length = 0;
	}

	get(index) {
		return this.#as[index];
	}

	add(a) {
		this.#as.push(a);
	}

	isEmpty() {
		return this.#as.length === 0;
	}

}
