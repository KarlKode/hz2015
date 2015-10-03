'use strict';

var Backbone = require('backbone');
require('jquery');
Backbone.$ = $;

var superTerrificHappyAppView = require('./views/super-terrific-happy-app');
var superTerrificHappyAppModel = require('./models/super-terrific-happy-app');

module.exports = Backbone.Router.extend({

    routes: {
        '' : 'index'
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
        this.trigger('router:showView', new superTerrificHappyAppView({ model: new superTerrificHappyAppModel() }));
    }

});