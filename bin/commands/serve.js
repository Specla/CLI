const spawn = require('child_process').spawn
const fs = require('fs');

function help() {
  Log.info(`
    Start a node web server
  `);
}

module.exports = () => {
  if(Specla.has(['-h', '--help'])){
    return help();
  }

  if(!fs.existsSync(process.cwd()+'/server.js')){
    Log.info(process.cwd()+'/server.js');
    Log.warn('The server.js file couldn\'t be found...');
    return;
  }

  let serve = spawn('node', [process.cwd()+'/server.js']);

  serve.stdout.on('data', msg => console.log(msg.toString()));

  process.on('SIGINT', () => {
    serve.kill('SIGINT');
  });
};
