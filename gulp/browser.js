'use strict';

const { src, dest, series, parallel, task }  = require('gulp');
const config = require('./config.js');
const paths = config.paths;

var browserSync = require('browser-sync').create();

/**
  * Copy statics ressources.
  */
function browser(cb) {

  browserSync.init({
    open: false,
    server: {
      baseDir: paths.dist
    },
    ui: false
  });

  cb();

}

exports.run = browser;
