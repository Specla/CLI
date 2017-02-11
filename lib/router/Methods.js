/**
 * @abstract
 */
class Methods {

    /**
     * Register route on all methods
     * @param {String} path
     * @param {Function|Array} middlewares
     * @param {String|Function} action
     * @public
     */
  all (path, middlewares, action) {
    this.register('all', path, middlewares, action)
    return this
  }

    /**
     * Register route on get method
     * @param {String} path
     * @param {Function|Array} middlewares
     * @param {String|Function} action
     * @public
     */
  get (path, middlewares, action) {
    this.register('get', path, middlewares, action)
    return this
  }

    /**
     * Register route on post method
     * @param {String} path
     * @param {Function|Array} middlewares
     * @param {String|Function} action
     * @public
     */
  post (path, middlewares, action) {
    this.register('post', path, middlewares, action)
    return this
  }

    /**
     * Register route on put method
     * @param {String} path
     * @param {Function|Array} middlewares
     * @param {String|Function} action
     * @public
     */
  put (path, middlewares, action) {
    this.register('put', path, middlewares, action)
    return this
  }

    /**
     * Register route on delete method
     * @param {String} path
     * @param {Function|Array} middlewares
     * @param {String|Function} action
     * @public
     */
  delete (path, middlewares, action) {
    this.register('delete', path, middlewares, action)
    return this
  }

    /**
     * Create controller from an action String
     * @param {String} action
     * @return {Function} controller action
     * @private
     */
  createController (action) {
    let controllerPath = action.split('.')[0]
    let controllerString = controllerPath.replace(new RegExp('/', 'g'), '.')
    action = action.split('.')[1]

    let controller = (req, res) => {
      try {
        let Controller = controllerString
          .split('.')
          .reduce((o, i) => o[i], this.controllers)

        let next = Controller
          .prototype[action]
          .bind(Controller.prototype, req, res)

        new Controller(req, res, next) // eslint-disable-line
      } catch (err) {
        if (err.message === `Cannot read property 'prototype' of undefined`) {
          throw new Error(`Couldn't find the ${controllerPath}.${action}`)
        }

        console.log(err)
      }
    }

    return controller
  }

    /**
     * Create array with middlewares
     * @param {String|Array|Function} middlewares
     * @return {Array} middlewares
     */
  validateMiddlewares (middlewares) {
    let correctedMiddlewares = []

    if (!middlewares) {
      middlewares = []
    }

    if (typeof middlewares === 'string' || typeof middlewares === 'function') {
      middlewares = [middlewares]
    }

    for (let middleware of middlewares) {
      if (typeof middleware !== 'string') {
        correctedMiddlewares.push(middleware)
        continue
      }

      correctedMiddlewares.push((req, res, next) => {
        try {
          let func = middleware.replace(new RegExp('/', 'g'), '.')
            .split('.')
            .reduce((o, i) => o[i], this.middlewares)

          func(req, res, next)
        } catch (err) {
          if (err.message === `this.middlewares.${middleware.replace(new RegExp('/', 'g'), '.')} is not a function`) {
            throw new Error(`Couldn't find the ${middleware} middleware`)
          }

          console.log(err)
        }
      })
    }

    return correctedMiddlewares
  }
}

module.exports = Methods
