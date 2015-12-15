var fpm = require('./Directives/fpm');
var main = require('./Directives/default');

module.exports = function(msg, outputChannel) {
  var workingMsgBody = msg.body.replace('@bmo', '');

  if (workingMsgBody.indexOf("ls") > -1) {
    main.ls(function(data) {
      outputChannel.sendOutput(msg.medium, data);
    });
  } else if (workingMsgBody.indexOf("fpm status") > -1) {
    fpm.status(function(data) {
      outputChannel.sendOutput(msg.medium, data);
    });
  } else if (workingMsgBody.indexOf("fpm restart") > -1) {
    fpm.restart(function(data) {
      outputChannel.sendOutput(msg.medium, data);
    });
  } else if (workingMsgBody.indexOf('help') > -1) {
    main.help(function(data) {
      outputChannel.sendOutput(msg.medium, data);
    });
  } else {
    main.default(function(data) {
      outputChannel.sendOutput(msg.medium, data);
    });
  }
}
