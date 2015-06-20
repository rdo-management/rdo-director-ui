var gulp = require('gulp');

var browserSync = require('browser-sync');
var webpack = require('gulp-webpack');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var less = require('gulp-less');

var configApp = {
  devtool: 'source-map',
  output: {
    filename: 'boxes.js',
    sourceMapFilename: '../js/boxes.js.map'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }//,
      // { test: /disqus-thread.js$/, loader: 'babel-loader' },
      // { test: /\.json$/, loader: 'json-loader' }
    ]
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};

gulp.task('webpack-app', function() {
  return gulp.src('./app/index.js')
    .pipe(webpack(configApp))
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
});

gulp.task('serve', ['webpack-app', 'less'], function(){
  browserSync.init({
    open: false,
    server: "./dist"
  });

  gulp.watch("app/less/*.less", ['less']);
  gulp.watch("app/**/*.js", ['webpack-app']);
  gulp.watch("app/*.html").on('change', browserSync.reload);
});

gulp.task('less', function () {
  return gulp.src('./app/less/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('default', [ 'serve' ], function() {
});
