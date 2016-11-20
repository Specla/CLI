const assert = require('assert')
const { exec } = require('child_process')
const pkgInfo = require('../package.json')

describe('# Command: version', () => {
  it('should return the current version of this package', function (done) {
    exec('specla version', (err, out) => {
      assert.equal(pkgInfo.version, out.replace(/\n$/, ''))
      done()
    })
  })
})
