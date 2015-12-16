# BMO

[![Build Status](https://travis-ci.org/drakoumel/BMO.svg?branch=master)](https://travis-ci.org/drakoumel/BMO) [![bitHound Score](https://www.bithound.io/github/drakoumel/BMO/badges/score.svg)](https://www.bithound.io/github/drakoumel/BMO)
![David dm] (https://david-dm.org/drakoumel/BMO.svg)


An xmpp client,in nodejs, based on node-xmmp. The main usacase is hipchat, although it should work for other jabber based chats.


# Howto

The `server.js` file contains the main functionality to get started.
Fill in `config/default.json` with your details to connect.

It is advised however to use environment variables to handle your credentials.

**Start your app server:**

    $ export NODE_ENV=production
    $ mkdir production.json //fill in your details
    $ node server.js

# Directives

The folder Directive is meant to be used as a location to store different "command" bundles.
As exposed in the repository, the directive default is used for standard functions, such as help.

The Directives are chosen from the `controller.js`

# Events Exposed

At the moment the following events are being exposed for use:
* connected
* joinedRoom
* messageReceived
