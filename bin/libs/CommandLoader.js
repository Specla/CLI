const Autoloader = require('specla-autoloader')

function CommandLoader (cli) {
  let commands = new Autoloader(['../commands'])
      .setRootDir(__dirname)
      .namespaced()['..']

  for (let command in commands) {
    registerCommand(commands[command])
  }

  function registerCommand (command) {
    if (command.name === undefined) {
      return loadSubCommand(command)
    }

    cli.on(command.name, command.handle.bind(command))
  }

  function loadSubCommand (commands) {
    for (let command in commands) {
      registerCommand(commands[command])
    }
  }
}

module.exports = CommandLoader
