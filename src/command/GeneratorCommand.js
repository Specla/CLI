import fs from 'fs'
import { resolve, join, sep, dirname } from 'path'
import Command from './Command'
import { config } from '../'

export default class GeneratorCommand extends Command {
  /**
   * Create a new Generator command
   * @param  {String} [path='.'] path to working directory
   * @return {GeneratorCommand}
   */
  constructor (path = '.') {
    super()
    this._path = resolve(process.cwd(), path, config.get('specla.src.path'))
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
    const dest = join(this.destinationPath, destination || file)
    this._mkdir(dest)

    fs.writeFileSync(dest, templateFile)
  }

  /**
   * Make path for a file
   * @param  {String} path
   */
  _mkdir (path) {
    const dirs = dirname(path).split(sep)
    dirs.shift()

    const paths = ['']

    for (const dir of dirs) {
      paths.push(dir)
      if (fs.existsSync(paths.join(sep))) continue
      fs.mkdirSync(paths.join(sep))
    }
  }
}
