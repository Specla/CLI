'use strict';

const child_process = require('child_process');
const fs = require('fs');

module.exports = (path) => {

  if(!path){
    path = process.cwd();
  } else {
    path = process.cwd()+'/'+path;
  }

  if(fs.existsSync(path) && fs.lstatSync(path).isDirectory()){
    Log.warn('The directory does already exists...');
    return;
  }

  Log.info('Creating the Specla project...');
  Log.info('Downloading framework from github...');
  child_process.exec('git clone https://github.com/Specla/Framework.git '+path, () => {
    Log.info('Installing dependencies...');
    child_process.exec('cd '+path+'; npm install', () => {
      child_process.exec('rm -rf '+path+'/.git');
      console.log('DONE!');
    });
  });
}
