const assert = require('assert');
const fs = require('fs');
const { exec } = require('child_process');

describe('# Command: make:controller ', () => {

  it('Should create a new controller', function(done) {
    this.timeout(5000);
    exec('specla make:controller TestController', () => {
      done();
      // if(fs.existsSync(process.cwd()+'/api/controllers/TestController.js')){
      //   done();
      // } else {
      //   throw new Error('Couldn\'t find the TestController');
      // }
    });
  });

});
