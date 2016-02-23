'use strict';

var Log = require('../libs/log');
var fs = require('fs');
var exec = require('child_process').exec;
var currentDir = process.cwd();

function createProject(name){
  Log.warn('Creating project: '+ name);

  if (fs.existsSync(currentDir+'/'+name)){
    Log.error('There are already a folder with the name: '+ name);
  } else {
    fs.mkdir(currentDir+'/'+name);
  }

  exec('git clone https://github.com/kvartborg/specla.git '+currentDir+'/'+name);
}

module.exports = createProject;
