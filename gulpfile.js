var gulp = require('gulp');
var twig = require('gulp-twig-pipe');

var runSequence = require('run-sequence');

gulp.task('compile-twig', function(done) {
    runSequence('compile-menu', 'compile-pages', function() {
        console.log('Run something else');
        done();
    });
});


gulp.task('compile-menu', function () {
	'use strict';
 
	return gulp.src('./config/*.json')
		.pipe(twig('./index.html'))
		.pipe(gulp.dest('./temp.html'));
	
	

});

gulp.task('compile-pages', function () {
	'use strict';
 
	return gulp.src('./data/*.json')
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

gulp.task('default', ['compile-twig', 'copy-assets', 'copy-admin', 'copy-data', 'copy-layouts']);
