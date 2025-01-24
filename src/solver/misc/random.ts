/**
 * Utility functions for random numbers.
 * @author Takuto Yanagida
 * @version 2025-01-24
 */

let generator: () => number = Math.random;

/**
 * Set a seed number
 * @param {number} seed Seed number
 */
export function setSeed(seed: number = Math.random() * 997): void {
	generator = createGenerator(seed);
}

/**
 * Return a random number from min to max
 * @return {number} A random number
 */
export function random(): number {
	return generator();
}

/**
 * Returns a random number from 0 to n_min
 * @param {number} n An integer
 * @return {number} A random integer
 */
export function rand(n: number): number {
	console.log(generator === Math.random)
	return Math.floor(generator() * n);
}

/**
 * Create a function that returns a random number (Xorshift32) (used only in the library)
 * @private
 * @param {number} seed Seed number
 * @return {function():number} Function that returns a random number
 */
function createGenerator(seed: number): () => number {
	let y: number = seed;
	return (): number => {
		y = y ^ (y << 13);
		y = y ^ (y >> 17);
		y = y ^ (y << 15);
		return (y + 2147483648) / 4294967295;
	};
}
