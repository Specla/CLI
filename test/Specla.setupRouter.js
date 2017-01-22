/* eslint-env mocha */

const { expect } = require('chai')
const Specla = require('../lib/Specla')

describe('Specla.setupRouter', () => {
  it('Should regiser the Specla.router as an express router', () => {
    const specla = new Specla() // eslint-disable-line
    Specla.router.get('/test', () => {})

    expect(Specla.router.stack[0].route)
      .to.have.property('path')
      .and.to.be.equal('/test')
  })
})
