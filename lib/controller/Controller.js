module.exports = class Controller {

  constructor (req, res, next) {
    if (typeof next === 'function') {
      next()
    }
  }

}
