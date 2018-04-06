var gulp = require('gulp');

	gulp.task('compile', function () {
		'use strict';

		var twig = require('gulp-twig-pipe');
 
		gulp.src('./data/*.json')
			.pipe(twig('./index.html'))
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

gulp.task('default', ['compile', 'copy-assets', 'copy-admin', 'copy-data', 'copy-layouts']);
