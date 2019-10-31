'use strict';

const { watch, parallel, task, gulp }  = require('gulp');
const packageJSON = require('./package.json');
const context = packageJSON.config.context;


/* =============================================================================
   Tasks
============================================================================= */

const files = require('./gulp/files.js');
const css = require('./gulp/css.js');
const html = require('./gulp/html.js');
const js = require('./gulp/js.js');
const images = require('./gulp/images.js');
const browser = require('./gulp/browser.js');
const archive = require('./gulp/archive.js');
const ftp = require('./gulp/ftp.js');


function watcher(cb) {

  //{ ignoreInitial: false }
  css.watch();
  js.watch();
  html.watch();
  files.watch();
  images.watch();

  cb();

}

/* =============================================================================
   Export
============================================================================= */

module.exports = {
  clean: files.clean,
  archive: archive.run,
  ftp: ftp.run,
  default: parallel(browser.run, watcher)
}

if (context == 'drupal') {
  // Do not run some tasks in a Drupal context.
  module.exports.default = watcher;
}
