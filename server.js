var express        = require('express');
var port           = process.env.PORT || 2343;
var bot            = require('./lib/bot.js');
var commander      = require('./lib/commander.js')
var outputChannel  = require('./lib/outputChannel');
var controller     = require('./controller.js')
var children       = [];
var oc             = {};

var chatOptions = {
  jid: process.env.JID || 'jid',
  password: process.env.Padssword || 'password',
  mentionName: process.env.MentionName || '@mentionName',
  host: 'chat.hipchat.com',
  muc: 'conf.hipchat.com'
}

var bmo = new bot.Client(chatOptions);
var oc = new outputChannel.Channel(bmo);

bmo.connect();

bmo.jabber.on('connected', function() {
  bmo.joinRoom('room', 'Name');
});

bmo.jabber.on('joinedRoom', function(roomJid) {
  bmo.announce(roomJid);
});

bmo.jabber.on('messageReceived', function(msg) {
  msg.body = msg.body.replace(bmo.mentionName, '');
  controller(msg,oc);
});
