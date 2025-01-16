/**
 * Gamma Distribution.
 *
 * @author Takuto Yanagida
 * @version 2025-01-16
 */

/**
 * Generates a random number between two specified parameters `a` and `b`.
 * The value is computed using the gamma distribution.
 *
 * @param a - The first shape parameter (must be a positive number).
 * @param b - The second shape parameter (must be a positive number).
 * @returns A random number based on the ratio of gamma-distributed values.
 */
export function random(a: number, b: number): number {
	const T: number = gamma(a);
	return T / (T + gamma(b));
}

/**
 * Generates a gamma-distributed random number for a given shape parameter `a`.
 *
 * The implementation handles two cases:
 * - If `1 < a`, it uses a rejection sampling algorithm with a transformation.
 * - Else, it employs a mixture of exponential and logarithmic transformations.
 *
 * @param a - The shape parameter of the gamma distribution (must be a positive number).
 * @returns A gamma-distributed random number.
 */
function gamma(a: number): number {
	let t: number, x: number, y: number, u: number, r: number;
	if (1 < a) {
		t = Math.sqrt(2 * a - 1);
		do {
			do {
				do {
					do {
						x = Math.random();
						y = 2 * Math.random() - 1;
					} while ((1 <= x * x + y * y) || (0 === x));
					y = y / x;
					x = t * y + a - 1;
				} while (x <= 0);
				u = (a - 1) * Math.log(x / (a - 1)) - t * y;
			} while (u <= -50);
		} while ((1 + y * y) * Math.exp(u) <= Math.random());
	} else {
		t = Math.E / (a + Math.E);
		do {
			if (Math.random() < t) {
				x = 0;
				y = 1;
				r = Math.random();
				if (0 < r) {
					x = Math.exp(Math.log(r) / a);
					y = Math.exp(-x);
				}
			} else {
				r = Math.random();
				x = 1;
				y = 0;
				if (0 < r) {
					x = 1 - Math.log(r);
					y = Math.exp((a - 1) * Math.log(x));
				}
			}
		} while (Math.random() >= y);
	}
	return x;
}
