var gulp = require('gulp');
var twig = require('gulp-twig-pipe');
var data = require('gulp-data');
var fs = require('file-system');
var mergeJson = require('merge-json');


gulp.task('compile', function () {
	
	gulp.src('./data/*.json')
		.pipe(data(() => mergeJson.merge(require('./config/pages.json'),
			require('./data/index.json')
		)))
		.pipe(twig('./index.html', {dataSource: 'data'}))
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
