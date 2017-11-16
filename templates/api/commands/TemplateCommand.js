import { modules } from 'specla'

export default class TemplateCommand extends modules.Command {
  static signature = 'template:command'
  static description = 'This the boilerplate code for a command'

  constructor (...args) {
    super()
  }
}
