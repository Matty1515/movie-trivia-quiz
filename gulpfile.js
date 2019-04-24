// Gulp requirements
var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var webserver = require('gulp-webserver');

// Converts all sass files into css files
gulp.task('sass', function() {
	return gulp.src('docs/scss/**/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('docs/css'));
});

// Watches for changes in all scss files and executes gulp sass
gulp.task('watch-sass', function() {
	gulp.watch('docs/scss/**/*.scss', gulp.series('sass'));
});

// Converts all jsx files into vanilla javascript files
gulp.task('react', function() {
	return gulp.src('docs/jsx/**/*.js')
		.pipe(babel())
		.pipe(gulp.dest('docs/js'));
});

// Watches for changes in all js files in jsx/ and executes gulp react
gulp.task('watch-react', function() {
	gulp.watch('docs/jsx/**/*.js', gulp.series('react'));
});

// Creates a webserver at http://localhost:8000/
gulp.task('webserver', function() {
  gulp.src('docs/')
    .pipe(webserver({
      livereload: true,
      port: 8000,
      open: true
    }));
});

// Runs webserver, watch-sass and watch-react together as the default task
gulp.task('default', gulp.parallel('webserver', 'watch-sass', 'watch-react'));