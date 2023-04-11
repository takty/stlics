/**
 * This class implements the SRS algorithm with PF.
 *
 * @author Takuto Yanagida
 * @version 2023-04-11
 */

class SRS3_PF extends SRS3 {

	constructor(p) {
		super(p);
	}

	name() {
		return 'SRS 3 + PF';
	}

	exec() {
		let deg = 0;
		let uvs = 0;
		if (this._debug) {
			deg = this._pro.worstSatisfactionDegree();
			uvs = this._pro.emptyVariableSize();
		}
		const at = new AssignmentList();
		at.setProblem(this._pro);

		const res = super.exec();

		if (res) {
			PostStabilization.apply(this._pro, at);
		}
		if (this._debug) {
			console.log(`result: ${res ? 'success' : 'failure'}`);
			console.log(`satisfaction degree: ${deg} -> ${this._pro.worstSatisfactionDegree()}`);
			console.log(`unassigned size: ${uvs} -> ${this._pro.emptyVariableSize()}`);
		}
		return res;
	}

}
