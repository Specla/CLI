/* eslint-env mocha */

const { expect } = require('chai')
const Specla = require('../lib/Specla')

describe('Specla.setupLusca', () => {
  it('Should register the lusca middleware', () => {
    const { app } = new Specla()

    expect(app._router.stack[6].name).to.be.equal('lusca')
  })
})
