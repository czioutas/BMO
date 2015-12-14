var spawn  = require('child_process').spawn;

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
    console.log('error' + err);
  })

  kid.on('close', function(code) {
    console.log('child process exited with code ' + code);
  });

  return kid;
}
