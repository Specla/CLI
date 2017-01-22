/* eslint-env mocha */

const { expect } = require('chai')
const Specla = require('../lib/Specla')

describe('Specla.setupCookieParser', () => {
  it('Should register the cookieParser package as a middleware', () => {
    let { app } = new Specla({
      key: 'some-key'
    })

    expect(app._router.stack[app._router.stack.length - 2].name)
      .to.be.equal('cookieParser')
  })
})
