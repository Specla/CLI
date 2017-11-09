import configure from './config/configure'
import defaultConfig from './config/defaultConfig'
import Server from './Server'
import { version } from '../package.json'
import Command from './cli/Command'

class Specla {
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
    this.config = Specla.config.merge(config)
    this.version = Specla.version
  }
}

export default Specla
export const config = Specla.config
export const modules = Specla.modules
