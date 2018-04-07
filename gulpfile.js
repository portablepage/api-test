var gulp = require('gulp');
var twig = require('gulp-twig-pipe');
var runSequence = require('run-sequence');
//var concat_json = require("gulp-concat-json");



gulp.task('compile', function(done) {
    runSequence('compile-menu', 'compile-pages', 'copy-layouts', function() {
        console.log('Run something else');
        done();
    });
});

//gulp.task('combine-json', function () {
	
	//gulp.src('./data/*.json')
		//.pipe(concat_json("alldata.json"))
		//.pipe(gulp.dest('./site/'));

//});

gulp.task('compile-menu', function () {
	
	gulp.src('./config/*.json')
		.pipe(twig('./layouts/nav.html'))
		.pipe(gulp.dest('./layouts/'));

});

gulp.task('compile-pages', function () {
	
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

gulp.task('default', ['compile', 'copy-assets', 'copy-admin', 'copy-data']);
