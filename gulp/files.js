'use strict';

const { watch, src, dest, series, parallel, task }  = require('gulp');
const config = require('./config.js');
const paths = config.paths;

const del          = require('del');                 // Remove files.


/**
  * Copy statics ressources.
  */
function statics(cb) {

  // Copy statics scripts.
  src(paths.js_src + '**')
    .pipe(dest(paths.js));

  // Copy statics fonts.
  src(paths.fonts_src + '**')
    .pipe(dest(paths.fonts));

  // Copy statics data.
  src(paths.root + '**')
    .pipe(dest(paths.dist));

  // Copy data.
  src(paths.data_src + '**')
    .pipe(dest(paths.data));

  cb();

}


// Remove files for a fresh start.
function clean() {

  return del([
    'dist/',
    'backstop/'
  ]);

}


function staticsWatch() {
  watch([
    paths.fonts_src + '**/*',
    paths.js_src + '**/*.js',
    paths.data + '**/*',
    paths.root + '**/*'
  ], { ignoreInitial: false }, statics)
}


exports.statics = statics;
exports.clean = clean;
exports.watch = staticsWatch;
