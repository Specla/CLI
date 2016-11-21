const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')
const EventEmitter = require('events')

const Database = require('specla-database')
const Autoloader = require('specla-autoloader')
const Router = require('specla-router')

/**
 * Set Environment variables if a .env file exists in the project root
 */
if (fs.existsSync(process.cwd() + '/.env')) {
  require('dotenv').config()
}

class Specla extends EventEmitter {

  constructor (config) {
    super()
    this.config = config || require(path.join(process.cwd(), '/config.js'))
    this.express = null
    this.modules = {}
    this.models = {}

    global[this.config.namespace || 'Specla'] = this

    this.setupProcessEvents()
    this.setupExpress()
    this.setupSpecla()
    this.setupRoutes()
  }

  /**
   * Setup process events
   * @private
   */
  setupProcessEvents () {
    process.on('exit', this.emit.bind(this, 'exit'))
    process.on('SIGINT', () => {
      this.emit.bind(this, 'exit')
      process.exit()
    })
  }

  /**
   * Setup express
   * @private
   */
  setupExpress () {
    this.express = express()

    this.express.use(express.static(this.config.publicFolder || 'public'))
    this.express.use(bodyParser.urlencoded({ extended: true }))
    this.express.set('view engine', this.config.view.engine)
    this.express.set('views', this.config.view.path)
  }

  /**
   * Setup Specla and its modules
   * @private
   */
  setupSpecla () {
    this.modules.db = new Database({
      host: this.config.database.host,
      port: this.config.database.port,
      database: this.config.database.database
    })

    this.modules.Model = this.modules.db.Model

    new Autoloader(this.config.autoloader.global).global()
  }

  /**
   * Setup the router (default express router)
   * @private
   */
  setupRoutes () {
    this.modules.router = new Router(this.express, {
      path: path.join(process.cwd(), '/api/controllers')
    })

    require(path.join(process.cwd(), '/api/routes'))
  }

  /**
   * Remove event listener
   * @param {String}  event
   * @return {Object} this
   * @public
   */
  off (event) {
    if (this._events[event] === undefined) {
      return this
    }

    delete this._events[event]
  }

  /**
   * Start the HTTP server from the server module
   * @param {Function} callback
   * @public
   */
  listen (callback) {
    this.express.listen(this.config.api.port, () => {
      this.emit('ready')

      if (typeof callback === 'function') {
        callback()
      }
    })
  }
}

module.exports = Specla
