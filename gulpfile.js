var gulp = require('gulp');
var twig = require('gulp-twig-pipe');


gulp.task('compile-menu', function () {
	'use strict';
 
	return gulp.src('./config/pages.json')
		.pipe(twig('./index.html'))
		.pipe(gulp.dest('./temp.html'));

});

// second param indicates the task waits for 'compile-menu' to finish
gulp.task('compile-pages', ['compile-menu'], function () {
	'use strict';
 
	gulp.src('./data/*.json')
		.pipe(twig('./temp.html'))
		.pipe(gulp.dest('./site/'));

});

gulp.task('copy-assets', function () {
	gulp.src(['./assets/**/*']).pipe(gulp.dest('./site/assets'));
});

gulp.task('copy-admin', function () {
	gulp.src(['./admin/**/*']).pipe(gulp.dest('./site/admin'));
});

gulp.task('copy-data', function () {
	gulp.src(['./data/**/*']).pipe(gulp.dest('./site/data'));
});

gulp.task('copy-layouts', function () {
	gulp.src(['./layouts/**/*']).pipe(gulp.dest('./site/layouts'));
});

gulp.task('default', ['compile-menu', 'compile-pages', 'copy-assets', 'copy-admin', 'copy-data', 'copy-layouts']);
