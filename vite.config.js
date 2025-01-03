import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
	root : 'src/_docs',
	base : './',
	build: {
		outDir     : '../../docs',
		emptyOutDir: true,

		rollupOptions: {
			input: {
				main: resolve('src/_docs', 'index.html'),
				n1q: resolve('src/_docs', 'n-1-queens', 'index.html'),
				nq: resolve('src/_docs', 'n-queens', 'index.html'),
				rb: resolve('src/_docs', 'random-binary', 'index.html'),
			}
		}
	},
	plugins: [],
	worker: {
		format: 'es',
	},
});
