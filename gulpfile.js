var gulp = require('gulp');

var browserSync = require('browser-sync');
var less = require('gulp-less');
// var rename = require('gulp-rename');
var shell = require('gulp-shell');
// var uglify = require('gulp-uglify');
var webpack = require('gulp-webpack');

var configApp = {
  devtool: 'source-map',
  output: {
    filename: 'tripleo_ui.js',
    sourceMapFilename: '../js/ripleo_ui.js.map'
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
  return gulp.src('./src/js/index.js')
    .pipe(webpack(configApp))
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
});

gulp.task('serve', ['webpack-app', 'less'], function(){
  browserSync.init({
    open: false,
    server: './dist'
  });

  gulp.watch('src/less/*.less', ['less']);
  gulp.watch('src/js/**/*.js', ['webpack-app']);
  gulp.watch('src/*.html').on('change', browserSync.reload);
});

gulp.task('less', function () {
  return gulp.src('./src/less/base.less')
    .pipe(less())
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('jest', shell.task('npm test', {
  // Task doesn't error when tests fail
  ignoreErrors: true
}));

gulp.task('test', ['jest'], function() {
  gulp.watch(['src/js/**/*.js','src/__tests__/**/*.js'], ['jest']);
});

gulp.task('default', [ 'serve' ], function() {
});
