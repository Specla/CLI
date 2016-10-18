'use strict';

const { exec } = require('child_process');
const fs = require('fs');

const create = {

  name: 'create',
  description: 'Create new Specla project',

  handle(path){

    if(!path){
      path = process.cwd();
    } else {
      path = process.cwd()+'/'+path;
    }

    if(fs.existsSync(path) && fs.lstatSync(path).isDirectory()){
      console.log('The directory does already exists...');
      return;
    }

    console.log('Creating the Specla project...');
    console.log('Downloading framework from github...');
    exec('git clone https://github.com/Specla/Framework.git '+path, () => {
      console.log('Installing dependencies...');
      exec('cd '+path+'; npm install', () => {
        exec('rm -rf '+path+'/.git');
        console.log('DONE!');
      });
    });
  }

};

module.exports = create;
