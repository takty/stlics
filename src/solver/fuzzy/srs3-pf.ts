/**
 * This class implements the SRS algorithm with PF.
 *
 * @author Takuto Yanagida
 * @version 2024-12-10
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
		if (this.debug) {
			deg = this.pro.worstSatisfactionDegree();
			uvs = this.pro.emptyVariableSize();
		}
		const al = new AssignmentList();
		al.setProblem(this.pro);

		const res: boolean = super.exec();

		if (res) {
			PostStabilization.apply(this.pro, al);
		}
		this.debugOutput(`result: ${res ? 'success' : 'failure'}`);
		this.debugOutput(`satisfaction degree: ${deg} -> ${this.pro.worstSatisfactionDegree()}`);
		this.debugOutput(`unassigned size: ${uvs} -> ${this.pro.emptyVariableSize()}`);
		return res;
	}

}
