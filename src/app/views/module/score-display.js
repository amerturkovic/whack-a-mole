'use strict';

var $ = require('jquery');

var Backbone = require('backbone');
Backbone.$ = $;

var BaseView = require('../_extend/baseView');
var template = require('./../templates/score-display.html');

module.exports = BaseView.extend({
    
    events: {},
    
    timer: null,
    
    gameoverCalled: true,
    
    initialize: function(options) {
        
        var _this = this;
        
        _this.model = options.model;
    
        _this.activateGameTimer = function() {
            
            console.log('activateGameTimer');
            
            _this.gameoverCalled = false;
    
            _this.startTimer();
        };
    
        _this.listenTo(_this.model,'change:score', _this.scoreUpdateHandler);
        _this.listenTo(_this.model,'change:level', _this.levelUpdateHandler);
        
    },
    
    
    render: function() {
        
        var _this = this;
    
        _this.$el.html(template());
        
        return _this;
    },
    
    scoreUpdateHandler: function(){
        
        var _this = this;
        var _score = _this.model.get('score');
        $('.score-board').find('.score').text(_score);
    },
    
    levelUpdateHandler: function(){
        
        var _this = this;
        var _level = _this.model.get('level');
        $('.score-board').find('.level').text(_level);
    },
    
    gameOver: function(){
        
        var _this = this;
        
        clearInterval(_this.timer);
        
        if(!_this.gameoverCalled){
    
            console.log('gameOver');
            
            _this.gameoverCalled = true;
    
            Backbone.Events.trigger('gameover',true);
        }
        
    },
    
    startTimer: function () {
        
        var _this = this,
            gameTime = _this.model.get('time'),
            timer = gameTime,
            minutes,
            seconds;
    
        console.log('startTimer');
        
        _this.timer = setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);
            
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            
            $('.score-board').find('.time').html(minutes + ":" + seconds);
            
            if (--timer < 0) {
                timer = gameTime;
                _this.gameOver();
            }
        }, 1000);
    }
    
    
});
