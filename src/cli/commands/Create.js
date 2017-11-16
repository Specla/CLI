import fs from 'fs'
import GeneratorCommand from '../GeneratorCommand'
import { config } from '../../'

export default class Create extends GeneratorCommand {
  /**
   * Signature of the command
   * @type {String}
   */
  static signature = 'create'

  /**
   * Description of what the command does
   * @type {String}
   */
  static description = 'Create a new Specla project'

  /**
   * Create a new instance of the
   * @param  {String} [path='.']
   * @return {Create}
   */
  constructor (path = '.') {
    super(path)
    this._validatePath(this.destinationPath)
    this._createFolder(this.destinationPath)
    this._setupDefaultFiles()
  }

  /**
   * Validate that the given path is empty otherwise exit the process
   * with status code 1
   * @param  {String} path
   */
  _validatePath (path) {
    try {
      if (!this._isPathEmpty(path)) {
        console.log(`Path is not empty`)
        return this.exit(1)
      }
    } catch (err) {}
  }

  /**
   * Check if a path is empty
   * @param  {String}  path
   * @return {Boolean}
   */
  _isPathEmpty (path) {
    return fs.readdirSync(path).length === 0
  }

  /**
   * Create a new folder
   * @param  {String} path
   * @return {Boolean}
   */
  _createFolder (path) {
    if (fs.existsSync(path)) {
      return false
    }

    return fs.mkdirSync(path)
  }

  /**
   * Copy files from the template folder to the project path
   */
  _setupDefaultFiles () {
    const files = [`${config.get('specla.config.path')}/app.js`, 'server.js']
    for (const file of files) {
      this.copyTemplate(file)
    }

    const dotFiles = ['gitignore', 'env', 'babelrc']

    for (const file of dotFiles) {
      this.copyTemplate(file, `.${file}`)
    }
  }
}
