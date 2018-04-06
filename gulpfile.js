var gulp = require('gulp');

	gulp.task('compile', function () {
		'use strict';

		var twig = require('gulp-twig-pipe');
 
		gulp.src('./_data/*.json')
			.pipe(twig('./_layouts/index.html'))
			.pipe(gulp.dest('./_site/'));

	});

gulp.task('default', ['compile']);
