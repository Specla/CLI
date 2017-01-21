/* eslint-env mocha */

const { expect } = require('chai')
const Specla = require('../lib/Specla')

describe('Specla.setupDefaultConfig', () => {
  it('Should setup the default config if nothing is specified', () => {
    const specla = new Specla()

    expect(specla.config)
      .to.be.deep.equal({
        paths: {
          routes: 'api/routes.js'
        }
      })
  })

  it('Should not set the default value if some thing is specified', () => {
    const specla = new Specla({
      key: 'value',
      paths: {
        routes: 'routes.js'
      }
    })

    expect(specla.config)
      .to.be.deep.equal({
        key: 'value',
        paths: {
          routes: 'routes.js'
        }
      })
  })
})
