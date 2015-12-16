var commander = require('../lib/commander.js');
var config    = require('config');
var ssh       = config.get('SSH');

/*
My grunt foo is low at the moment. But I want to add the filename aka fpm
and camelCase the function name only on the generated Directve.js file
so the function in fpms.js::status() would become fpmStatus()
*/

module.exports.fpmStatus = function(callback, all) {
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
};

module.exports.fpmRestart = function(callback, all) {
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
};
