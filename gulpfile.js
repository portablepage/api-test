var gulp = require('gulp');

	gulp.task('compile', function () {
		'use strict';

		var twig = require('gulp-twig-pipe');
 
		gulp.src('./data/*.json')
			.pipe(twig('./index.html'))
			.pipe(gulp.dest('./site/'));
		
		gulp.src(['assets/**/*']).pipe(gulp.dest('assets'));

	});

gulp.task('default', ['compile']);

