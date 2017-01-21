const express = require('express')
const Group = require('./Group')

class Router extends express.Router {

  /**
   * Create a new route group
   * @param {String}          path
   * @param {Function|Array}  middlewares
   */
  group (path, middlewares) {
    return new Group(this, path, middlewares)
  }

}

module.exports = Router
