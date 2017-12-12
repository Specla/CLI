import configure from './config/configure'
import defaultConfig from './config/defaultConfig'
import { version } from '../package.json'

/**
 * Instance of the specla singleton
 * @type {Specla}
 */
let instance = null

export default class Specla {
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
   * Create a new instance of Specla
   * @param  {Object} config
   * @return {Specla}
   */
  constructor (config) {
    if (Specla.isInstantiated) {
      throw new Error(
        'Specla is already instanciated, use the .reset() method if you want a new instance'
      )
    }

    this.config = Specla.config.merge(config)
    this.version = Specla.version

    instance = this
  }

  /**
   * Check if specla is instanciated
   * @type {Boolean}
   */
  static get isInstantiated () {
    return !!instance
  }

  /**
   * Destroy specla singleton
   */
  static reset () {
    instance = null
    Specla.config = configure(defaultConfig)
  }
}
