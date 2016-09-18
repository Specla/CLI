'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const Database = require('specla-database');
const Autoloader = require('specla-autoloader');

const Server = require('./Server');

class Specla {

  constructor(config){
    this.config = config;
    this.express = null;
    this.modules = {};
    this.models = {};
    this.events = {};

    global.Specla = this;

    this.setupProcessEvents();
    this.setupSpecla();
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
   * Setup Specla and its modules
   * @private
   */
  setupSpecla(){
    this.modules.DB = new Database({
      host: this.config.database.host,
      port: this.config.database.port,
      database: this.config.database.database
    });

    new Autoloader(this.config.autoloader.global).global();
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
    const server = new Server(this.config);
    server.listen(() => {
      this.trigger('ready');

      if(callback !== undefined){
        callback();
      }
    });
  }
}

module.exports = Specla;
