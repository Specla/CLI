'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const Database = require('specla-database');
const Autoloader = require('specla-autoloader');

class Server {

  constructor(config){
    this.app = null;
    this.express = express;
    this.config = config;
    this.events = this.defaultEvents();

    this.setupExpress();
    this.setupSpecla();
    this.setupRoutes();
  }

  defaultEvents(){
    return {
      on: {
        start: () => {}
      }
    }
  }

  setupExpress(){
    this.app = express();

    this.app.use(express.static('public'));
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.set('view engine', this.config.view.engine);
    this.app.set('views', this.config.view.path);

    //require('./ErrorHandler');
  }

  setupSpecla(){
    global.DB = new Database({
      host: this.config.database.host,
      port: this.config.database.port,
      database: this.config.database.database
    });

    new Autoloader(this.config.autoloader.global).global();
  }

  setupRoutes(){
    global.Route = this.app;
    require(process.cwd()+'/app/routes');
    global.Route = undefined;
  }

  on(event, callback){
    this.events.on[event] = callback;
  }

  trigger(event, data){
    this.events.on[event](data);
  }

  listen(callback){
    this.trigger('start', this.app);
    this.app.listen(this.config.server.port);

    if(typeof callback === 'function'){
      callback();
    }
  }
}

module.exports = Server;
