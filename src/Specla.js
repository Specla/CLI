import Config from './Config'
import defaultConfig from './defaultConfig'
import express from 'express'

export default class Specla {
  /**
   * Create a new instance of Specla
   * @param  {Object} config
   * @return {Specla}
   */
  constructor (config) {
    this.config = new Config(Object.assign({}, defaultConfig, config))
    this._express = experss(this.config.get('express'))
  }

  /**
   * Proxy the use method to express
   * @param  {Array} args
   * @public
   */
  use (...args) {
    return this._express.use(...args)
  }
}
