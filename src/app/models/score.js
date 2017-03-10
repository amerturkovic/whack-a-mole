'use strict';

var Backbone = require('backbone');
var RelationalModel = require('backbone-relational');

module.exports = Backbone.RelationalModel.extend({
    defaults: {
        time: 20 * 1000, // seconds
        turnTime: 500,
        lifeMin: 500, // miliseconds
        lifeMax: 1500,
        score: 0,
        level: 1
    }
});