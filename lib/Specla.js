const fs = require('fs')
const path = require('path')
const EventEmitter = require('events')
const dotenv = require('dotenv')
const express = require('express')
const cookieParser = require('cookie-parser')

const Router = require('./router')
const Controller = require('./controller')

class Specla extends EventEmitter {

  /**
   * Create new instance of the Specla app
   * @param {Object}    config
   * @return {Express}  the express app instance
   */
  constructor (config) {
    super()

    Specla.app = express()
    Specla.config = config

    // TODO find a better way to detect if the config is set in the constructor
    this.config = config

    this.rootPath = process.cwd()

    this.loadEnv()
    this.loadConfig()
    this.setupRouter()
    this.setupViewEngine()
    this.setupStaticFolder()
    this.setupCookieParser()

    /**
     * Exports on isntanciation
     */
    this.app = Specla.app
    this.config = Specla.config
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
    const configPath = path.resolve(this.rootPath, 'config.js')

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
   * Require the routes file and let the express use the router
   * @private
   */
  setupRouter () {
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
    Specla.app.use(Specla.router)
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
   * @private
   */
  setupCookieParser () {
    Specla.app.use(cookieParser(Specla.config.key))
  }
}

/**
 * Specla module exports
 */
Specla.app = null
Specla.config = null
Specla.router = new Router()
Specla.Controller = Controller

module.exports = Specla
