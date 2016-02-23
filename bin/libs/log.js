'use strict';

var Log = {

  json(data){
    if(typeof data !== 'string')
      return JSON.stringify(data, null, '\t');
    else
      return data;
  },

  // console.log('\x1b[32m'+this.json(str)+'\x1b[0m'); green

  info(str){
    console.log(this.json(str));
  },

  debug(str){
    console.log(this.json(str));
  },

  warn(str){
    console.log('\x1b[33m'+this.json(str)+'\x1b[0m');
  },


  error(str){
    console.log('\x1b[31m'+this.json(str)+'\x1b[0m');
  },

}

module.exports = Log;
