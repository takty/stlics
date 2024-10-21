/**
 * Solver factory class.
 *
 * @author Takuto Yanagida
 * @version 2023-04-17
 */

import { Solver } from './solver';
import { Problem } from '../problem/problem';

import { ForwardChecking } from './crisp/forward-checking';
import { MaxForwardChecking } from './crisp/max-forward-checking';
import { LocalChanges } from './crisp/local-changes';
import { LocalChangesEx } from './crisp/local-changes-ex';
import { Breakout } from './crisp/breakout';
import { GENET } from './crisp/genet';
import { CrispSRS3 } from './crisp/crisp-srs3';
import { FuzzyForwardChecking } from './fuzzy/fuzzy-forward-checking';
import { FuzzyForwardCheckingBc } from './fuzzy/fuzzy-forward-checking-bc';
import { FlexibleLocalChanges } from './fuzzy/flexible-local-changes';
import { FlexibleLocalChangesEx } from './fuzzy/flexible-local-changes-ex';
import { FuzzyBreakout } from './fuzzy/fuzzy-breakout';
import { FuzzyGENET } from './fuzzy/fuzzy-genet';
import { SRS3 } from './fuzzy/srs3';
import { SRS3_PF } from './fuzzy/srs3-pf';

export class SolverFactory {

	static crispSolverNames(): string[] {
		return [
			/* 0 */ 'Forward Checking',
			/* 1 */ 'Max Forward Checking',
			/* 2 */ 'Local Changes',
			/* 3 */ 'Local Changes Ex',
			/* 4 */ 'Breakout',
			/* 5 */ 'GENET',
			/* 6 */ 'Crisp SRS 3',
		];
	}

	static fuzzySolverNames(): string[] {
		return [
			/* 0 */ 'Fuzzy Forward Checking',
			/* 1 */ 'Fuzzy Forward Checking Bc',
			/* 2 */ 'Flexible Local Changes',
			/* 3 */ 'Flexible Local Changes Ex',
			/* 4 */ 'Fuzzy Breakout',
			/* 5 */ 'Fuzzy GENET',
			/* 6 */ 'SRS 3',
			/* 7 */ 'SRS 3 PF',
		];
	}

	static async createSolver(type: string, p: Problem): Promise<Solver | null> {
		const cs = await SolverFactory.createCrispSolver(type, p);
		if (cs) return cs;
		const fs = await SolverFactory.createFuzzySolver(type, p);
		if (fs) return fs;
		return null;
	}

	static async createCrispSolver(type: string, p: Problem): Promise<Solver | null> {
		switch (type.replaceAll(' ', '')) {
			case 'ForwardChecking':
			case 'forward-checking':
				return new ForwardChecking(p);
			case 'MaxForwardChecking':
			case 'max-forward-checking':
				return new MaxForwardChecking(p);
			case 'LocalChanges':
			case 'local-changes':
				return new LocalChanges(p);
			case 'LocalChangesEx':
			case 'local-changes-ex':
				return new LocalChangesEx(p);
			case 'Breakout':
			case 'breakout':
				return new Breakout(p);
			case 'GENET':
			case 'genet':
				return new GENET(p);
			case 'CrispSRS3':
			case 'crisp-srs3':
				return new CrispSRS3(p);
		}
		return null;
	}

	static async createFuzzySolver(type: string, p: Problem): Promise<Solver | null> {
		switch (type.replaceAll(' ', '')) {
			case 'FuzzyForwardChecking':
			case 'fuzzy-forward-checking':
				return new FuzzyForwardChecking(p);
			case 'FuzzyForwardCheckingBc':
			case 'fuzzy-forward-checking-bc':
				return new FuzzyForwardCheckingBc(p);
			case 'FlexibleLocalChanges':
			case 'flexible-local-changes':
				return new FlexibleLocalChanges(p);
			case 'FlexibleLocalChangesEx':
			case 'flexible-local-changes-ex':
				return new FlexibleLocalChangesEx(p);
			case 'FuzzyBreakout':
			case 'fuzzy-breakout':
				return new FuzzyBreakout(p);
			case 'FuzzyGENET':
			case 'fuzzy-genet':
				return new FuzzyGENET(p);
			case 'SRS3':
			case 'srs3':
				return new SRS3(p);
			case 'SRS3PF':
			case 'SRS3_PF':
			case 'srs3-pf':
				return new SRS3_PF(p);
		}
		return null;
	}

}
