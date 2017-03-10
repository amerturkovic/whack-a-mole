'use strict';

var Backbone = require('backbone');
var GameModel = require('../models/game');

module.exports = Backbone.Collection.extend({
    model: GameModel
});