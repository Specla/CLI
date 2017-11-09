import fs from 'fs'
import path from 'path'
import Command from '../Command'

export default class Version extends Command {
  /**
   * Signature of the command
   * @type {String}
   */
  static signature = ['-v', '--version', 'version']

  /**
   * Description of the command
   * @type {String}
   */
  static description = 'Get current version of Specla'

  /**
   * Create a new instance of the Version command
   * @return {Version}
   */
  constructor (...args) {
    super()
    let version = 'unknown'
    if (fs.existsSync(path.resolve(process.cwd(), 'package.json'))) {
      const project = require(path.resolve(process.cwd(), 'package.json'))

      if (project.dependencies.specla) {
        version = project.dependencies.specla
      }
    }

    if (version === 'unknown') {
      version = require('../../../package.json').version
    }

    console.log(`Specla version ${version}`)
  }
}
