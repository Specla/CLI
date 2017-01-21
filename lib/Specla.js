const fs = require('fs')
const path = require('path')
const express = require('express')
const EventEmitter = require('events')
const dotenv = require('dotenv')

const Router = require('./api/router')
const Controller = require('./api/controller')

/**
 * Create new express app
 * @type {Express}
 */
const app = express()

class Specla extends EventEmitter {

  /**
   * Create new instance of the Specla app
   * @param {Object}    config
   * @return {Express}  the express app instance
   */
  constructor (config) {
    super()

    this.app = app
    this.config = config

    this.rootPath = process.cwd()

    this.loadEnv()
    this.loadConfig()
    this.setupRouter()
    this.setupViewEngine()
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
      this.config = {}
      return
    }

    this.config = require(configPath)
  }

  /**
   * Require the routes file and let the express use the router
   * @private
   */
  setupRouter () {
    if (!this.config.paths) {
      this.config.paths = {}
    }

    const routerPath = path.resolve(
      this.rootPath,
      this.config.paths.routes || 'api/routes.js'
    )

    if (!fs.existsSync(routerPath)) {
      // TODO throw new Error(`Couldn't find the routes.js file`)
      return
    }

    require(routerPath)
    app.use(Specla.router)
  }

  /**
   * Setup the view engine for express, default is pug
   * @private
   */
  setupViewEngine () {
    if (!this.config.view) {
      this.config.view = {}
    }

    app.set('view engine', this.config.view.engine || 'pug')
    app.set('views', this.config.view.path || 'src/views')
  }
}

/**
 * Specla module exports
 */
Specla.app = app
Specla.router = new Router()
Specla.Controller = Controller

module.exports = Specla
