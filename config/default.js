module.exports = {
  Logger: {
    name: "bmo",
    streams: [{
      level: "info",
      path: "bunyanLog.log"
    }]
  },
  Credentials: {
    jid:"jid",
    password:"password",
    mentionName:"@bmo",
    host:"chat.hipchat.com",
    muc:"conf.hipchat.com",
    userName:"BMO"
  },
  Rooms: "room",
  SSH : [
    "user@server"
  ]
}
