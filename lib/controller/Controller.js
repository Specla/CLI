class Controller {

  constructor (req, res, next) {
    if (typeof next === 'function') {
      next()
    }
  }

  validate () {
    console.log(true)
  }
}

module.exports = Controller
