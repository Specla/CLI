/* global describe, it */
const path = require('path')
const fs = require('fs')

describe('# Command: create', () => {
  it('Should download the framework from github and install npm dependencies', (done) => {
    if (fs.existsSync(path.join(__dirname, '/tmp'))) {
      done()
    } else {
      throw new Error('The project wasn\'t created.')
    }
  })
})
