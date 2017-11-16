import fs from 'fs'
import { resolve, join } from 'path'
import Command from './Command'

export default class GeneratorCommand extends Command {
  /**
   * Create a new Generator command
   * @param  {String} [path='.'] path to working directory
   * @return {GeneratorCommand}
   */
  constructor (path = '.') {
    super()
    this._path = resolve(process.cwd(), path)
  }

  /**
   * Get destination path
   * @return {String} current working directory
   */
  get destinationPath () {
    return this._path
  }

  /**
   * Get template path
   * @return {String} return the template path
   */
  get templatePath () {
    return resolve(__dirname, '../../templates')
  }

  /**
   * Copy template from template path
   * @param {String} file
   * @param {String} destination
   */
  copyTemplate (file, destination) {
    const templateFile = fs.readFileSync(join(this.templatePath, file))

    fs.writeFileSync(
      join(this.destinationPath, destination || file),
      templateFile
    )
  }
}
