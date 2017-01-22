/* eslint-env mocha */

const fs = require('fs')
const path = require('path')
const { expect } = require('chai')
const Specla = require('../lib/Specla')

describe('Specla.loadConfig', () => {
  const testPath = path.resolve(__dirname, '.tmp')

  before(() => {
    fs.mkdirSync(testPath)
    process.chdir(testPath)
    fs.writeFileSync(path.join(testPath, 'config.js'), `module.exports = {
      key: 'value'
    }`)
  })

  after(() => {
    fs.unlinkSync(path.join(testPath, 'config.js'))
    fs.rmdirSync(testPath)
    process.chdir(__dirname)
  })

  it('Should load the config from the config file in the project root', () => {
    const specla = new Specla()

    expect(specla.config)
      .to.have.property('key')
      .and.to.be.equal('value')
  })

  it('Should receive config via a contructor prop', () => {
    const specla = new Specla({
      someKey: 'my-value'
    })

    expect(specla.config)
      .to.have.property('someKey')
      .and.to.be.equal('my-value')
  })
})
