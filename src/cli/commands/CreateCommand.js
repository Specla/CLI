import fs from 'fs'
import { resolve } from 'path'
import Command from '../Command'
import { config } from '../../Specla'

export default class CreateCommand extends Command {
  static signature = 'create:command'
  static description = 'Create a new command'

  constructor (name) {
    super()

    const commandsPath = resolve(
      process.cwd(),
      config.get('specla.command.path')
    )

    if (!fs.existsSync(commandsPath)) {
      fs.mkdirSync(commandsPath)
    }

    this._createFile('api/commands/TemplateCommand.js')
  }
}
