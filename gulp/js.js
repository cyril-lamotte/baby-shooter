'use strict';

const { watch, src, dest, series, parallel }  = require('gulp');
const config = require('./config.js');
const paths = config.paths;

const concat       = require('gulp-concat-util'),    // Concat files.
      ignore       = require('gulp-ignore'),         // Exclude files.
      jshint       = require('gulp-jshint'),         // JS Code quality.
      minify       = require('gulp-minify');         // Minify JS.


function JShint() {
  return src(paths.js_src + '**/*.js')
    .pipe(ignore.exclude('**/contrib/*.js'))
    .pipe(ignore.exclude('**/*.min.js'))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
}


function JSwatch() {
  watch(paths.js_src + '**/*.js', { ignoreInitial: false }, series(JShint))
}


exports.build = JShint;
exports.buildConcat = series(JShint);
exports.watch = JSwatch;
