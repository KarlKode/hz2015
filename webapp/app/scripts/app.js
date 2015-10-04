'use strict';
Raven.config('https://0e11573f9b43499790cbabf855256eb7@app.getsentry.com/54037').install()
window.upload = "https://images.ynh.io/"
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
	//var fields       = [navigator.contacts.fieldType.phoneNumbers, navigator.contacts.fieldType.name];
	screen.lockOrientation('portrait');
	//navigator.contacts.find(fields, onSuccess, onError, options);  
}
window.PUBNUB_demo = PUBNUB.init({
    publish_key: 'pub-c-f94af599-db48-45cf-a651-90372d325f89',
    subscribe_key: 'sub-c-561d9a76-6a20-11e5-a5be-02ee2ddab7fe'
}); 
var PhotoCollection = require('./collections/photos');
window.photos = new PhotoCollection( _([
                {url:'http://imgur.com/u87DoQL.jpg'},
{url:'http://imgur.com/iSNQW5i.jpg'},
{url:'http://imgur.com/zUqN7Tk.jpg'},
{url:'http://imgur.com/ZxrlGCO.jpg'},
{url:'http://imgur.com/HvXO5o1.jpg'},
{url:'http://imgur.com/R7oe12v.jpg'},
{url:'http://imgur.com/GrgAHBi.jpg'},
{url:'http://imgur.com/sN8QIKq.jpg'},
{url:'http://imgur.com/JZs2PeG.jpg'},
{url:'http://imgur.com/5mpJLHi.jpg'},
{url:'http://imgur.com/mP1uBkW.jpg'},
{url:'http://imgur.com/cACmyxe.jpg'},
{url:'http://imgur.com/adqLZzp.jpg'},
{url:'http://imgur.com/fUfvatu.jpg'},
{url:'http://imgur.com/rpbY79l.jpg'},
{url:'http://imgur.com/OWAiB0y.jpg'},
{url:'http://imgur.com/hBSlEKC.jpg'},
{url:'http://imgur.com/u1IVIGi.jpg'},
{url:'http://imgur.com/zdujPhn.jpg'},
{url:'http://imgur.com/c6v2iju.jpg'},
{url:'http://imgur.com/hZoaO6X.jpg'},
{url:'http://imgur.com/q5OXceq.jpg'},
{url:'http://imgur.com/XeISt4s.jpg'}
            ]).reverse().value());
window.PUBNUB_demo.subscribe({
    channel: 'photos',
    message: function(m){
    	window.photos.add([m]);
    }
});

 
var View = require('./views/content');

new View();