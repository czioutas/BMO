var commander = require('../lib/commander.js')
var config    = require('config');
var ssh       = config.get('SSH');

module.exports.status = function(callback, all) {
  if (all === undefined) {
    all = true;
  }

  if (all) {
    ssh.forEach(function(current) {
      var args = [current, "sudo /etc/init.d/php5-fpm status;"];
      var cmd = commander.cmd('ssh', args);
      cmd.stdout.on('data', function(data) {
        if (data.length > 2) {
          callback('' + data);
        }
      });
    });
  }
}

module.exports.restart = function(callback, all) {
  if (all === undefined) {
    all = true;
  }

  if (all) {
    ssh.forEach(function(current) {
      var args = [current, "sudo /etc/init.d/php5-fpm restart;"];
      var cmd = commander.cmd('ssh', args);
      cmd.stdout.on('data', function(data) {
        if (data.length > 2) {
          callback('' + data);
        }
      });
    });
  }
}
