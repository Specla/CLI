import fs from 'fs'
import GeneratorCommand from '../../command/GeneratorCommand'
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
    this.validatePath(this.destinationPath)
    this.setupDefaultFiles()
  }

  /**
   * Validate that the given path is empty otherwise exit the process
   * with status code 1
   * @param  {String} path
   */
  validatePath (path) {
    try {
      if (!fs.existsSync(path)) {
        return
      }

      if (fs.readdirSync(path).length > 0) {
        throw new Error('Path is not empty')
      }
    } catch (err) {
      console.log(err.message)
      this.exit(1)
    }
  }

  /**
   * Copy files from the template folder to the project path
   */
  setupDefaultFiles () {
    const files = [
      `${config.get('specla.config.path')}/app.js`,
      'server.js'
    ]

    for (const file of files) {
      this.copyTemplate(file)
    }

    const dotFiles = ['gitignore', 'env', 'babelrc']

    for (const file of dotFiles) {
      this.copyTemplate(file, `.${file}`)
    }
  }
}
