'use strict';

require('materialize-js');
var jQBridget = require('jquery-bridget');
var Masonry = require('masonry-layout');
// make Masonry a jQuery plugin
$.bridget( 'masonry', Masonry );

function init() {
	function success(){ 
	}
    if(isAndroid()){
    	$.ajax({
		  url: "cordova/android/cordova.js",
		  dataType: "script",
		  success: success
		});
    }else if(isiOS()){
    	$.ajax({
		  url: "cordova/ios/cordova.js",
		  dataType: "script",
		  success: success
		});	
    }

     document.addEventListener("deviceready", onDeviceReady, false);
}

function isAndroid(){
    return navigator.userAgent.indexOf("Android") > 0;
}

function isiOS(){
    return ( navigator.userAgent.indexOf("iPhone") > 0 || navigator.userAgent.indexOf("iPad") > 0 || navigator.userAgent.indexOf("iPod") > 0); 
}

function onDeviceReady(){ 
}

init();
var View = require('./views/content');

new View();