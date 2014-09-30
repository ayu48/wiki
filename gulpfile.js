// gulpfile.js

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');

gulp.task('lint', function() {
  return gulp.src(['./src/**/*.js', '*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

// compile less files into compressed css
gulp.task('build-less', function() {
    return gulp.src('./public/less/bootstrap.less')
        .pipe(less())
        .pipe(minifyCSS({keepBreaks:false}))
        .pipe(gulp.dest('./public/css'));
});

 gulp.task('watch', function() {
     gulp.watch(['./public/less/**/*.less'], ['build-less']);
 });

gulp.task('default', ['lint']);

