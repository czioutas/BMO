var xmppClient = require('node-xmpp-client');
var xmppCore = require('node-xmpp-core');
var xmppJID = require('node-xmpp-jid');
var bind = require('underscore').bind;
var once = require('underscore').once;
var moment = require('moment');
var logger = require('./logger.js')

var Client = function(options) {
  this.jabber = null;
  this.keepalive = null;
  this.name = null;
  this.plugins = {};
  this.iq_count = 1;
  this.connected = false;
  this.creationDate = null;

  this.jid = options.jid;
  this.password = options.password;
  this.host = options.host;
  this.muc = options.muc;
  this.mentionName = options.mentionName;
  this.logger = logger;

  return this;
}

Client.prototype.connect = function() {
  this.logger.info('Connecting...');
  console.log('Connecting...');

  this.jabber = new xmppClient({
    jid: this.jid,
    password: this.password,
    host: this.host
  });

  this.jabber.on('online', bind(this.onOnline, this));
  this.jabber.on('stanza', bind(this.serializeStanza, this));
};

Client.prototype.onOnline = function(reply) {
  var self = this;
  this.logger.info('Connected');
  console.log('Connected.');
  this.jabber.emit('connected');

  this.connected = true;
  this.creationDate = moment();

  this.keepalive = setInterval(function() {
    self.jabber.send(new xmppCore.Element('message', {}));
    self.jabber.emit('ping');
  }, 3000);

  this.jabber.send(new xmppCore.Element('presence', {
    type: 'available'
  }).c('show').t('chat'));
};

Client.prototype.joinRoom = function(roomJid, roomNick) {
  this.fullRoomJid = roomJid + '@' + this.muc;
  this.logger.info('Requesting to join room: ' + this.fullRoomJid + '/' + roomNick);
  console.log('Requesting to join room: ' + this.fullRoomJid + '/' + roomNick);
  this.jabber.send(new xmppCore.Element('presence', {
    to: this.fullRoomJid + '/' + roomNick
  }).c('x', {
    xmlns: 'http://jabber.org/protocol/muc'
  }).c('history', {
    maxstanzas: 0,
    seconds: 1
  }));
  this.jabber.emit("joinedRoom", this.fullRoomJid);
}

Client.prototype.announce = function(roomJid) {
  console.log('announce', roomJid);
  this.sendMsg(roomJid, "I kept dreaming of a world, I thought I would never see. And then one Day... I got in.")
}

Client.prototype.sendMsg = function(targetJid, message) {
  var packet;
  var jid = new xmppJID(targetJid);

  if (jid.domain === this.muc) {
    packet = new xmppCore.Element('message', {
      to: targetJid + '/' + this.name,
      type: 'groupchat'
    });
  } else {
    packet = new xmppCore.Element('message', {
      to: targetJid,
      type: 'chat',
      from: this.jid
    });
    packet.c('inactive', {
      xmlns: 'http://jabber/protocol/chatstates'
    });
  }

  packet.c('body').t(message);
  this.jabber.send(packet);
};

Client.prototype.serializeStanza = function(stanza) {
  this.message = null;
  this.who = null;
  this.medium = null;

  if (stanza.name !== 'message' || stanza.attrs.type === 'error') {
    return;
  }

  if (stanza.children !== undefined &&
    stanza.children.length > 0 &&
    stanza.children[0].name !== undefined &&
    stanza.children[0].name === 'body') {
    this.message = stanza.children[0].children[0].toLowerCase();
    this.who = stanza.attrs.from;
  }

  if (this.message && this.message.indexOf(this.mentionName) > -1) {
    var message = {
      body: this.message.toLowerCase(),
      medium: this.who.substr(0, this.who.indexOf('/')),
      who: this.who
    };
    this.logger.info(message);
    this.jabber.emit('messageReceived', message);
  }
}

module.exports.Client = Client;
