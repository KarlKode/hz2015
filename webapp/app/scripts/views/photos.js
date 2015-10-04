'use strict';

var Backbone = require('backbone');
require('jquery');
require('magnific-popup')
var Masonry = require('masonry-layout');
var _ = require('lodash');
var key = require('keymaster');
var imagesLoaded = require('imagesloaded');
var EventModel = require('../models/event');

$.superTerrificHappyApp = require('../lib/super-terrific-happy-app');
function uploadCanvasData(dataUrl)
{ 

    var blob = dataURItoBlob(dataUrl);

    var formData = new FormData();
    formData.append("image", blob);

    var request = new XMLHttpRequest();  
    request.onreadystatechange = function() {
        if (request.readyState == XMLHttpRequest.DONE ) {
           if(request.status == 200){
               var img = JSON.parse(request.responseText); 
                window.image_url = img.url;
                if(window.image_wait!=null){
                    window.image_wait()
                }
           }
           else if(request.status == 400) {
              alert('There was an error 400')
           }
           else {
               alert('something else other than 200 was returned '+request.status)
           }
        }
    }

    request.open("POST", window.upload+"upload");
    request.send(formData);
}

function dataURItoBlob(dataURI)
{
    var byteString = atob(dataURI.split(',')[1]);

    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++)
    {
        ia[i] = byteString.charCodeAt(i);
    }

    var bb = new Blob([ab], { "type": mimeString });
    return bb;
}



module.exports = Backbone.View.extend({ 
    
	template: require('../templates/photos'),

    className: 'darkbackground',

    events:{
        'click .infos': 'infos',
        'touchend .infos': 'infos',
        'click .audioTrack': 'audioTrack',
        'touchend .audioTrack': 'audioTrack',
        'click .takePhoto': 'takePhoto',
        'touchend .takePhoto': 'takePhoto',
        'click .up': 'up',
        'touchend .up': 'up'
    },

    audioTrack:function(e){
        e.preventDefault();
        this.$el.toggleClass("showSong");
    },


    up:function(e){
        e.preventDefault();
        this.$(e.target).closest('a').click();
    },

 
    initialize: function() {
        this.model = new EventModel();
        this.listenTo(window.photos, 'add', this.addPhoto); 

        _.bindAll(this, 'superTerrificHappyApp');

        key('enter', 'app', _.bind(this.superTerrificHappyApp, this));

    },

    render: function() { 

        this.$el.html(this.template({
            photos: _(window.photos.toJSON()).reverse().value()
        }));
         var grid = this.$('.grid')[0];

        var msnry = new Masonry( grid, {
                columnWidth: '.grid-item'
        });

        imagesLoaded( grid, function() {
        // layout Masonry after each image loads
        msnry.layout();
        });
        var self = this;
        this.$('.grid .grid-item, .map, .pay').magnificPopup({
          type: 'image',
          mainClass: 'mfp-with-zoom', // this class is for CSS animation below

          zoom: {
            enabled: true, // By default it's false, so don't forget to enable it

            duration: 300, // duration of the effect, in milliseconds
            easing: 'ease-in-out', // CSS transition easing function

            // The "opener" function should return the element from which popup will be zoomed in
            // and to which popup will be scaled down
            // By defailt it looks for an image tag:
            opener: function(openerElement) {
              self.$el.removeClass("showSong");     
              var op = openerElement.is('img') ? openerElement : openerElement.find('img');
               
                return op.length==0?openerElement:op;
            }
          }

        });
        this.msnry = msnry;
        return this;
    },

    addPhoto: function(m){
        var item =$('<a class="photo grid-item" href="'+m.get('url')+'"><img src="'+m.get('url')+'" /></a>');
        this.$('.grid').prepend(item);
        var self = this;
        item.magnificPopup({
          type: 'image',
          mainClass: 'mfp-with-zoom', // this class is for CSS animation below

          zoom: {
            enabled: true, // By default it's false, so don't forget to enable it

            duration: 300, // duration of the effect, in milliseconds
            easing: 'ease-in-out', // CSS transition easing function

            // The "opener" function should return the element from which popup will be zoomed in
            // and to which popup will be scaled down
            // By defailt it looks for an image tag:
            opener: function(openerElement) {
              self.$el.removeClass("showSong");     
              var op = openerElement.is('img') ? openerElement : openerElement.find('img');
               
                return op.length==0?openerElement:op;
            }
          }

        });
        var msnry = this.msnry;
        imagesLoaded( item[0], function() {
            // layout Masonry after each image loads
            msnry.prepended(item[0]);  
        }); 
    },
 

    takePhoto: function(e){
        e.preventDefault();
        window.image = null;
        window.image_url = null;
        window.image_wait = null;
        function onSuccess(imageData) { 
            window.image = "data:image/jpeg;base64," + imageData;
            uploadCanvasData(window.image);
            window.location.hash = "#share";

        }

        function onFail(message) {
            alert('Failed because: ' + message);
        }  
        navigator.camera.getPicture(onSuccess, onFail, { quality: 70,
            destinationType: Camera.DestinationType.DATA_URL
        });
    },
 
 
    superTerrificHappyApp: function () {
       
    }
});