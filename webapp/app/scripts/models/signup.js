'use strict';

var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
    defaults: {
        title: 'Yassin2'
    },

    initialize: function() {
        
    },

    urlRoot: '',

    // validate: function(attrs, options) {
    
    // },

    parse: function(response)  {
        return response;
    }
});