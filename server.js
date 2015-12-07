var express      = require('express');
var port         = process.env.PORT || 2343;
var bot          = require('./lib/bot.js');
var app          = express();

var chatOptions =
{
  jid: process.env.JID || 'hipchatNumber@hipchatHost',
  password: process.env.Padssword || 'Password',
  mentionName: process.env.MentionName || 'bmo',
  host: 'chat.hipchat.com',
  muc: 'conf.hipchat.com'
}

app.set('port', port);

app.listen(app.get('port'), function(){
  console.log('Its time to pump up the jam! @ ' + ':' + app.get('port'));

  var bmo = new bot.Client(chatOptions);
  bmo.connect();

  bmo.jabber.on('connected', function() {
    bmo.joinRoom('roomJid','BMO');
  });

  bmo.jabber.on('joinedRoom', function(roomJid) {
    bmo.announce(roomJid);
  });

  bmo.jabber.on('messageReceived', function(msg) {
    if(msg.body.indexOf("roll") > -1) {
      bmo.sendMsg(msg.medium, Math.random());
    } else {
      bmo.sendMsg(msg.medium, 'Unrecognized Command.');
    }
  });
});
