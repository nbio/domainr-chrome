/* globals process, console */
'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var replace = require('gulp-replace');
var del = require('del');
var httpServer = require('http-server');
var openBrowser = require('opener');
var minifyCss = require('gulp-minify-css');

var dest = './build/';
var apiKey = process.env.DOMAINR_CHROME_API_KEY;

// ----------
gulp.task('serve', ['watch'], function() {
  var port = process.env.PORT || 3102;
  var server = httpServer.createServer();
  return server.listen(port, 'localhost', function () {
    console.log('Server listening at http://localhost:' + port);
    openBrowser('http://localhost:' + port + '/domainr.html');
  });
});

// ----------
gulp.task('watch', ['build'], function() {
  return gulp.watch(['js/*.*', 'stylesheets/*.*'], ['build']);
});

// ----------
gulp.task('js', function() {
  var scripts = [
    './node_modules/domainr-search-box/dist/domainr-search-box.min.js',
    './js/script.js'
  ];

  return gulp.src(scripts)
    .pipe(uglify())
    .pipe(concat('script.js'))
    .pipe(replace(/{your-api-key-goes-here}/g, apiKey))
    .pipe(gulp.dest(dest));
});

// ----------
gulp.task('css', function() {
  var styles = [
    './node_modules/domainr-search-box/dist/domainr-search-box.css',
    './stylesheets/styles.css'
  ];

  return gulp.src(styles)
    .pipe(minifyCss())
    .pipe(concat('styles.css'))
    .pipe(gulp.dest(dest));
});

// ----------
gulp.task('clean', function () {
  return del([
    'build/**/*'
  ]);
});

// ----------
gulp.task('build', ['clean', 'js', 'css']);

// ----------
gulp.task('default', ['serve']);
