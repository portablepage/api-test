var gulp = require('gulp');
var twig = require('gulp-twig-pipe');
var jsonCombine = require('gulp-jsoncombine');

// run task per folder
var fs = require('fs');
var path = require('path');
var merge = require('merge-stream');

var scriptsPath = './posts/';

function getFolders(dir) {
    return fs.readdirSync(dir)
      .filter(function(file) {
        return fs.statSync(path.join(dir, file)).isDirectory();
    });
}


gulp.task('compile', function () {


  // this combines files per folder
  var folders = getFolders(scriptsPath);

  var tasks = folders.map(function(folder) { // loop through folders and assign to tasks var (which gets returned)

  	gulp.src('posts/'+folder+'/*.json') // important: return, otherwise the output file is not available

  	    	.pipe(jsonCombine(folder+".json",function(data){

  			var newdata = {}; // creating array key for posts
  			newdata['main'] = data;
      			return new Buffer(JSON.stringify(newdata));
   		}))
      .pipe(twig('./template/index.html'))
      .pipe(gulp.dest('./dist'));

  	}); // end loop


  return tasks;

});



gulp.task('copy-assets', function () {
	gulp.src(['./assets/**/*']).pipe(gulp.dest('./dist/assets'));
});


gulp.task('build', ['compile', 'copy-assets']);
