const assert = require('assert');
const request = require('request');
const { spawn } = require('child_process');

describe('# Command: serve', () => {

  it('Should start the web server', function(done) {
    this.timeout(10000);

    let server = spawn('specla', ['serve']);

    setTimeout(() => {
      request('http://localhost:3000', (err, res, body) => {
        assert.equal(200, res.statusCode);
        server.kill();
        done();
      });
    }, 3000);
  });

});
