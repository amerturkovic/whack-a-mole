'use strict';

var $ = require('jquery');

var Backbone = require('backbone');
Backbone.$ = $;

var BaseView = require('../_extend/baseView');
var template = require('./../templates/board-tile.html');

module.exports = BaseView.extend({
    
    tagName: 'li',
    className: 'tile',
    
    events: {},
    
    initialize: function(options) {
        
        var _this = this;
        
        this.model = options.model;
        
        this.activateMole = function(lifeSpan) {
    
            _this.$el.addClass('mole');
        
            setTimeout(function() {
                _this.destroyMole();
            }, lifeSpan);
        
        };
    
        // Reset Start Game button event
        this.$el.off('click').on('click', function(){
        
            _this.onTileClickHandler();
        
        });
    },
    
    render: function() {
    
        var _this = this;
        
        this.$el.html(template());

        return this;
    },
    
    
    destroyMole: function() {
        
        this.$el.removeClass('mole');
        
    },
    
    
    onTileClickHandler: function() {
        
        var _this = this;
        
        var hasMole = _this.$el.hasClass('mole');
        
        if (hasMole) {
    
            _this.destroyMole();
            
            var previousScore = this.model.get('score');
    
            _this.model.set({score: previousScore + 1});
            
        }
    }
    
});
