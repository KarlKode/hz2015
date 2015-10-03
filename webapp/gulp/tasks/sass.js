'use strict';

var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var sass 		 = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var handleErrors = require('../util/handleErrors');
var config       = require('../config').sass;
var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', ['clean'], function () {
  return gulp.src(config.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', handleErrors))
    .pipe(sourcemaps.write({
    	sourceRoot: function() { // set this when use less that's outside of the app directory (in node_modules, etc)
	        return './';
	    }
	}))
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({stream:true}));
});
