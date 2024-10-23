/**
 * This class implements the SRS algorithm with PF.
 *
 * @author Takuto Yanagida
 * @version 2024-10-22
 */

import { Problem } from '../../problem/problem';
import { AssignmentList } from '../../util/assignment-list';
import { PostStabilization } from '../filter/post-stabilization';
import { SRS3 } from './srs3';

export class SRS3_PF extends SRS3 {

	constructor(p: Problem) {
		super(p);
	}

	name(): string {
		return 'SRS 3 + PF';
	}

	exec(): boolean {
		let deg: number = 0;
		let uvs: number = 0;
		if (this._debug) {
			deg = this._pro.worstSatisfactionDegree();
			uvs = this._pro.emptyVariableSize();
		}
		const al = new AssignmentList();
		al.setProblem(this._pro);

		const res: boolean = super.exec();

		if (res) {
			PostStabilization.apply(this._pro, al);
		}
		this._debugOutput(`result: ${res ? 'success' : 'failure'}`);
		this._debugOutput(`satisfaction degree: ${deg} -> ${this._pro.worstSatisfactionDegree()}`);
		this._debugOutput(`unassigned size: ${uvs} -> ${this._pro.emptyVariableSize()}`);
		return res;
	}

}
