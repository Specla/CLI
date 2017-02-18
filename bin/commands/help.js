const pkgInfo = require('../../package.json')

const help = () => {
  console.log(`\n { Specla }`, `v${pkgInfo.version}\n`)

  console.log(` Usage:`)
  console.log(`   specla [command] [options] [arguments] \n`)
}

module.exports = help
