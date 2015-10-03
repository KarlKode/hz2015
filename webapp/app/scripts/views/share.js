'use strict';

var Backbone = require('backbone');
require('jquery');

var _ = require('lodash');
var key = require('keymaster');

var EventModel = require('../models/event');

$.superTerrificHappyApp = require('../lib/super-terrific-happy-app');

module.exports = Backbone.View.extend({
	el: '#appview',
    
	template: require('../templates/share'), 

    events: {
        'click .face img': 'select',
         'touchend .face img': 'select',
        'click .sendNow': 'sendNow',
         'touchend .sendNow': 'sendNow'
    },

    initialize: function() {
        this.model = new EventModel();
        this.listenTo(this.model, 'change:super-terrific-happy-app', this.render); 

        _.bindAll(this, 'superTerrificHappyApp');

        key('enter', 'app', _.bind(this.superTerrificHappyApp, this));

    },

    render: function() {
        console.log(this.model.toJSON());

        this.$el.removeClass('show');
        this.$el.removeClass('done');
        this.$el.removeClass('ready');
        this.$el.html(this.template({
            avatars: [
                {url:'https://s3.amazonaws.com/uifaces/faces/twitter/ok/128.jpg'},
                {url:'https://s3.amazonaws.com/uifaces/faces/twitter/spiltmilkstudio/128.jpg'},
                {url:'https://s3.amazonaws.com/uifaces/faces/twitter/adellecharles/128.jpg'},
                {url:'https://s3.amazonaws.com/uifaces/faces/twitter/sauro/128.jpg'},
            ]
        })); 
        _.delay(function(self){
            self.$el.addClass('show');
        }, 50,  this);
        return this;
    },
    
    select: function(e){
        e.preventDefault();
        $(e.target).parent().toggleClass("select");
        this.$el.toggleClass("ready", this.$('.select').length>0);
    },

    sendNow: function(e){
        e.preventDefault();
        this.$el.removeClass('ready');
        this.$el.addClass('done');
        _.delay(function(){
            window.location.hash = '#photos';
        }, 2000)
    },
    superTerrificHappyApp: function () {
       
    }
});