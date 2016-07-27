const child_process = require('child_process');

function help() {
  Log.info(`
    Start a node web server
  `);
}

module.exports = () => {
  if(Specla.has(['-h', '--help'])){
    return help();
  }

  try {
    child_process.exec('node '+process.cwd()+'/server.js');
  } catch(err) {
    Log.info(process.cwd()+'/server.js');
    Log.warn('The server.js file couldn\'t be found...');
  }
};
