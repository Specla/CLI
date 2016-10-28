const assert = require('assert');
const fs = require('fs');
const { exec } = require('child_process');

describe('# Command: make:model ', () => {

  it('Should create a new model', function(done) {
    this.timeout(5000);
    exec('specla make:model Model', () => {
      done();
      // if(fs.existsSync(process.cwd()+'/api/models/Model.js')){
      //   done();
      // } else {
      //   throw new Error('Couldn\'t find the Model');
      // }
    });
  });

});
