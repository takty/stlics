/**
 * Solver factory class.
 *
 * @author Takuto Yanagida
 * @version 2025-01-18
 */

import { Solver } from '../solver/solver';

export class SolverFactory {

	static crispSolverNames(): string[] {
		return [
			/* 0 */ 'Forward Checking',
			/* 1 */ 'Max Forward Checking',
			/* 2 */ 'Local Changes',
			/* 3 */ 'Breakout',
			/* 4 */ 'GENET',
			/* 5 */ 'Crisp SRS3',
		];
	}

	static fuzzySolverNames(): string[] {
		return [
			/* 0 */ 'Full Checking',
			/* 1 */ 'Fuzzy Forward Checking',
			/* 2 */ 'Flexible Local Changes',
			/* 3 */ 'Fuzzy Breakout',
			/* 4 */ 'Fuzzy GENET',
			/* 5 */ 'SRS3',
			/* 6 */ 'SRS3 PF',
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
				const { ForwardChecking } = await import('../solver/crisp/forward-checking');
				return new ForwardChecking();
			case 'MaxForwardChecking':
			case 'max-forward-checking':
				const { MaxForwardChecking } = await import('../solver/crisp/max-forward-checking');
				return new MaxForwardChecking();
			case 'LocalChanges':
			case 'local-changes':
				const { LocalChanges } = await import('../solver/crisp/local-changes');
				return new LocalChanges();
			case 'Breakout':
			case 'breakout':
				const { Breakout } = await import('../solver/crisp/breakout');
				return new Breakout();
			case 'GENET':
			case 'genet':
				const { GENET } = await import('../solver/crisp/genet');
				return new GENET();
			case 'CrispSRS3':
			case 'crisp-srs3':
				const { CrispSRS3 } = await import('../solver/crisp/crisp-srs3');
				return new CrispSRS3();
		}
		return null;
	}

	static async createFuzzySolver(type: string): Promise<Solver | null> {
		switch (type.replaceAll(' ', '')) {
			case 'FullChecking':
			case 'full-checking':
				const { FullChecking } = await import('../solver/fuzzy/full-checking');
				return new FullChecking();
			case 'FuzzyForwardChecking':
			case 'fuzzy-forward-checking':
				const { FuzzyForwardChecking } = await import('../solver/fuzzy/fuzzy-forward-checking');
				return new FuzzyForwardChecking();
			case 'FlexibleLocalChanges':
			case 'flexible-local-changes':
				const { FlexibleLocalChanges } = await import('../solver/fuzzy/flexible-local-changes');
				return new FlexibleLocalChanges();
			case 'FuzzyBreakout':
			case 'fuzzy-breakout':
				const { FuzzyBreakout } = await import('../solver/fuzzy/fuzzy-breakout');
				return new FuzzyBreakout();
			case 'FuzzyGENET':
			case 'fuzzy-genet':
				const { FuzzyGENET } = await import('../solver/fuzzy/fuzzy-genet');
				return new FuzzyGENET();
			case 'SRS3':
			case 'srs3':
				const { SRS3 } = await import('../solver/fuzzy/srs3');
				return new SRS3();
			case 'SRS3PF':
			case 'SRS3_PF':
			case 'srs3-pf': {
				const { SRS3 } = await import('../solver/fuzzy/srs3');
				const { wrapWithPostStabilizer } = await import('../solver/filter/post-stabilizer');
				return wrapWithPostStabilizer(new SRS3());
			}
		}
		return null;
	}

}
