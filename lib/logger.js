var bunyan = require('bunyan');
var config = require('config');
var loggerConfig = config.get('Logger');
var logger = bunyan.createLogger(loggerConfig);

module.exports = logger;
