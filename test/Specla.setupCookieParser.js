/* eslint-env mocha */

const { expect } = require('chai')
const Specla = require('../lib')

describe('Specla.setupCookieParser', () => {
  it('Should register the cookieParser package as a middleware', () => {
    let { app } = new Specla({
      key: 'some-key'
    })

    expect(app._router.stack[3].name)
      .to.be.equal('cookieParser')
  })
})
