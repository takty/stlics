/**
 * Gulpfile
 *
 * @author Takuto Yanagida
 * @version 2023-03-25
 */

import gulp from 'gulp';

import { makeJsTask } from './gulp/task-js.mjs';

const js = makeJsTask(['src/**/*.js', '!src/**/_*.js'], './dist', 'src');

const watch = done => {
	gulp.watch('src/**/*.js', js);
	done();
};

export default gulp.series(js, watch);
