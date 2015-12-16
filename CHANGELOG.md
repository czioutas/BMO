# 1.2.2
  Command un-recognized returns message send to BMO.
  Mention Name is now removed before it reaches the controller.js

# 1.2.1
  Created logger.js so that bunyan can be used globally after initialization
  in the bot. However this has removed customization of bunyan settings. For now.

# 1.1.1
  Fixed missing callback parameter in default.js::default

# 1.1.0
Enhancements
  * Added Bunyan for logging. (Every message received and send is logged)
  * Added modular use of "directives" that act as models that are passed in the
    controller for easier use and flow.
  * Added Commander.js with a single purpose of executing terminal commands.
  * Added outputChannel.js with a single purpose of sending client side messages
    in an obscure way.
  * Added LICENCE.md and CHANGELOG.md
  * Added fpm.js for example use

# 1.0.0
First Release
Basic functionality:
  * Connect Client
  * Pick up messages that refer to mention name
  * Basic command execution
