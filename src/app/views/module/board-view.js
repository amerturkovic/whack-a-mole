'use strict';

var $ = require('jquery');
var _ = require('underscore');

var Backbone = require('backbone');
Backbone.$ = $;

var BaseView = require('../_extend/baseView');
var template = require('./../templates/board-view.html');
var BoardTile = require('./board-tile');

module.exports = BaseView.extend({
    
    events: {
        
    },
    
    tiles: [],
    
    //
    initialize: function(options) {
        
        var _this = this;
    
        this.model = options.model;
    
        // Just hard code it for now
        this.tilesPerBoard = 12;
    
        // Mole apear interval
        this.moleAppearInterval = null;
        
        // Reset Start Game button event
        $('#start-game').off('click').on('click', function(){
    
            $(this).attr("disabled","disabled");
            _this.startGame();
            
        }).attr("disabled", false);
    
        _this.listenTo(_this.model,'change:score', _this.scoreUpdateHandler);
        _this.listenTo(_this.model,'change:level', _this.levelUpdateHandler);
    },
    
    render: function() {
        
        this.$el.html(template());
        this.createBoard();

        return this;
    },
    
    scoreUpdateHandler: function(){
    
        var _this = this;
        var _score = _this.model.get('score');
        $('score-board').find('.score').html(_score);
    },
    
    levelUpdateHandler: function(){
        
        var _this = this;
        var _level = _this.model.get('level');
        $('score-board').find('.score').html(_level);
    },
    
    
    createBoard: function(){
    
        var _this = this;
        
        _this.clearAllTiles();
        
        for(var i = 0; i < _this.tilesPerBoard; i++){
            
            var _currentTile = new BoardTile({model: _this.model});
            this.$el.find('ul').append(_currentTile.render().$el);
            
            _this.tiles.push(_currentTile);
        }
        
        return this;
        
    },
    
    
    clearAllTiles: function(){
    
        var _this = this;
        
        if (_this.tiles && _this.tiles.length > 0){
    
            console.log('clean old tiles: ');
    
            for(var i = 0; i < _this.tiles.length; i++){
                _this.tiles[i].dispose();
            }
    
            _this.tiles = [];
            
        }
        return _this;
    },
    
    
    startGame: function() {
        
        var _this = this;
        
        var turnTime = _this.model.get('turnTime');
        var gameTime = _this.model.get('time');
        
        _this.moleAppearInterval = setInterval(function() {
            
            _this.spawnMole();
            
        }, turnTime);
        
        
        setTimeout(function() {
            
            _this.endGame();
            
        }, gameTime);

    },
    
    
    spawnMole: function(){
        
        var _this = this;
        
        var randomNumber = _this.getRandomNumber(0, _this.tilesPerBoard - 1);
        var $tile = _this.tiles[randomNumber];
        
        var lifeMin = _this.model.get('lifeMin');
        var lifeMax = _this.model.get('lifeMax');
        var moleLifeSpan = _this.getRandomNumber(lifeMin , lifeMax);
    
        $tile.activateMole(moleLifeSpan);
    },
    
    
    getRandomNumber: function(min, max){
        
        return Math.floor(Math.random() * (max - min + 1)) + min;
        
    },
    
    endGame: function() {
    
        var _this = this;
    
        clearInterval(_this.moleAppearInterval);
        
        _this.clearAllTiles();
    
        Backbone.history.navigate('gameover', { trigger: true });
        
    }
    
    
});
