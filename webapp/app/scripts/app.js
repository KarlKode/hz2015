'use strict';
require('materialize-js');
var jQBridget = require('jquery-bridget');
var Masonry = require('masonry-layout');
// make Masonry a jQuery plugin
$.bridget( 'masonry', Masonry );

var View = require('./views/content');

new View();