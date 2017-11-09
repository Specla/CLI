import configure from './config/configure'
import defaultConfig from './config/defaultConfig'
import Express from './Express'
import { version } from '../package.json'
import Command from './cli/Command'

export default class Specla extends Express {
  /**
   * Version of specla
   * @type {String}
   */
  static version = version

  /**
   * Config
   * @type {Object}
   */
  static config = configure(defaultConfig)

  /**
   * Modules
   * @type {Object}
   */
  static modules = {
    Command
  }

  /**
   * Create a new instance of Specla
   * @param  {Object} config
   * @return {Specla}
   */
  constructor (config) {
    super()
    this.config = Specla.config.merge(config)
    this.version = Specla.version
  }
}
