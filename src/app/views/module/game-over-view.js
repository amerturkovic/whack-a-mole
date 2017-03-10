'use strict';

var $ = require('jquery');

var Backbone = require('backbone');
Backbone.$ = $;

var BaseView = require('../_extend/baseView');
var template = require('./../templates/game-over-view.html');

module.exports = BaseView.extend({
    
    
    events: {},
    
    initialize: function(options) {
        
        var _this = this;
        
        this.model = options.model;
    
        $('#start-over').attr("disabled", false);
    
        // Reset Start Game button event
        $('#start-over').off('click').on('click', function(){
        
            $(this).attr("disabled","disabled");
    
            Backbone.history.navigate('index', { trigger: true });
        
        });
    },
    
    render: function() {
    
        var _this = this;
        
        this.$el.html(template());

        return this;
    }
    
});
