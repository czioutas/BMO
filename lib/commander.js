var spawn  = require('child_process').spawn;
var logger = require('./logger.js')

module.exports.cmd = function(cmd,args) {
  if(typeof args === undefined) {
    args = [];
  }

  var kid = spawn(cmd,args, {
      timeout: 30,
      detached: false
        //killSignal: 'SIGTERM'
    });

  kid.on('error', function(err) {
    logger.error({error: err});
  })

  kid.on('close', function(code) {
    logger.info({info: 'child process exited with code ' + code});
  });

  return kid;
}
