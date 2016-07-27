'use strict';

const child_process = require('child_process');
const fs = require('fs');

module.exports = (path) => {

  if(!path){
    path = process.cwd();
  } else {
    path = process.cwd()+'/'+path;
  }

  child_process.exec('git clone https://github.com/Specla/Framework.git '+path, () => {
    child_process.exec('rm -rf '+path+'/.git');
  });

}
