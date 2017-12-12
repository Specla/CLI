import fs from 'fs'
import path from 'path'
import minimist from 'minimist'
import Specla from '../'
import speclaCommands from './commands'
import Command from './Command'
import autoloader from '@specla/autoloader'

export default class CLI extends Specla {
  /**
   * CLI arguments
   * @type {Array}
   */
  _args = []

  /**
   * CLI options
   * @type {Object}
   */
  _options = {}

  /**
   * Given command
   * @type {String}
   */
  _command = null

  /**
   * Available commands
   * @type {Object}
   */
  _commands = {}

  /**
   * Create a new Specla CLI instance
   * @return {CLI}
   */
  constructor () {
    super({ 'specla.runtime': 'cli' })
    this._parseMinimistArgs()
    this._loadCommands(speclaCommands)
    this._loadCommands(
      this._projectCommands()
    )

    Command.args = this._args
    Command.options = this._options
    Command.availableCommands = this._commands
  }

  /**
   * Parse the minimist arguments to a command, arguments and options
   */
  _parseMinimistArgs () {
    const args = minimist(process.argv.slice(2))
    this._command = args._[0]
    args._.shift()
    this._args = args._
    delete args._
    this._options = args
  }

  /**
   * Load the specla commands
   */
  _loadCommands (commands) {
    for (const command of commands) {
      if (typeof command.signature === 'string') {
        this._commands[command.signature] = command
      }

      if (Array.isArray(command.signature)) {
        for (const signature of command.signature) {
          this._commands[signature] = command
        }
      }
    }
  }

  /**
   * Load project commands
   * @return {Array}
   */
  _projectCommands () {
    const commandPath = path.join(
      process.cwd(),
      this.config.get('specla.build.path'),
      this.config.get('specla.command.path')
    )

    if (!fs.existsSync(commandPath)) return []

    return Object.values(autoloader(commandPath, { flatten: true }))
  }

  /**
   * Run CLI command
   * @return {Mixed}
   */
  run () {
    for (const command in this._commands) {
      if (command === this._command) {
        return new this._commands[command](...this._args)
      }

      if (this._command) {
        continue
      }

      for (const option in this._options) {
        if (
          command === '-' + option ||
          command === '--' + option
        ) {
          return new this._commands[command]()
        }
      }
    }

    return new this._commands['help']() // eslint-disable-line
  }
}
