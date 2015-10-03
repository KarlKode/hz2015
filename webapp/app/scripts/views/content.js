'use strict';

var Backbone = require('backbone');
require('jquery');
Backbone.$ = $;

var _ = require('lodash');

var key = require('keymaster');

var superTerrificHappyAppRouter = require('../router');

module.exports = Backbone.View.extend({
	el: '#content',

	template: require('../templates/content'),

    initialize: function() {
        this.render();

        this.Router = new superTerrificHappyAppRouter({ app: this });

        //pass view to this from router to render different content areas
        this.listenTo(this.Router, 'router:showView', _.bind(function (view) {
            this.swapContent(view);
        }, this));

        Backbone.history.start();

        key.setScope('app');
    },

    render: function() {
        this.$el.html(this.template());
    },

    swapContent: function (view) {
        view.render();
        var fly = this.$('#appview .canfly')
        if (fly.length){
            fly.appendTo(this.$el);
            fly.addClass('fly');
            _.delay(function(){
                 fly.addClass("move").css({"transform": "translate(0,-"+$(window.document).height()+"px)","-webkit-transform": "translate(0,-"+$(window.document).height()+"px)"});
       
            },100);
            _.delay(function(){
                 fly.remove();  
            },3000);
        }
        this.$('#appview').html('')
        view.$el.addClass('theview');
        this.$('#appview').append(view.$el);
        view.delegateEvents();
    }
});