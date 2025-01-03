/**
 * Solver factory class.
 *
 * @author Takuto Yanagida
 * @version 2025-01-03
 */

import { Solver } from '../solver/solver.js';

export class SolverFactory {

	static crispSolverNames(): string[] {
		return [
			/* 0 */ 'Forward Checking',
			/* 1 */ 'Max Forward Checking',
			/* 2 */ 'Local Changes',
			/* 3 */ 'Local Changes Ex',
			/* 4 */ 'Breakout',
			/* 5 */ 'GENET',
			/* 6 */ 'Crisp SRS3',
		];
	}

	static fuzzySolverNames(): string[] {
		return [
			/* 0 */ 'Full Checking',
			/* 1 */ 'Fuzzy Forward Checking',
			/* 2 */ 'Flexible Local Changes',
			/* 3 */ 'Flexible Local Changes Ex',
			/* 4 */ 'Fuzzy Breakout',
			/* 5 */ 'Fuzzy GENET',
			/* 6 */ 'SRS3',
			/* 7 */ 'SRS3 PF',
		];
	}

	static async createSolver(type: string): Promise<Solver | null> {
		const cs: Solver | null = await SolverFactory.createCrispSolver(type);
		if (cs) {
			return cs;
		}
		const fs: Solver | null = await SolverFactory.createFuzzySolver(type);
		if (fs) {
			return fs;
		}
		return null;
	}

	static async createCrispSolver(type: string): Promise<Solver | null> {
		switch (type.replaceAll(' ', '')) {
			case 'ForwardChecking':
			case 'forward-checking':
				const { ForwardChecking } = await import('../solver/crisp/forward-checking.js');
				return new ForwardChecking();
			case 'MaxForwardChecking':
			case 'max-forward-checking':
				const { MaxForwardChecking } = await import('../solver/crisp/max-forward-checking.js');
				return new MaxForwardChecking();
			case 'LocalChanges':
			case 'local-changes':
				const { LocalChanges } = await import('../solver/crisp/local-changes.js');
				return new LocalChanges();
			case 'LocalChangesEx':
			case 'local-changes-ex':
				const { LocalChangesEx } = await import('../solver/crisp/local-changes-ex.js');
				return new LocalChangesEx();
			case 'Breakout':
			case 'breakout':
				const { Breakout } = await import('../solver/crisp/breakout.js');
				return new Breakout();
			case 'GENET':
			case 'genet':
				const { GENET } = await import('../solver/crisp/genet.js');
				return new GENET();
			case 'CrispSRS3':
			case 'crisp-srs3':
				const { CrispSRS3 } = await import('../solver/crisp/crisp-srs3.js');
				return new CrispSRS3();
		}
		return null;
	}

	static async createFuzzySolver(type: string): Promise<Solver | null> {
		switch (type.replaceAll(' ', '')) {
			case 'FullChecking':
			case 'full-checking':
				const { FullChecking } = await import('../solver/fuzzy/full-checking.js');
				return new FullChecking();
			case 'FuzzyForwardChecking':
			case 'fuzzy-forward-checking':
				const { FuzzyForwardChecking } = await import('../solver/fuzzy/fuzzy-forward-checking.js');
				return new FuzzyForwardChecking();
			case 'FlexibleLocalChanges':
			case 'flexible-local-changes':
				const { FlexibleLocalChanges } = await import('../solver/fuzzy/flexible-local-changes.js');
				return new FlexibleLocalChanges();
			case 'FlexibleLocalChangesEx':
			case 'flexible-local-changes-ex':
				const { FlexibleLocalChangesEx } = await import('../solver/fuzzy/flexible-local-changes-ex.js');
				return new FlexibleLocalChangesEx();
			case 'FuzzyBreakout':
			case 'fuzzy-breakout':
				const { FuzzyBreakout } = await import('../solver/fuzzy/fuzzy-breakout.js');
				return new FuzzyBreakout();
			case 'FuzzyGENET':
			case 'fuzzy-genet':
				const { FuzzyGENET } = await import('../solver/fuzzy/fuzzy-genet.js');
				return new FuzzyGENET();
			case 'SRS3':
			case 'srs3':
				const { SRS3 } = await import('../solver/fuzzy/srs3.js');
				return new SRS3();
			case 'SRS3PF':
			case 'SRS3_PF':
			case 'srs3-pf': {
				const { SRS3 } = await import('../solver/fuzzy/srs3.js');
				const { wrapWithPostStabilizer } = await import('../solver/filter/post-stabilizer.js');
				return wrapWithPostStabilizer(new SRS3());
			}
		}
		return null;
	}

}
