const { spawn } = require('child_process');
const fs = require('fs');

const serve = {
  name: 'serve',
  description: 'Start the web server',

  options: {
    help: ['-h', '--help'],
    port: ['-p=', '--port=']
  },

  handle(){
    this.shouldBeASpeclaProject();
  },

  shouldBeASpeclaProject(){
    try {
      let localPackage = require(process.cwd()+'/package.json');
    } catch(err) {
      return console.log('The current directory isn\'t a Specla project.');
    }

    this.serve();
  },

  serve(){
    if(!fs.existsSync(process.cwd()+'/server.js')){
      console.log('The server.js file couldn\'t be found...');
      return;
    }

    let serve = spawn('node', [process.cwd()+'/server.js']);

    serve.stdout.on('data', msg => console.log(msg.toString()));

    process.on('SIGINT', () => {
      serve.kill('SIGINT');
    });
  }
};

module.exports = serve;
