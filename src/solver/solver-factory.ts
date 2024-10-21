/**
 * Solver factory class.
 *
 * @author Takuto Yanagida
 * @version 2023-04-17
 */

import { Solver } from './solver';
import { Problem } from '../problem/problem';

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
				const { ForwardChecking } = await import('./crisp/forward-checking.js');
				return new ForwardChecking(p);
			case 'MaxForwardChecking':
			case 'max-forward-checking':
				const { MaxForwardChecking } = await import('./crisp/max-forward-checking.js');
				return new MaxForwardChecking(p);
			case 'LocalChanges':
			case 'local-changes':
				const { LocalChanges } = await import('./crisp/local-changes.js');
				return new LocalChanges(p);
			case 'LocalChangesEx':
			case 'local-changes-ex':
				const { LocalChangesEx } = await import('./crisp/local-changes-ex.js');
				return new LocalChangesEx(p);
			case 'Breakout':
			case 'breakout':
				const { Breakout } = await import('./crisp/breakout.js');
				return new Breakout(p);
			case 'GENET':
			case 'genet':
				const { GENET } = await import('./crisp/genet.js');
				return new GENET(p);
			case 'CrispSRS3':
			case 'crisp-srs3':
				const { CrispSRS3 } = await import('./crisp/crisp-srs3.js');
				return new CrispSRS3(p);
		}
		return null;
	}

	static async createFuzzySolver(type: string, p: Problem): Promise<Solver | null> {
		switch (type.replaceAll(' ', '')) {
			case 'FuzzyForwardChecking':
			case 'fuzzy-forward-checking':
				const { FuzzyForwardChecking } = await import('./fuzzy/fuzzy-forward-checking.js');
				return new FuzzyForwardChecking(p);
			case 'FuzzyForwardCheckingBc':
			case 'fuzzy-forward-checking-bc':
				const { FuzzyForwardCheckingBc } = await import('./fuzzy/fuzzy-forward-checking-bc.js');
				return new FuzzyForwardCheckingBc(p);
			case 'FlexibleLocalChanges':
			case 'flexible-local-changes':
				const { FlexibleLocalChanges } = await import('./fuzzy/flexible-local-changes.js');
				return new FlexibleLocalChanges(p);
			case 'FlexibleLocalChangesEx':
			case 'flexible-local-changes-ex':
				const { FlexibleLocalChangesEx } = await import('./fuzzy/flexible-local-changes-ex.js');
				return new FlexibleLocalChangesEx(p);
			case 'FuzzyBreakout':
			case 'fuzzy-breakout':
				const { FuzzyBreakout } = await import('./fuzzy/fuzzy-breakout.js');
				return new FuzzyBreakout(p);
			case 'FuzzyGENET':
			case 'fuzzy-genet':
				const { FuzzyGENET } = await import('./fuzzy/fuzzy-genet.js');
				return new FuzzyGENET(p);
			case 'SRS3':
			case 'srs3':
				const { SRS3 } = await import('./fuzzy/srs3.js');
				return new SRS3(p);
			case 'SRS3PF':
			case 'SRS3_PF':
			case 'srs3-pf':
				const { SRS3_PF } = await import('./fuzzy/srs3-pf.js');
				return new SRS3_PF(p);
		}
		return null;
	}

}
