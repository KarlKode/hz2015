'use strict';

var Backbone = require('backbone');
require('jquery');

var _ = require('lodash');
var key = require('keymaster');

var EventModel = require('../models/event');

$.superTerrificHappyApp = require('../lib/super-terrific-happy-app');

module.exports = Backbone.View.extend({
	el: '#appview',
    
	template: require('../templates/event'),

    events:{
        'click button': 'share',
        'touchend button': 'share'
    },

    initialize: function() {
        this.model = new EventModel();
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

    share: function(){
        window.location.hash = '#share';
    },
 
    superTerrificHappyApp: function () {
       
    }
});