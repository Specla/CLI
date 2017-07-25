/* eslint-env mocha */

const { expect } = require('chai')
const Specla = require('../lib')

describe('Specla.setupSessionHandler', () => {
  it('Should register the session handler as an express middleware', () => {
    const { app } = new Specla({
      key: 'test-key'
    })

    expect(app._router.stack[4].name)
      .to.be.equal('session')
  })
})
