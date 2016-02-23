'use strict';

var pckg = require('../../package.json');
var Log = require('./log');

class Cli {
  constructor(options) {
    this.events = {
      on: {
        exit: () => {},
      },
      has: {}
    };

    this.name = options.name;
    process.title = this.name;
    this.event = 'serve';
    this.args = [];
    this.debug = false;
    this.pid = process.pid;
    this.version = pckg.version;

    setTimeout(() => this.start(), 100);
  }


  start(){
    this.getArguments();
    this.registerEvents();
    this.trigger(this.event, this.args);
  }


  getArguments(){
    process.argv.forEach((arg, index, array) => {
      if(index == 2)
        this.event = arg;

      if(index > 2){
        if(this.events.has[arg] !== undefined)
          this.events.has[arg]();
        else
          this.args.push(arg);
      }
    });
  }


  registerEvents(){
    process.on('exit', () => this.trigger('exit'));
  }


  on(events, callback){
    if(typeof events === 'string')
      events = [events];

    for(var i = 0, event; event = events[i]; i++){
      this.events.on[events[i]] = callback;
    }
  }


  trigger(event, args){
    if(typeof args === 'string' || typeof args === 'string' || typeof args === 'number' ){
      args = [args];
    }

    if(this.events.on[event] != undefined){
      this.events.on[event].apply(this, args);
      return;
    }

    if(event != 'debug'){
      Log.error('Couldn\'t find the event: '+ event);
    }
  }


  has(args, callback){
    if(typeof args === 'string')
      args = [args];

    for(var i = 0, arg; arg = args[i]; i++){
      if(callback !== undefined){
        this.events.has[arg] = callback;
        return;
      }

      if(this.args.indexOf(arg) !== -1)
        return true;
      else
        return false;
    }
  }
}

module.exports = Cli;
