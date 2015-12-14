var commander = require('../lib/commander.js')

module.exports.default = function() {
  callback('Unrecognized command.');
}

module.exports.ls = function(callback) {
  var cmd = commander.cmd('ls');
  cmd.stdout.on('data', function(data) {
      callback('' + data);
  });
}

module.exports.help = function() {
  callback('Following commands available: "cmd" [terminal cmd],"bot uptime","roll"');
}
