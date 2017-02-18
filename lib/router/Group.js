const { join } = require('path')
const Methods = require('./Methods')

class Group extends Methods {

  /**
   * Create a new group of routes
   */
  constructor (path, middlewares, router) {
    super()
    this.basePath = path
    this.baseMiddlewares = this.validateMiddlewares(middlewares)
    this.controllers = router.controllers
    this.middlewares = router.middlewares
    this.router = router.router
    this.previous = router
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

    this.router[method](
      join(this.basePath, path),
      this.baseMiddlewares.concat(middlewares || []),
      action
    )
  }

  /**
   * Create a route group inside this group
   * @param {String} path
   * @param {String|Array|Function} middlewares
   * @return {Group}
   * @public
   */
  group (path, middlewares) {
    return new Group(
      join(this.basePath, path),
      this.baseMiddlewares.concat(middlewares || []),
      this
    )
  }

  /**
   * Close group and
   * @return {Group|Router} return to previous group or the main router
   */
  end () {
    return this.previous
  }
}

module.exports = Group
