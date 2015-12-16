# 1.3.1
  Fix travis-ci
  Remove express

# 1.3.0
  Change the config from .json to .js. The aim of this change is to make the
  configs future proof, in case we want have multiple config files that extend or
  include each other.

  Added grunt in order to concatenate all directives into one.

  Also I decided to make the controller decide which function to execute based on
  auto-matching (magic), using the merged Directive.js and also by making some
  changes to the msg, by including a msg.command where the command is trimmed and
  camelcased.

  So now all commands except the ones in default should include two parts.
  The file/directive and the function.
  Example:
    fpm status -> fpm.js::status()

  Added grunt execution as part of Travis.

# 1.2.3
  Added credentials to the config file.
  Main file now reads those in order to connect.

# 1.2.2
  Added config. Any configuration for logger/bunyan should be set under
  config/default.json (production.json vs development.json will follow).

# 1.2.1
  Command un-recognized returns message send to BMO.
  Mention Name is now removed before it reaches the controller.js

# 1.2.0
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
