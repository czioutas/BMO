var logger = require('./logger.js')
var bot;

var Channel = function(bot) {
  this.bot = bot;
  this.sendOutput = function(medium,data) {
    logger.info({medium: medium,data: data});
    this.bot.sendMsg(medium, data);
  }
  return this;
}

module.exports.Channel = Channel;
