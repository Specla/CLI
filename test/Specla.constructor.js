/* eslint-env mocha */

const { expect } = require('chai')
const Specla = require('../lib')

describe('Specla.constructor', () => {
  it('Should create a new Specla instance', () => {
    const specla = new Specla()
    expect(specla).to.be.instanceOf(Specla)
  })

  it('Should check if the project root path is correct', () => {
    const specla = new Specla({})
    expect(specla.rootPath).to.be.equal(process.cwd())
  })

  it('Should bind modules staticly to the Specla Object', () => {
    expect(Specla).to.have.property('app')
    expect(Specla).to.have.property('config')
    expect(Specla).to.have.property('upload')
    expect(Specla).to.have.property('router')
    expect(Specla).to.have.property('Validator')
    expect(Specla).to.have.property('Controller')
  })
})
