'use strict';

const { src, dest, series, parallel, task }  = require('gulp');
const config = require('./config.js');
const paths = config.paths;
const project = config.project;

const $            = require('gulp-load-plugins')(), // Automatic plugins loads.
      log          = require('fancy-log');           // Logs.


/**
  * Copy statics ressources.
  */
function archive() {

  var now = new Date(),
      date = now.getFullYear() + '-' +
             ('0' + (now.getMonth() + 1)).slice(-2) + '-' +
             ('0' + now.getDate()).slice(-2) + '__' +
             ('0' + (now.getHours())).slice(-2) + 'h' +
             ('0' + (now.getMinutes())).slice(-2),
      zipName = date + '__' + project.namespace + '.zip';

  log(zipName);

  return src(['./**/', '!./node_modules/**', '!./node_modules'])
    .pipe($.zip(zipName))
    .pipe(dest('./'));

}

exports.run = archive;
