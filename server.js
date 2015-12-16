var bot             = require('./lib/bot.js');
var commander       = require('./lib/commander.js')
var outputChannel   = require('./lib/outputChannel');
var config          = require('config');
var controller      = require('./controller.js')

var $env            = process.env.NODE_ENV;
var $envCredentials = config.get('Credentials');
var $envRooms = config.get('Rooms');

var chatOptions = {
  jid: $envCredentials.jid,
  password: $envCredentials.password,
  mentionName: $envCredentials.mentionName,
  host: $envCredentials.host,
  muc: $envCredentials.muc
}

var bmo = new bot.Client(chatOptions);
var oc = new outputChannel.Channel(bmo);

bmo.connect();

bmo.jabber.on('connected', function() {
  bmo.joinRoom($envRooms, $envCredentials.userName);
});

bmo.jabber.on('joinedRoom', function(roomJid) {
  bmo.announce(roomJid);
});

bmo.jabber.on('messageReceived', function(msg) {
  controller(msg,oc);
});
