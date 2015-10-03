'use strict';

var Backbone = require('backbone');
require('jquery');

var _ = require('lodash');
var key = require('keymaster');
var imagesLoaded = require('imagesloaded');
var EventModel = require('../models/event');

$.superTerrificHappyApp = require('../lib/super-terrific-happy-app');

module.exports = Backbone.View.extend({
	el: '#appview',
    
	template: require('../templates/photos'),
 
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
                {url:'https://images.unsplash.com/17/unsplash_5252bb51404f8_1.JPG?q=80&fm=jpg&s=969ecc1855916814e3463a4ab256a4ea'},
                {url:'https://images.unsplash.com/photo-1429514513361-8fa32282fd5f?q=80&fm=jpg&s=4d4414457de5ce31c7e26a9373d55eed'},
                {url:'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&fm=jpg&s=a32e89a1d70a07c451b2c3652662c9ba'},
                {url:'https://images.unsplash.com/13/unsplash_523b1f5aafc42_1.JPG?q=80&fm=jpg&s=682a413498f490307cbb324ed753cb24'},
                {url:'https://images.unsplash.com/uploads/1411160110892ab555b6f/80b0d25e?q=80&fm=jpg&s=8099617fe4a2a8753457a018bb736131'},
                {url:'https://images.unsplash.com/photo-1430984890041-11a0d4ccdca4?q=80&fm=jpg&s=f5f6637d1d33d916bc29f5be9a9d9e18'},
                {url:'https://images.unsplash.com/46/dpzDUkJrTHb71Yla1EzF_IMG_4098.jpg?q=80&fm=jpg&s=bca2374bb7eb4b710c41675ef068ac3c'},
                {url:'https://images.unsplash.com/46/unsplash_52c319226cefb_1.JPG?q=80&fm=jpg&s=b07cdc1f522e977fda8cc7ee63848f4d'},

                {url:'https://images.unsplash.com/17/unsplash_5252bb51404f8_1.JPG?q=80&fm=jpg&s=969ecc1855916814e3463a4ab256a4ea'},
                {url:'https://images.unsplash.com/photo-1429514513361-8fa32282fd5f?q=80&fm=jpg&s=4d4414457de5ce31c7e26a9373d55eed'},
                {url:'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&fm=jpg&s=a32e89a1d70a07c451b2c3652662c9ba'},
                {url:'https://images.unsplash.com/13/unsplash_523b1f5aafc42_1.JPG?q=80&fm=jpg&s=682a413498f490307cbb324ed753cb24'},
                {url:'https://images.unsplash.com/uploads/1411160110892ab555b6f/80b0d25e?q=80&fm=jpg&s=8099617fe4a2a8753457a018bb736131'},
                {url:'https://images.unsplash.com/photo-1430984890041-11a0d4ccdca4?q=80&fm=jpg&s=f5f6637d1d33d916bc29f5be9a9d9e18'},
                {url:'https://images.unsplash.com/46/dpzDUkJrTHb71Yla1EzF_IMG_4098.jpg?q=80&fm=jpg&s=bca2374bb7eb4b710c41675ef068ac3c'},
                {url:'https://images.unsplash.com/46/unsplash_52c319226cefb_1.JPG?q=80&fm=jpg&s=b07cdc1f522e977fda8cc7ee63848f4d'},

                {url:'https://images.unsplash.com/17/unsplash_5252bb51404f8_1.JPG?q=80&fm=jpg&s=969ecc1855916814e3463a4ab256a4ea'},
                {url:'https://images.unsplash.com/photo-1429514513361-8fa32282fd5f?q=80&fm=jpg&s=4d4414457de5ce31c7e26a9373d55eed'},
                {url:'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&fm=jpg&s=a32e89a1d70a07c451b2c3652662c9ba'},
                {url:'https://images.unsplash.com/13/unsplash_523b1f5aafc42_1.JPG?q=80&fm=jpg&s=682a413498f490307cbb324ed753cb24'},
                {url:'https://images.unsplash.com/uploads/1411160110892ab555b6f/80b0d25e?q=80&fm=jpg&s=8099617fe4a2a8753457a018bb736131'},
                {url:'https://images.unsplash.com/photo-1430984890041-11a0d4ccdca4?q=80&fm=jpg&s=f5f6637d1d33d916bc29f5be9a9d9e18'},
                {url:'https://images.unsplash.com/46/dpzDUkJrTHb71Yla1EzF_IMG_4098.jpg?q=80&fm=jpg&s=bca2374bb7eb4b710c41675ef068ac3c'},
                {url:'https://images.unsplash.com/46/unsplash_52c319226cefb_1.JPG?q=80&fm=jpg&s=b07cdc1f522e977fda8cc7ee63848f4d'},
            ]
        }));

        var $grid = this.$('.grid')
        imagesLoaded($grid, function() {
  // init Masonry after all images have loaded
            $grid.masonry({ 
                columnWidth: '.grid-item',

            });
        }); 
        return this;
    },
 
 
    superTerrificHappyApp: function () {
       
    }
});