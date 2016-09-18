'use strict';

const express = require('express');
const bodyParser = require('body-parser');

class Server {

  constructor(config){
    this.app = null;
    this.express = express;
    this.config = config;

    this.setupExpress();
    this.setupRoutes();
  }

  /**
   * Setup express
   * @private
   */
  setupExpress(){
    this.app = express();
    Specla.express = this.app;

    this.app.use(express.static('public'));
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.set('view engine', this.config.view.engine);
    this.app.set('views', this.config.view.path);
  }

  /**
   * Setup the router (default express router)
   * @private
   */
  setupRoutes(){
    global.Route = this.app;
    require(process.cwd()+'/app/routes');
    global.Route = undefined;
  }

  /**
   * Start the HTTP server
   * @param {Function} callback
   * @public
   */
  listen(callback){
    this.app.listen(this.config.server.port);

    if(typeof callback === 'function'){
      callback();
    }
  }
}

module.exports = Server;
