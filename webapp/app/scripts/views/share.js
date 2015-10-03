'use strict';

var Backbone = require('backbone');
require('jquery');

var d3 = require('d3');
var _ = require('lodash');
var key = require('keymaster');

var EventModel = require('../models/event');

$.superTerrificHappyApp = require('../lib/super-terrific-happy-app');

// For the force layout:
var padding = 10;
var radius = 128/2;
var pack = d3.layout.pack()
    .sort(null)
    .size([100, 100])
    .radius(function(d) { return d  + padding; });
var origin;

module.exports = Backbone.View.extend({
    
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
            'https://s3.amazonaws.com/uifaces/faces/twitter/adellecharles/128.jpg',
            'https://s3.amazonaws.com/uifaces/faces/twitter/sauro/128.jpg',
            'https://s3.amazonaws.com/uifaces/faces/twitter/sauro/128.jpg'
        ];

        // Calculate positions for the faces 
        this.classes = { className:"", children: _.map(avatarUrls, function(d) { 
            return {url: d, className:"", packageName: "", value: radius*0.6, selected: false }; }) 
        };

        var packed = pack(this.classes);

        this.$el.removeClass('show');
        this.$el.removeClass('done');
        this.$el.removeClass('ready');
        this.$el.html(this.template({ avatars: avatarUrls })); 
        this.update_ui(packed);

        _.delay(function(self){
            self.$el.addClass('show');
        }, 50,  this);
        if(window.image){
            this.$('.shareBackground').css({'background-image':'url('+window.image+')'})
        }
        return this;
    },
    
    select: function(e){
        e.preventDefault();
        $(e.target).parent().toggleClass("select");
        this.$el.toggleClass("ready", this.$('.select').length>0);
        var index = $(e.target).parent().index('.face');
        var current = this.classes.children[index];
        current.selected = !current.selected;
        current.value = current.selected? radius : radius*0.6 ;
 
        var packed = pack(this.classes); 
        this.update_ui(packed);
    },

    update_ui: function(packed){
        var minx = d3.min(this.classes.children, function(d){ 
            return d.x+radius-d.value;
        });
        var maxx = d3.max(this.classes.children, function(d){ 
            return d.x+radius+d.value;
        });
        var miny = d3.min(this.classes.children, function(d){ 
            return d.y+radius-d.value;
        });
        var maxy = d3.max(this.classes.children, function(d){ 
            return d.y+radius+d.value;
        });
        var width = maxx-minx;
        var height = maxy-miny;
        origin = { left: -minx+$(window).width()/2-width/2,
                   top: -miny+$(window).height()/3-height/2,};
        var self = this;
        packed.slice(1).forEach(function(d,i) {
            var yshift = (miny < 0 ? -miny : 0);
            var x = origin.left + d.x;
            var y = origin.top + d.y + yshift;
            self.$('.face:eq('+i+')').css('transform', 'translate(' + x + 'px, ' + y + 'px)');
            self.$('.face:eq('+i+')').css('-webkit-transform', 'translate(' + x + 'px, ' + y + 'px)');
        });
        var ratio = $(window).width() / (width + 20);
        $('.faces').css('transform', 'scale(' + (ratio < 1 ? ratio : 1) + ')');
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