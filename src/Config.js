import path from 'path'
import fs from 'fs'
import dotenv from 'dotenv'
import Autoloader from '@specla/autoloader'
import dot from '@specla/dot-string'

export default class Config {
  /**
   * Create a new configuration
   * @param  {Object} config [description]
   * @return {Config}        [description]
   */
  constructor (config = {}) {
    this._flattenConfig = {}
    this._config = {}
    this._parse(config)
    this._setupDotEnv()
    this._loadConfigFiles()
  }

  /**
   * Load and setup the .env file from the project root
   * @private
   */
  _setupDotEnv () {
    if (!fs.existsSync(path.resolve(process.cwd(), '.env'))) {
      return
    }

    dotenv.config()
  }

  /**
   * Load configfiles from the config path and merge it with the current config
   * @private
   */
  _loadConfigFiles () {
    if (!this.get('config.path')) {
      return
    }

    const configs = new Autoloader(
      path.resolve(this.get('config.path'))
    )

    for (const key in configs) {
      if (typeof configs[key] === 'object' && configs[key].__esModule) {
        configs[key] = configs[key].default
      }
    }

    this._parse({ ...configs, ...this._config })
  }

  /**
   * Parse the config object and create a flatten config
   * @param  {Object} config
   * @return {Object}
   */
  _parse (config) {
    this._flatten(config)

    for (const key in this._flattenConfig) {
      this.set(key, this._flattenConfig[key])
    }
  }

  /**
   * Flatten objects into an object of dot strings
   * @param  {Mixed} config
   * @param  {Array} context
   * @return {Mixed}
   * @private
   */
  _flatten (config, context = []) {
    if (!Array.isArray(config) && typeof config === 'object') {
      return this._flattenObject(config, context)
    }

    return (this._flattenConfig[context.join('.')] = config)
  }

  /**
   * Flatten object
   * @param  {Mixed} config
   * @param  {Array} context
   * @private
   */
  _flattenObject (config, context) {
    for (const key in config) {
      this._flatten(config[key], context.concat(key))
    }
  }

  /**
   * Get configuration from dot string
   * @param  {String} key
   * @return {Mixed}
   * @public
   */
  get (key) {
    try {
      return dot.get(this._config, key)
    } catch (err) {
      return undefined
    }
  }

  /**
   * Set value for a given key
   * @param {String} key
   * @param {Mixed} value
   * @return {Mixed}
   * @public
   */
  set (key, value) {
    if (!this._flattenConfig[key]) {
      this._flattenConfig[key] = value
    }

    return dot.set(this._config, key, value)
  }
}
