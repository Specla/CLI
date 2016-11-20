const Autoloader = require('specla-autoloader')
const pkgInfo = require('../../../package.json')
require('colors')

const help = {
  name: 'help',
  description: 'Print the help manual',

  handle () {
    console.log(`\n ${'{'.gray.bold} ${'Specla'.bold} ${'}'.gray.bold}`, ` v${pkgInfo.version}\n`)

    this.printUsage()
    this.printOptions()
    this.printCommands()
  },

  printUsage () {
    console.log(` Usage:`.gray)
    console.log(`   specla [command] [options] [arguments] \n`)
  },

  printOptions () {
    console.log(` Available Options:`.gray)
    console.log(`   -h, --help   Get help`)
    console.log(``)
  },

  printCommands () {
    console.log(` Available Commands:`.gray)

    let commands = new Autoloader(['../../commands'])
      .setRootDir(__dirname)
      .namespaced()['..']['..']
      .commands

    for (let command in commands) {
      console.log(`   # ${command}`)
      this.getCommand(commands[command])
    }
  },

  getCommand (command) {
    if (command.name === undefined) {
      return this.getSubCommand(command)
    }

    console.log(`      ${command.name}`)
  },

  getSubCommand (commands) {
    for (let command in commands) {
      this.getCommand(commands[command])
    }
  }
}

module.exports = help
