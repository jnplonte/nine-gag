var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');

gulp.task('default', function() {
	livereload.listen();
	nodemon({
		script: 'app.js',
		ext: 'js'
	}).on('restart', function(){
		gulp.src('app.js, scripts/**/*.js')
			.pipe(livereload());
	});
});
