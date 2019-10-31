'use strict';

const { src, dest, series, parallel, task }  = require('gulp');
const config = require('./config.js');
const paths = config.paths;
const project = config.project;

const sftp         = require('gulp-sftp');           // SFTP.

/**
  * Remove files for a fresh start.
  */
function ftp() {

  return src(paths.dist + '/**')
    .pipe(sftp({
      host:     '',
      user:     '',
      password: '',
      remotePath: project.ftpPath
    }));


}

exports.run = ftp;
