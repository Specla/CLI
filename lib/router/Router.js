const express = require('express')
const Methods = require('./Methods')
const Group = require('./Group')

class Router extends Methods {

  /**
   * Create new Router instance
   */
  constructor (controllers, middlewares) {
    super()
    this.controllers = controllers
    this.middlewares = middlewares
    this.router = new express.Router()
  }

  /**
   * Register routes
   * @param {String} method
   * @param {String} path
   * @param {Function|Array} middlewares
   * @param {String|Function} action
   * @private
   */
  register (method, path, middlewares, action) {
    if (action === undefined) {
      action = middlewares
      middlewares = []
    }

    middlewares = this.validateMiddlewares(middlewares)

    if (typeof action === 'string') {
      action = this.createController(action)
    }

    this.router[method](path, middlewares, action)
  }

  /**
   * Create a route group
   * @param {String} path
   * @param {String|Array|Function} middlewares
   * @return {Group}
   * @public
   */
  group (path, middlewares) {
    return new Group(path, middlewares, this)
  }

  /**
   * export the express router
   * @public
   */
  export () {
    return this.router
  }

}

module.exports = Router
