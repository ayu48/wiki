// gulpfile.js

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var mocha = require('gulp-mocha');

gulp.task('lint', function() {
  return gulp.src(['./src/**/*.js', '*.js', './test/**/*.js'])
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

gulp.task('test', function() {
    return gulp.src('test/**/*.js', {read:false})
        .pipe(mocha({reporter: 'spec'}));
});

gulp.task('default', ['lint', 'test']);

