var bunyan = require('bunyan');

var logger = bunyan.createLogger({
  name: 'bmo',
  streams: [{
    level: 'info',
    path: 'bunyanLog.log'
  }]
});

module.exports = logger;
