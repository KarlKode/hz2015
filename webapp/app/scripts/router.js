'use strict';

var Backbone = require('backbone');
require('jquery');
Backbone.$ = $;

var EventView = require('./views/event');
var ShareView = require('./views/share');
var PhotosView = require('./views/photos');

module.exports = Backbone.Router.extend({

    routes: {
        '' : 'index',
        'share': 'share',
        'photos': 'photos'
    },


    initialize: function () {
        this.history = [];
        this.on('route', function (name, params) {
            var route = {
                name: name,
                params: params,
                fragment: Backbone.history.fragment
            };
            this.history.push(route);
        }, this);
    },

    /*==============================
    =            Routes            =
    ==============================*/

    // # (/)
    index: function () {
        this.trigger('router:showView', new EventView());
    },

    // # (/share)
    share: function () {
        this.trigger('router:showView', new ShareView());
    },

    // # (/share)
    photos: function () {
        this.trigger('router:showView', new PhotosView());
    }
});