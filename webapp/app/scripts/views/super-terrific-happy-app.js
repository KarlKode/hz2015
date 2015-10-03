'use strict';

var Backbone = require('backbone');
require('jquery');

var _ = require('lodash');
var key = require('keymaster');

$.superTerrificHappyApp = require('../lib/super-terrific-happy-app');

module.exports = Backbone.View.extend({
	el: '#super-terrific-happy-app',
    
	template: require('../templates/super-terrific-happy-app'),

    events: {
        'click .fixed-action-btn' :'open'
    },

    initialize: function() {
        this.listenTo(this.model, 'change:super-terrific-happy-app', this.render); 

        _.bindAll(this, 'superTerrificHappyApp');

        key('enter', 'app', _.bind(this.superTerrificHappyApp, this));

    },

    render: function() {
        console.log(this.model.toJSON());

        this.$el.html(this.template(this.model.toJSON()));
        this.$('.parallax img').css({'max-height':$(document).height()+100});
        this.$('.parallax').parallax();
        return this;
    },

    open: function(el){
        e.preventDefault();
        this.$('.fixed-action-btn').openFAB();
    },

    superTerrificHappyApp: function () {
       
    }
});