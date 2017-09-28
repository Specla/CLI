import Config from './Config'
import defaultConfig from './config/defaultConfig'
import Express from './Express'
import { version } from '../package.json'

export default class Specla extends Express {
  /**
   * Create a new instance of Specla
   * @param  {Object} config
   * @return {Specla}
   */
  constructor (config) {
    super()
    this.config = new Config(Object.assign({}, defaultConfig, config))

    // export static properties
    Specla.version = version
    Specla.config = this.config
  }
}
