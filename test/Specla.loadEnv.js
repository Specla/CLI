/* eslint-env mocha */

const fs = require('fs')
const path = require('path')
const { expect } = require('chai')
const Specla = require('../lib')

describe('Specla.loadEnv', () => {
  const testPath = path.resolve(__dirname, '.tmp')

  before(() => {
    fs.mkdirSync(testPath)
    process.chdir(testPath)
    fs.writeFileSync(path.join(testPath, '.env'), 'MY_ENV_VAR=testing')
  })

  after(() => {
    fs.unlinkSync(path.join(testPath, '.env'))
    fs.rmdirSync(testPath)
    process.chdir(__dirname)
  })

  it('Should load the env vars in .env if it exists in project root', () => {
    new Specla() // eslint-disable-line

    expect(process.env)
      .to.have.property('MY_ENV_VAR')
      .and.to.be.equal('testing')
  })
})
