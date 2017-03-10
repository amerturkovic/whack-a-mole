'use strict';

var Backbone = require('backbone');
var RelationalModel = require('backbone-relational');

module.exports = Backbone.RelationalModel.extend({
    defaults: {
        time: 10, // seconds
        turnTime: 500,
        lifeMin: 300, // miliseconds
        lifeMax: 900,
        score: 0,
        level: 1
    }
});