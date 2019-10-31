'use strict';

const { watch, src, dest, series, parallel, lastRun}  = require('gulp');
const config = require('./config.js');
const paths = config.paths;

const spritesmith  = require('gulp.spritesmith'),    // Generate PNG sprites.
      buffer       = require('vinyl-buffer'),        // Convert streaming vinyl files to use buffers.
      svgstore     = require('gulp-svgstore'),       // Generate SVG sprites.
      svgmin       = require('gulp-svgmin'),         // Generate SVG sprites.
      imagemin     = require('gulp-imagemin'),       // Images optimisation.
      md5          = require('md5'),                 // MD5 hashing.
      fs           = require('fs'),
      merge        = require('merge-stream');


function sprites() {

  var cache_buster = 0;

  fs.readdirSync(paths.sprites).forEach(element => {
    var stats = fs.statSync(paths.sprites + element);
    cache_buster += stats.size;
  });

  cache_buster = md5(cache_buster).substr(0, 8);

  // Build PNG sprites.
  var spriteData = src(paths.sprites + '*.png')
      .pipe(spritesmith({
        imgName: '../img/sprites-' + cache_buster + '.png',
        imgPath: '../img/sprites-' + cache_buster + '.png',
        cssName: '_sprites.scss',
        padding: 5,
        cssOpts: {functions: false}
    }));

  // Optimize sprite.
  var imgStream = spriteData.img
    .pipe(buffer())
    .pipe(imagemin([
      imagemin.optipng()
    ], {
      'verbose' : false
    }))
    .pipe(dest(paths.img));

  var cssStream = spriteData.css
    .pipe(dest(paths.scss + 'abstract/variables'));


  // Build SVG sprites.
  src(paths.svgSprites + '*.svg')
    .pipe(svgmin(function getOptions(file) {
      //var prefix = path.basename(file.relative, path.extname(file.relative));
      return {
        plugins: [{
          cleanupIDs: {
            minify: true
          }
        }]
      }
    }))
    .pipe(svgstore())
    .pipe(dest(paths.img));



  // Return a merged stream to handle both `end` events
  return merge(imgStream, cssStream);
}


function optimizeImages() {

  return src(paths.img_src + '**', { since: lastRun(optimizeImages) })
    .pipe(imagemin([
      imagemin.gifsicle(),
      imagemin.jpegtran(),
      imagemin.optipng(),
      imagemin.svgo()
    ], {
      'verbose' : false
    }))
    .pipe(dest(paths.img));

}

function IMGwatch() {
  watch(paths.img_src + '**/*', { ignoreInitial: false }, optimizeImages)
  watch(paths.sprites + '*.png', { ignoreInitial: false }, sprites)
  watch(paths.svgSprites + '*.svg', { ignoreInitial: false }, sprites)
}

exports.build = parallel(sprites, optimizeImages);
exports.watch = IMGwatch;
