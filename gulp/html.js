'use strict';

const { watch, src, dest, series, parallel }  = require('gulp');
const config = require('./config.js');
const paths = config.paths;

const fileinclude  = require('gulp-file-include');   // HTML includes.

var browserSync = require('browser-sync').create();

function HTML() {

  return src([
    paths.html + '**/*.html',
    '!' + paths.html + 'includes/**/*.html'
  ])
  .pipe(fileinclude({
    prefix: '<!-- @@',
    suffix: '-->',
    basepath: '@file',
    indent: true
  }))
  .pipe(dest(paths.dist))
  .pipe(browserSync.stream());

}

function HTMLwatch() {

  // Static mockup only.
  var html_paths = [
    paths.html + '**/*.html',
    '!' + paths.html + '**/*Copie.html'
  ];

  watch(html_paths, { ignoreInitial: false }, HTML);

}

exports.build = HTML;
exports.watch = HTMLwatch;
