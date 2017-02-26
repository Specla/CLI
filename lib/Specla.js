const fs = require('fs')
const path = require('path')
const EventEmitter = require('events')
const dotenv = require('dotenv')
const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const compression = require('compression')
const lusca = require('lusca')
const multer = require('multer')

const Autoloader = require('specla-autoloader')
const Router = require('./router')
const Controller = require('./controller')

class Specla extends EventEmitter {

  /**
   * Create new instance of the Specla app
   * @param {Object} config
   */
  constructor (config) {
    super()

    Specla.app = express()
    Specla.config = config

    // TODO find a better way to detect if the config is set in the constructor
    this.config = config

    this.controllers = {}
    this.middlewares = {}
    this.rootPath = process.cwd()

    this.loadEnv()
    this.loadConfig()
    this.setupDefaultPort()
    this.setupViewEngine()
    this.setupStaticFolder()
    this.setupCookieParser()
    this.setupSessionHandler()
    this.setupCompression()
    this.setupLusca()
    this.setupMulter()
    this.autoloadMiddlewares()
    this.autoloadControllers()
    this.setupRouter()

    /**
     * Exports on isntanciation
     */
    this.app = Specla.app
    this.config = Specla.config
    this.upload = Specla.upload
  }

  /**
   * Load the .env file if it exists in the project root
   * @private
   */
  loadEnv () {
    if (!fs.existsSync(path.resolve(this.rootPath, '.env'))) {
      return
    }

    dotenv.config()
  }

  /**
   * Load the config file if the config isn't specified as an option when the
   * app is instanciated
   * @private
   */
  loadConfig () {
    const configPath = path.resolve(this.rootPath, 'specla.config.js')

    if (this.config) {
      return
    }

    if (!fs.existsSync(configPath)) {
      Specla.config = {}
      return
    }

    Specla.config = require(configPath)
  }

  /**
   * Setup the default port for the web server
   * @private
   */
  setupDefaultPort () {
    Specla.app.set('port', Specla.config.port || 3000)
  }

  /**
   * Setup the view engine for express, default is pug
   * @private
   */
  setupViewEngine () {
    if (!Specla.config.view) {
      Specla.config.view = {}
    }

    Specla.app.set('view engine', Specla.config.view.engine || 'pug')
    Specla.app.set('views', Specla.config.view.path || 'src/views')
  }

  /**
   * Setup the static/public folder
   * @private
   */
  setupStaticFolder () {
    if (!Specla.config.paths) {
      Specla.config.paths = {}
    }

    Specla.app.use(express.static(Specla.config.paths.static || 'static'))
  }

  /**
   * Setup the express cookie parser
   * TODO Could lead to issues with the express-session library
   * @private
   */
  setupCookieParser () {
    Specla.app.use(cookieParser(Specla.config.key))
  }

  /**
   * Setup the session handler for the express app
   * TODO Usage of different stores
   * @private
   */
  setupSessionHandler () {
    if (!Specla.config.session) {
      Specla.config.session = {}
    }

    let options = {
      resave: false,
      secret: Specla.config.key || 'bad-key',
      saveUninitialized: true,
      cookie: {}
    }

    if (process.env.NODE_ENV === 'production') {
      Specla.app.set('trust proxy', 1)
      options.cookie.secret = true
    }

    Specla.app.use(session(options))
  }

  /**
   * Setup compression reponse body
   * @private
   */
  setupCompression () {
    Specla.app.use(compression())
  }

  /**
   * Setup lusca for handling basic web security
   * @private
   */
  setupLusca () {
    Specla.app.use(lusca({
      csrf: true,
      xframe: 'SAMEORIGIN',
      xssProtection: true,
      nosniff: true
    }))
  }

  /**
   * Setup mutler for handling file uploads
   * @private
   */
  setupMulter () {
    if (!Specla.config.paths) {
      Specla.config.paths = {}
    }

    Specla.upload = multer({ dest: Specla.config.paths.storage })
  }

  /**
   * Autoload all controller files if path is specified in config
   * @private
   */
  autoloadControllers () {
    if (!Specla.config.paths) {
      Specla.config.paths = {}
    }

    try {
      const { modules } = new Specla.Autoloader(
        path.resolve(
          this.rootPath,
          Specla.config.paths.controllers || 'api/controllers'
        )
      )

      this.controllers = modules
    } catch (err) {}
  }

  /**
   * Autoload all middleware files if path is specified in config
   * @private
   */
  autoloadMiddlewares () {
    if (!Specla.config.paths) {
      Specla.config.paths = {}
    }

    try {
      const { modules } = new Specla.Autoloader(
        path.resolve(
          this.rootPath,
          Specla.config.paths.middlewares || 'api/middlewares'
        ),
        true
      )

      this.middlewares = modules
    } catch (err) {}
  }

  /**
   * Require the routes file and let the express use the router
   * @private
   */
  setupRouter () {
    Specla.router = new Router(this.controllers, this.middlewares)

    if (!Specla.config.paths) {
      Specla.config.paths = {}
    }

    const routerPath = path.resolve(
      this.rootPath,
      Specla.config.paths.routes || 'api/routes.js'
    )

    if (!fs.existsSync(routerPath)) {
      // TODO throw new Error(`Couldn't find the routes.js file`)
      return
    }

    require(routerPath)
    Specla.app.use(Specla.router.export())
  }

}

/**
 * Specla module exports
 */
Specla.app = null
Specla.config = null
Specla.upload = null
Specla.router = null
Specla.Autoloader = Autoloader
Specla.Controller = Controller

module.exports = Specla
