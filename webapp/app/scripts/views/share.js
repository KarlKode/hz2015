'use strict';

var Backbone = require('backbone');
require('jquery');

var d3 = require('d3');
var _ = require('lodash');
var key = require('keymaster');

var EventModel = require('../models/event');

$.superTerrificHappyApp = require('../lib/super-terrific-happy-app');

// For the force layout:
var padding = 1;
var radius = 55;
var pack = d3.layout.pack()
    .sort(null)
    .size([100, 100])
    .radius(function(d) { return d + padding; });
var origin;

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

        var avatarUrls = [
            'https://s3.amazonaws.com/uifaces/faces/twitter/ok/128.jpg',
            'https://s3.amazonaws.com/uifaces/faces/twitter/spiltmilkstudio/128.jpg',
            'https://s3.amazonaws.com/uifaces/faces/twitter/adellecharles/128.jpg',
            'https://s3.amazonaws.com/uifaces/faces/twitter/sauro/128.jpg'
        ];

        // Calculate positions for the faces
        var n = avatarUrls.length;
        var classes = { className:"", children: d3.range(n).map(function() { 
            return { className:"", packageName: "", value: radius }; }) 
        };

        var packed = pack(classes);

        origin = { left: $(document).width() / 2 - packed[0].r,
                   top: $(document).height() / 2 - packed[0].r };

        var avatars = packed.slice(1).map(function(d, i) {
                return {
                    url: avatarUrls[i],
                    transform: 'translate(' + (origin.left + d.x) + 'px, ' + (origin.top + d.y) + 'px)'
                };
            });

        this.$el.removeClass('show');
        this.$el.removeClass('done');
        this.$el.removeClass('ready');
        this.$el.html(this.template({ avatars: avatars })); 

        _.delay(function(self){
            self.$el.addClass('show');
        }, 50,  this);
        return this;
    },
    
    select: function(e){
        e.preventDefault();
        $(e.target).parent().toggleClass("select");
        this.$el.toggleClass("ready", this.$('.select').length>0);

        // Recalculate force layout
        var children = $('.face').map(function(d,i) {
            return { className:"", packageName:"", value: $(this).hasClass('select') ? radius * 1.25 : radius }; 
        }).toArray();
        var classes = { className:"", children: children };

        var packed = pack(classes);

        origin = { left: $(document).width() / 2 - packed[0].r,
                   top: $(document).height() / 2 - packed[0].r };

        packed.slice(1).forEach(function(d,i) {
            $('.face:eq('+i+')').css('transform', 'translate(' + (origin.left + d.x) + 'px, ' + (origin.top + d.y) + 'px)');
            $('.face:eq('+i+')').css('-webkit-transform', 'translate(' + (origin.left + d.x) + 'px, ' + (origin.top + d.y) + 'px)');
        });
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