/**
 * Gulpfile
 *
 * @author Takuto Yanagida
 * @version 2023-04-10
 */

import gulp from 'gulp';

import { makeJsTask } from './gulp/task-js.mjs';
import { makeCopyTask } from './gulp/task-copy.mjs';

const js = makeJsTask(['src/**/*.js', '!src/**/_*.js'], './dist', 'src');
const copy = makeCopyTask('dist/*', './docs/lib');

const watch = done => {
	gulp.watch('src/**/*.js', gulp.series(js, copy));
	done();
};

export default gulp.series(js, copy, watch);
