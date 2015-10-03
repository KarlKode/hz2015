'use strict';

var changed    = require('gulp-changed');
var gulp       = require('gulp');
var config     = require('../config').font;
var browserSync  = require('browser-sync');

gulp.task('font', ['clean'], function() {
  return gulp.src(config.src)
    .pipe(changed(config.dest)) // Ignore unchanged files
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({stream:true}));
});
