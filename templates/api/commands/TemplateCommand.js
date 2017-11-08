import { Command } from 'specla/modules'

export default class TemplateCommand extends Command {
  static signature = 'template:command'
  static description = 'This the boilerplate code for a command'

  constructor (...args) {
    super()
  }
}
