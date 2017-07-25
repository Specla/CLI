/* eslint-env mocha */

const { expect } = require('chai')
const Specla = require('../lib')

describe('Specla.setupCompression', () => {
  it('Should register the compression middleware', () => {
    const { app } = new Specla()

    expect(app._router.stack[5].name).to.be.equal('compression')
  })
})
