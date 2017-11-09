import express from 'express'

export default class Server {
  /**
   * Create a new instance of the server
   * @return {Server}
   */
  constructor (config) {
    this._express = express()
    this.locals = this._express.locals
    this.mountpath = this._express.mountpath

    // static properties
    Server.Router = express.Router
  }

  /**
   * Proxy the use method to express
   * @param  {Array} args
   * @public
   */
  use (...args) {
    // Should find the correct express instance
    for (let i = 0; i < args.length; i++) {
      if (args[i] instanceof Server) {
        args[i] = args[i]._express
      }
    }

    return this._express.use(...args)
  }

  /**
   * Proxy the all method to express
   * @param  {Array} args
   * @public
   */
  all (...args) {
    return this._express.all(...args)
  }

  /**
   * Proxy the get method to express
   * @param  {Array} args
   * @return {Mixed}
   * @public
   */
  get (...args) {
    return this._express.get(...args)
  }

  /**
   * Proxy the post method to express
   * @param  {Array} args
   * @public
   */
  post (...args) {
    return this._express.post(...args)
  }

  /**
   * Proxy the put method to express
   * @param  {Array} args
   * @public
   */
  put (...args) {
    return this._express.put(...args)
  }

  /**
   * Proxy delete method to express
   * @param  {array} args
   * @public
   */
  delete (...args) {
    return this._express.delete(...args)
  }

  /**
   * Proxy the disable method to express
   * @param  {Array} args
   * @public
   */
  disable (...args) {
    return this._express.disable(...args)
  }

  /**
   * Proxy the disabled method to express
   * @param  {Array} args
   * @return {Boolean}
   * @public
   */
  disabled (...args) {
    return this._express.disabled(...args)
  }

  /**
   * Proxy the enable method to express
   * @param  {Array} args
   * @public
   */
  enable (...args) {
    return this._express.enable(...args)
  }

  /**
   * Proxy the enabled method to express
   * @param  {Array} args
   * @return {Boolean}
   * @public
   */
  enabled (...args) {
    return this._express.enabled(...args)
  }

  /**
   * Proxy the engine method to express
   * @param  {Array} args
   * @public
   */
  engine (...args) {
    return this._express.engine(...args)
  }

  /**
   * Proxy the listen method to express
   * @param  {Array} args
   * @return {httpServer}
   * @public
   */
  listen (...args) {
    return this._express.listen(...args)
  }

  /**
   * Proxy the param method to express
   * @param  {Array} args
   * @public
   */
  param (...args) {
    return this._express.param(...args)
  }

  /**
   * Proxy the path method to express
   * @param  {Array} args
   * @return {String} path
   * @public
   */
  path (...args) {
    return this._express.path(...args)
  }

  /**
   * Proxy the render method to express
   * @param  {Array} args
   * @public
   */
  render (...args) {
    return this._express.render(...args)
  }

  /**
   * Proxy the route method to express
   * @param {Array} args
   * @return {express}
   * @public
   */
  route (...args) {
    return this._express.route(...args)
  }

  /**
   * Proxy the set method to express
   * @param {Array} args
   * @return {Mixed}
   * @public
   */
  set (...args) {
    return this._express.set(...args)
  }

  /**
   * Proxy the on method to express
   * @param  {Array} args
   * @public
   */
  on (...args) {
    return this._express.on(...args)
  }
}
