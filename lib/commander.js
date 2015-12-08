spawn = require('child_process').spawn;

module.exports.cmd = function(cmd) {
  var ls = spawn(cmd, {
      timeout: 30,
      detached: false
        //killSignal: 'SIGTERM'
    });

  ls.on('error', function(err) {
    console.log(err);
  })

  ls.on('close', function(code) {
    console.log('child process exited with code ' + code);
  });

  return ls;
}
