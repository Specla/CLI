let fs = require('fs');

function help(){
  Log.info('help!');
}

module.exports = (name) => {
  if(Specla.has(['-h', '--help'])){
    return help();
  }

  if(!name){
    return Log.error('The command make:controller takes a argument name');
  }

  fs.writeFileSync(process.cwd()+'/app/controllers/'+name+'.js', `'use strict';

class ${name} {

}

module.exports = new ${name};
`);
}
