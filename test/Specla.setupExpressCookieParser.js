/* eslint-env mocha */

const { expect } = require('chai')
const Specla = require('../lib/Specla')

describe('Specla.setupCookieParser', () => {
  it('Should register the cookieParser package as a middleware', () => {
    let specla = new Specla({
      key: 'some-key'
    })

    expect(specla.config.key).to.be.equal('some-key')

    specla = new Specla()
    expect(specla.config.key).to.be.undefined
  })
})
