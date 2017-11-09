import Command from '../Command'

export default class Help extends Command {
  /**
   * Set the command signature
   * @type {String}
   */
  static signature = ['help', '-h', '--help']

  /**
   * Command descriptions
   * @type {String}
   */
  static description = 'List available commands'

  /**
   * Available command
   * @type {Object}
   */
  _commands = Help.availableCommands

  /**
   * Create a new instance of the help command
   * @param  {Object} commands is a object with all loaded commands
   * @return {Help}
   */
  constructor () {
    super()
    if (process.env.NODE_ENV !== 'test') {
      console.log(this.help())
    }
  }

  /**
   * Create a sorted command list
   * @return {String}
   */
  commandList () {
    for (const command in this._commands) {
      if (command[0] === '-') delete this._commands[command]
    }

    const commands = Object.values(this._commands)

    const padding = commands.reduce((max, { signature }) => {
      if (signature.length > max) {
        return signature.length + (signature.includes(':') ? 2 : 0)
      }

      return max
    }, 0)

    const sortCommands = (a, b) => {
      if (a > b) return 1
      if (a < b) return -1
      return 0
    }

    const buildCommandString = command => {
      if (Array.isArray(command.signature)) {
        command.signature = command.signature.find(s => s[0] !== '-')
      }

      return '  ' + command.signature.padEnd(padding + 4) + command.description
    }

    return commands
      .sort(sortCommands)
      .map(buildCommandString)
      .join('\n')
  }

  /**
   * Generate the help text
   * @return {String}
   */
  help () {
    return [
      'Usage',
      '  specla <command>',
      '',
      'commands',
      this.commandList()
    ].join('\n')
  }
}
