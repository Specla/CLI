import fs from 'fs'
import { resolve } from 'path'
import Command from '../Command'

export default class Create extends Command {
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
   * @param  {String} [projectPath='.']
   * @return {Create}
   */
  constructor (projectPath = '.') {
    super()

    this.projectPath = projectPath
    this._validatePath(projectPath)
    this._createFolder(projectPath)
    this._setupDotEnv()
    this._setupConfig()
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
    return fs.readdirSync(resolve(path)).length === 0
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
   * Return a template file
   * @param  {String} path
   * @return {String}
   */
  _template (path) {
    return fs.readFileSync(resolve(__dirname, '../../../templates', path))
  }

  /**
   * Create file from template
   * @param  {String} file
   * @return {Boolean}
   */
  _createFile (file) {
    return fs.writeFileSync(
      resolve(this.projectPath, file),
      this._template(file)
    )
  }

  /**
   * Create the base .env file
   */
  _setupDotEnv () {
    return this._createFile('.env')
  }

  /**
   * Setup the config folder and create the main app config file
   */
  _setupConfig () {
    if (!fs.existsSync(resolve(this.projectPath, 'config'))) {
      fs.mkdirSync(resolve(this.projectPath, 'config'))
    }

    this._createFile('config/app.js')
  }
}
