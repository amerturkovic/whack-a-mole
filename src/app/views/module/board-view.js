'use strict';

var $ = require('jquery');
var _ = require('underscore');

var Backbone = require('backbone');
Backbone.$ = $;

var BaseView = require('../_extend/baseView');
var template = require('./../templates/board-view.html');
var BoardTile = require('./board-tile');
var ScoreDisplay = require('./score-display');

module.exports = BaseView.extend({
    
    events: {},
    
    tiles: [],
    
    scoreDisplayView: null,
    
    initialize: function(options) {
        
        var _this = this;
    
        _this.model = options.model;
    
        // Just hard code it for now
        _this.tilesPerBoard = 12;
    
        // Mole apear interval
        _this.moleAppearInterval = null;
    
        _this.listenTo(Backbone.Events, 'gameover', _this.endGame);
        
        // Reset Start Game button event
        $('#start-game').off('click').on('click', function(){
    
            $(this).attr("disabled","disabled");
            _this.startGame();
            
        }).attr("disabled", false);
    
        // Attach score display view
        if (_this.scoreDisplayView){
            
            _this.scoreDisplayView.dispose();
        }
    
        $('.score-board').empty();
        
        _this.scoreDisplayView = new ScoreDisplay({model: this.model});
        
        $('.score-board').append(_this.scoreDisplayView.render().el);
        
    },
    
    render: function() {
        
        this.$el.html(template());
        
        this.createBoard();

        return this;
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
        
        _this.moleAppearInterval = setInterval(function() {
            
            _this.spawnMole();
            
        }, turnTime);
    
        _this.scoreDisplayView.activateGameTimer();

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
