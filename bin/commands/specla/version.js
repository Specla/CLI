const pkgInfo = require('../../../package.json');

const version = {
  name: 'version',
  description: 'Get current version of the specla framework',

  handle(){
    console.log(pkgInfo.version);
  }
};

module.exports = version;
