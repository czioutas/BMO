var Directive = require('./Directives/Directive.js');

module.exports = function(msg, outputChannel) {
  if (Directive[msg.command] === undefined) {
    outputChannel.sendOutput(msg.medium, 'Unrecognized command: ' + msg.command);
    return;
  }

  Directive[msg.command](function(data) {
      outputChannel.sendOutput(msg.medium, data);
  });
}
