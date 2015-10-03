'use strict';

var Backbone = require('backbone');
require('jquery');

var _ = require('lodash');
var key = require('keymaster');

var SignupModel = require('../models/signup');

$.superTerrificHappyApp = require('../lib/super-terrific-happy-app');

module.exports = Backbone.View.extend({ 
    
	template: require('../templates/signup'),

    events:{
        'click button': 'signup',
        'touchend button': 'signup'
    },

    initialize: function() {
        this.model = new SignupModel();
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

    signup: function(e){
        e.preventDefault();
        window.location.hash = '#event';
    },
 
    superTerrificHappyApp: function () {
       
    }
});