const pkgInfo = require('../../package.json')

const version = () => {
  console.log(pkgInfo.version)
}

module.exports = version
