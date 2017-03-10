'use strict';

var $ = require('jquery');
var Backbone = require('backbone');

Backbone.$ = $;

var ScoreModel = require('./models/score');
var BoardView = require('./views/module/board-view');
var GameOverView = require('./views/module/game-over-view');

module.exports = Backbone.Router.extend({
    
    currentView: null,
    $wrapper: $('.board'),
    
    model: new ScoreModel(),
    
    routes: {
        '': 'default',
        'index': 'default',
        'gameover': 'gameover'
    },
    
    initialize: function() {
        Backbone.history.start();
    },
    
    default: function() {
        
        if (this.currentView){
            this.currentView.dispose();
        }
        
        this.currentView = new BoardView({model: this.model});
        this.$wrapper.append(this.currentView.render().el);
    },
    
    gameover: function() {
        
        if (this.currentView){
            this.currentView.dispose();
        }
        
        this.currentView = new GameOverView({model: this.model});
        this.$wrapper.append(this.currentView.render().el);
    }
});
