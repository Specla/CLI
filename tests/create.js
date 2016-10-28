'use strict';

const assert = require('assert');
const { exec } = require('child_process');

describe('# Create new specla project', () => {

  before((done) => {
    exec('npm link', () => {
      done();
    });
  });

  it('should download the framework from github and install npm dependencies', function(done) {
    this.timeout(10000*6);

    exec('specla create tests/project', (err) => {
      if(err !== null){
        return console.log(err);
      }
      done();
    });
  });

  after((done) => {
    let currentDir = __dirname;
    exec('cd tests/project; npm link specla', () => {
      done();
    });
  });
});
