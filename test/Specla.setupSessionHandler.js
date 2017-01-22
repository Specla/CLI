/* eslint-env mocha */

const { expect } = require('chai')
const Specla = require('../lib/Specla')

describe('Specla.setupSessionHandler', () => {
  it('Should register the session handler as an express middleware', () => {
    const { app } = new Specla({
      key: 'test-key'
    })

    expect(app._router.stack[app._router.stack.length - 1].name)
      .to.be.equal('session')
  })
})
