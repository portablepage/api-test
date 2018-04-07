var gulp = require('gulp');
var twig = require('gulp-twig-pipe');
var runSequence = require('run-sequence');
var concat_json = require("gulp-concat-json");



gulp.task('compile', function(done) {
    runSequence('combine-json', 'compile-twig', function() {
        console.log('Run something else');
        done();
    });
});

gulp.task('combine-json', function () {
	
	gulp.src('./data/*.json')
		.pipe(concat_json("./config/pages.json"))
		.pipe(gulp.dest('./data/'));

});

gulp.task('compile-twig', function () {
	
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

//gulp.task('copy-data', function () {
	//gulp.src(['./data/**/*']).pipe(gulp.dest('./site/data'));
//});

gulp.task('copy-layouts', function () {
	gulp.src(['./layouts/**/*']).pipe(gulp.dest('./site/layouts'));
});

gulp.task('default', ['compile', 'copy-assets', 'copy-admin', 'copy-layouts']);
