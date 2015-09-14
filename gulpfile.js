var gulp = require('gulp');

var browserSync = require('browser-sync');
var less = require('gulp-less');
// var rename = require('gulp-rename');
var shell = require('gulp-shell');
// var uglify = require('gulp-uglify');
var webpack = require('gulp-webpack');
var webpackConfig = require('./webpack.config.js');

gulp.task('webpack-app', function() {
  return gulp.src('./src/js/index.js')
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
});

gulp.task('serve', ['webpack-app', 'less'], function(){
  browserSync.init({
    open: false,
    server: './dist'
  });

  gulp.watch('src/less/**/*.less', ['less']);
  gulp.watch('src/js/**/*.js', ['webpack-app']);
  gulp.watch('src/*.html').on('change', browserSync.reload);
});

gulp.task('less', function () {
  return gulp.src('./src/less/base.less')
    .pipe(less())
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('test', shell.task('karma start', {
  // Task doesn't error when tests fail
}));


gulp.task('default', [ 'serve' ], function() {
});
