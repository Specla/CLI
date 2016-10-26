'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const Database = require('specla-database');
const Autoloader = require('specla-autoloader');
const Router = require('specla-router');

class Specla {

  constructor(config){
    this.config = config;
    this.express = null;
    this.modules = {};
    this.models = {};
    this.events = {};

    global.Specla = this;

    this.setupProcessEvents();
    this.setupExpress();
    this.setupSpecla();
    this.setupRoutes();
  }

  /**
   * Setup process events
   * @private
   */
  setupProcessEvents(){
    process.on('exit', this.trigger.bind(this, 'exit'));
    process.on('SIGINT', () => {
      this.trigger.bind(this, 'exit');
      process.exit();
    });
  }

  /**
   * Setup express
   * @private
   */
  setupExpress(){
    this.express = express();

    this.express.use(express.static('public'));
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.set('view engine', this.config.view.engine);
    this.express.set('views', this.config.view.path);
  }

  /**
   * Setup Specla and its modules
   * @private
   */
  setupSpecla(){
    this.modules.db = new Database({
      host: this.config.database.host,
      port: this.config.database.port,
      database: this.config.database.database
    });

    this.modules.Model = this.modules.db.Model;

    new Autoloader(this.config.autoloader.global).global();
  }

  /**
   * Setup the router (default express router)
   * @private
   */
  setupRoutes(){
    this.modules.router = new Router({
      express: this.express
    });

    require(process.cwd()+'/api/routes');
  }

  /**
   * Register event listener
   * @param {String}    event
   * @param {Function}  callback
   * @return {Object}   this
   * @public
   */
  on(event, callback){
    if(this.events[event] === undefined){
      this.events[event] = [];
    }

    this.events[event].push(callback);

    return this;
  }

  /**
   * Remove event listener
   * @param {String}  event
   * @return {Object} this
   * @public
   */
  off(event){
    if(this.events[event] === undefined){
      return this;
    }

    delete this.events[event];
  }

  /**
   * Trigger event listener
   * @param {String}  event
   * @param {Mixed}   data
   * @return {Object} this
   * @public
   */
  trigger(event, ...data){
    if(data.length === 1){
      data = data[0];
    }

    if(data.length === 0){
      data = undefined;
    }

    if(this.events[event] === undefined){
      return this;
    }

    for(let _event of this.events[event]){
      _event.apply(data);
    }

    return this;
  }

  /**
   * Start the HTTP server from the server module
   * @param {Function} callback
   * @public
   */
  listen(callback){
    this.express.listen(this.config.server.port, () => {
      this.trigger('ready');

      if(typeof callback === 'function'){
        callback();
      }
    });
  }
}

module.exports = Specla;
