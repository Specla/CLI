import configure from './config/configure'
import defaultConfig from './config/defaultConfig'
import Server from './Server'
import { version } from '../package.json'
import Command from './cli/Command'

export default class Specla {
  /**
   * Specla instance
   * @type {Specla}
   */
  static _instance = null

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
   * Specla server instance, only set if the runtime is equal to server
   * @type {Server}
   */
  static server = null

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
    if (Specla.isInstantiated) {
      throw new Error(
        'Specla is already instanciated, use the .destroy() method if you want a new instance'
      )
    }

    this.config = Specla.config.merge(config)
    this.version = Specla.version

    if (this.config.get('specla.runtime') === 'server') {
      Specla.server = new Server(this.config)
      this.server = Specla.server
    }

    Specla._instance = this
  }

  /**
   * Check if specla is instanciated
   * @type {Boolean}
   */
  static get isInstantiated () {
    return Specla._instance
  }

  /**
   * Destroy specla singleton
   */
  static destroy () {
    Specla._instance = null
    Specla.server = null
    Specla.config = configure(defaultConfig)
  }
}
