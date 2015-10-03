'use strict';

require('materialize-js');
var jQBridget = require('jquery-bridget');
var Masonry = require('masonry-layout');
// make Masonry a jQuery plugin
$.bridget( 'masonry', Masonry );

var _ = require('lodash');
 document.addEventListener("deviceready", onDeviceReady, false);
 
function onDeviceReady(){ 

	function onSuccess(contacts) {
		contacts = _.filter(contacts, function(x){
			return x.phoneNumbers!=null;
		});
		alert(JSON.stringify(contacts));
    alert('Found ' + contacts.length + ' contacts.');
	};

	function onError(contactError) {
	    alert('onError!');
	};
	// find all contacts with 'Bob' in any name field
	var options      = new ContactFindOptions(); 
	options.multiple = true;  
	var fields       = [navigator.contacts.fieldType.phoneNumbers, navigator.contacts.fieldType.name];
	navigator.contacts.find(fields, onSuccess, onError, options);  
}
 
var View = require('./views/content');

new View();