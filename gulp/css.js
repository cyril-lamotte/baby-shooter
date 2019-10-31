'use strict';

const { watch, src, dest, series }  = require('gulp');
const config = require('./config.js');
const paths = config.paths;

const sass         = require('gulp-dart-sass'),      // Compile SASS code.
      postcss      = require('gulp-postcss'),        // Post CSS features.
      autoprefixer = require('autoprefixer'),        // Add browsers prefix.
      cleanCSS     = require('gulp-clean-css'),      // Minify CSS.
      sourcemaps   = require('gulp-sourcemaps'),     // Generate SASS sourcemap.
      ignore       = require('gulp-ignore'),         // Exclude files.
      stylelint    = require('gulp-stylelint'),      // CSS code quality.
      log          = require('fancy-log');           // Logs.

var browserSync = require('browser-sync').create();


/**
  * Build CSS
  *
  * SASS Compilation
  * Génération des sourcemaps
  * Autoprefixer
  */
 function CSS() {

  log('');
  log('');

  return src(paths.scss + '**/*.scss', { sourcemaps: true })
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: [
        paths.scss + 'abstract/',
        paths.scss + 'abstract/variables'
      ]
    }))
    .on('error', onError)
    .pipe(postcss([autoprefixer()]))
    .pipe(postcss([require('postcss-normalize')()]))
    .pipe(cleanCSS({
      compatibility: '*',
      format: false // 'beautify' | false
    }, function(details) { showCleanEffect(details); }))
    .pipe(sourcemaps.write('../../sources/maps'))
    .pipe(dest(paths.css))
    .pipe(browserSync.stream());

}


function showCleanEffect(details) {

  // Avoid sourcemap.
  if (details.name == undefined) {
    return;
  }

  var original_size = Math.round(details.stats.originalSize)/1024;
  var minified_size = Math.round(details.stats.minifiedSize)/1024;

  var message = details.name + ': ' +
                original_size.toFixed(2) +
                'ko >> min : ' +
                minified_size.toFixed(2) + 'ko';

  log(message);

}


function lintCSS() {

  return src(paths.scss + '**/*.scss')
    .pipe(ignore.exclude('**/_sprites.scss'))
    .pipe(stylelint({
      syntax: 'scss',
      fix: false,
      reporters: [
        {formatter: 'string', console: true}
      ]
    }));

}


// Errors managment
function onError(err) {
  log(err.message);
  this.emit('end');
}


function CSSwatch() {
  watch(paths.scss + '**/*.scss', { ignoreInitial: false }, series(CSS, lintCSS))
}


exports.build = series(CSS, lintCSS);
exports.watch = CSSwatch;
