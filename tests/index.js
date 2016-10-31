const { exec } = require('child_process');

/**
 * Include tests
 */
function test(){
  require('./create');
  require('./version');
  require('./serve');
}

/**
 * Link & setup Specla framework
 */
describe('# Link & setup Specla framework for testing', () => {
  before(function(done) {
    this.timeout(5000);
    exec('npm link', done);
  })

  it('Get the framework from github and install dependencies', function(done) {
    this.timeout(10000*6);
    this.slow(30000);
    exec('specla create tests/tmp; cd tests/tmp; npm link specla', () => {
      process.chdir('./tests/tmp');
      test();
      done();
    });
  });

});

after(function(done){
  exec('rm -rf ../../tests/tmp', done);
});
