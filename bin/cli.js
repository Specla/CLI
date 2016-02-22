'use strict';

class Cli {
  constructor(options) {
    this.events = {
      on: {},
    };

    this.name = options.name;
    this.event = 'serve';
    this.args = [];
    this.debug = this.has('debug');
  }


  start(){
    this.getArguments();
    this.trigger(this.event, this.args);
  }


  getArguments(){
    process.argv.forEach((val, index, array) => {
      if(index == 2)
        this.event = val;

      if(index > 2)
        this.args.push(val);
    });
  }


  registerEvents(){

  }


  on(events, callback){
    if(typeof events === 'string')
      events = [events];

    for(var i = 0, event; event = events[i]; i++){
      this.events.on[events[i]] = callback;
    }
  }


  trigger(event, args){
    if(typeof args === 'string' || typeof args === 'string' || typeof args === 'number' )
      args = [args];

    if(this.events.on[event] != undefined)
      this.events.on[event].apply(this, args);
    else
      console.log('Couldn\'t find the event: '+ event);
  }


  has(arg){
    console.log(this.args.indexOf(arg));
    if(this.args.indexOf(arg) != -1 || this.event.indexOf(arg) != -1)
      return true;
    else
      return false;
  }

  json(data){
    if(typeof data !== 'string')
      return JSON.stringify(data);
    else
      return data;
  }

  info(str){
    console.log('\x1b[32m'+this.json(str)+'\x1b[0m');
  }

  log(str){
    console.log(this.json(str));
  }

  debug(str){
  }

  warn(str){
    console.log('\x1b[33m'+this.json(str)+'\x1b[0m');
  }


  error(str){
    console.log('\x1b[31m'+this.json(str)+'\x1b[0m');
  }
}

module.exports = Cli;
