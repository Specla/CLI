import Generator from 'specla/generator'

export default class TemplateCommand extends Generator {
  static signature = 'template:command'
  static description = 'This the boilerplate code for a command'

  constructor (...args) {
    super()
  }
}
