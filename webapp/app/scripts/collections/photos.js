'use strict';

var Backbone = require('backbone');
 

module.exports = Backbone.Collection.extend({
    model: Backbone.Model,

    url: '',

    initialize: function() {
        // this.on('reset', function (collection) {
           
        // });
    },

    parse: function(response)  {
        return response;
    }
});