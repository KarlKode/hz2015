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

module.exports = Backbone.View.extend({ 
    
	template: require('../templates/photos'),

    className: 'darkbackground',

    events:{
        'click .infos': 'infos',
        'touchend .infos': 'infos',
        'click .audioTrack': 'audioTrack',
        'touchend .audioTrack': 'audioTrack',
        'click .takePhoto': 'takePhoto',
        'touchend .takePhoto': 'takePhoto'
    },

    audioTrack:function(e){
        e.preventDefault();
        this.$el.toggleClass("showSong");
    },

 
    initialize: function() {
        this.model = new EventModel();
        this.listenTo(this.model, 'change:super-terrific-happy-app', this.render); 

        _.bindAll(this, 'superTerrificHappyApp');

        key('enter', 'app', _.bind(this.superTerrificHappyApp, this));

    },

    render: function() {
        console.log(this.model.toJSON());

        this.$el.html(this.template({
            photos: [
                
                {url:'https://8z388m1yi2vn.firesize.com/500x500/g_none/https://images.unsplash.com/photo-1429514513361-8fa32282fd5f?q=80&fm=jpg&s=4d4414457de5ce31c7e26a9373d55eed'},
                
                {url:'https://8z388m1yi2vn.firesize.com/500x500/g_none/https://images.unsplash.com/13/unsplash_523b1f5aafc42_1.JPG?q=80&fm=jpg&s=682a413498f490307cbb324ed753cb24'},
                {url:'https://8z388m1yi2vn.firesize.com/500x500/g_none/https://images.unsplash.com/uploads/1411160110892ab555b6f/80b0d25e?q=80&fm=jpg&s=8099617fe4a2a8753457a018bb736131'},

                {url:'https://8z388m1yi2vn.firesize.com/500x500/g_none/https://images.unsplash.com/46/dpzDUkJrTHb71Yla1EzF_IMG_4098.jpg?q=80&fm=jpg&s=bca2374bb7eb4b710c41675ef068ac3c'},
                {url:'https://8z388m1yi2vn.firesize.com/500x500/g_none/https://images.unsplash.com/46/unsplash_52c319226cefb_1.JPG?q=80&fm=jpg&s=b07cdc1f522e977fda8cc7ee63848f4d'},

                
                {url:'https://8z388m1yi2vn.firesize.com/500x500/g_none/https://images.unsplash.com/photo-1429514513361-8fa32282fd5f?q=80&fm=jpg&s=4d4414457de5ce31c7e26a9373d55eed'},
                
                {url:'https://8z388m1yi2vn.firesize.com/500x500/g_none/https://images.unsplash.com/13/unsplash_523b1f5aafc42_1.JPG?q=80&fm=jpg&s=682a413498f490307cbb324ed753cb24'},
                {url:'https://8z388m1yi2vn.firesize.com/500x500/g_none/https://images.unsplash.com/uploads/1411160110892ab555b6f/80b0d25e?q=80&fm=jpg&s=8099617fe4a2a8753457a018bb736131'},

                {url:'https://8z388m1yi2vn.firesize.com/500x500/g_none/https://images.unsplash.com/46/dpzDUkJrTHb71Yla1EzF_IMG_4098.jpg?q=80&fm=jpg&s=bca2374bb7eb4b710c41675ef068ac3c'},
                {url:'https://8z388m1yi2vn.firesize.com/500x500/g_none/https://images.unsplash.com/46/unsplash_52c319226cefb_1.JPG?q=80&fm=jpg&s=b07cdc1f522e977fda8cc7ee63848f4d'},

                
                {url:'https://8z388m1yi2vn.firesize.com/500x500/g_none/https://images.unsplash.com/photo-1429514513361-8fa32282fd5f?q=80&fm=jpg&s=4d4414457de5ce31c7e26a9373d55eed'},
                
                {url:'https://8z388m1yi2vn.firesize.com/500x500/g_none/https://images.unsplash.com/13/unsplash_523b1f5aafc42_1.JPG?q=80&fm=jpg&s=682a413498f490307cbb324ed753cb24'},
                {url:'https://8z388m1yi2vn.firesize.com/500x500/g_none/https://images.unsplash.com/uploads/1411160110892ab555b6f/80b0d25e?q=80&fm=jpg&s=8099617fe4a2a8753457a018bb736131'},

                {url:'https://8z388m1yi2vn.firesize.com/500x500/g_none/https://images.unsplash.com/46/dpzDUkJrTHb71Yla1EzF_IMG_4098.jpg?q=80&fm=jpg&s=bca2374bb7eb4b710c41675ef068ac3c'},
                {url:'https://8z388m1yi2vn.firesize.com/500x500/g_none/https://images.unsplash.com/46/unsplash_52c319226cefb_1.JPG?q=80&fm=jpg&s=b07cdc1f522e977fda8cc7ee63848f4d'},
            ]
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
        this.$('.grid .grid-item').magnificPopup({
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
              // openerElement is the element on which popup was initialized, in this case its <a> tag
              // you don't need to add "opener" option if this code matches your needs, it's defailt one.
              return openerElement.is('img') ? openerElement : openerElement.find('img');
            }
          }

        });
        return this;
    },

    infos: function(e){
        e.preventDefault();
        this.$('.infos').openFAB();

    },

    takePhoto: function(e){
        e.preventDefault();

        function onSuccess(imageData) { 
            window.image = "data:image/jpeg;base64," + imageData;
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