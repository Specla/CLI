/* eslint-env mocha */

const { expect } = require('chai')
const Specla = require('../lib/Specla')

describe('Specla.setupStaticFolder', () => {
  it('Should set the default static folder', () => {
    const { config } = new Specla()

    expect(config.paths.static).to.be.undefined
  })

  it('Should set the static folder by a config option', () => {
    const { config } = new Specla({
      paths: {
        static: 'some-other-path'
      }
    })

    expect(config.paths.static).to.be.equal('some-other-path')
  })
})
