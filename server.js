var express        = require('express');
var port           = process.env.PORT || 2343;
var bot            = require('./lib/bot.js');
var commander      = require('./lib/commander.js')
var app            = express();
var children       = [];

var chatOptions = {
  jid: process.env.JID || 'number@chat.hipchat.com',
  password: process.env.Padssword || 'Password!',
  mentionName: process.env.MentionName || '@mentionName',
  host: 'chat.hipchat.com',
  muc: 'conf.hipchat.com'
}

app.set('port', port);

var bmo = new bot.Client(chatOptions);
bmo.connect();

bmo.jabber.on('connected', function() {
  bmo.joinRoom('room', 'name');
});

bmo.jabber.on('joinedRoom', function(roomJid) {
  bmo.announce(roomJid);
});

bmo.jabber.on('messageReceived', function(msg) {
  if (msg.body.indexOf("roll") > -1) {
    var max = msg.body.replace('@tron', '').replace('roll', '').trim();
    bmo.sendMsg(msg.medium, Math.floor(Math.random()*(max)));
  } else if (msg.body.indexOf("cmd") > -1) {
    var cmdBody = msg.body.replace('@tron', '').replace('cmd', '').trim();
    var cmd = commander.cmd(cmdBody);
    cmd.stdout.on('data', function(data) {
      bmo.sendMsg(msg.medium,'' + data);
    });
  } else if (msg.body.indexOf('bot uptime') > -1) {
    bmo.sendMsg(msg.medium, bmo.creationDate);
  } else if (msg.body.indexOf('help') > -1) {
    bmo.sendMsg(msg.medium, 'Following commands available: "cmd" [terminal cmd],"bot uptime","roll"');
  } else {
    bmo.sendMsg(msg.medium, 'Unrecognized Command.');
  }
});
