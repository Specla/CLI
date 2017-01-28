/* eslint-env mocha */

const { expect } = require('chai')
const Specla = require('../lib/Specla')

describe('Specla.setupDefaultPort', () => {
  it('Should set the default port to 3000', () => {
    const { app } = new Specla({})
    expect(app.settings.port).to.be.equal(3000)
  })

  it('Should overwrite the default port with the config', () => {
    const { app } = new Specla({
      port: 8080
    })
    expect(app.settings.port).to.be.equal(8080)
  })
})
