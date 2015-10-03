'use strict';

var Backbone = require('backbone');

var superTerrificHappyAppModel = require('./models/super-terrific-happy-app');

module.exports = Backbone.Collection.extend({
    model: superTerrificHappyAppModel,

    url: '',

    initialize: function() {
        // this.on('reset', function (collection) {
           
        // });
    },

    parse: function(response)  {
        return response;
    }
});