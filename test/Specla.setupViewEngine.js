/* eslint-env mocha */

const { expect } = require('chai')
const Specla = require('../lib/Specla')

describe('Specla.setupViewEngine', () => {
  it('Should set the default view engine to pug and the path to src/views', () => {
    const { app } = new Specla()

    expect(app.settings['view engine']).to.be.equal('pug')
    expect(app.settings['views']).to.be.equal('src/views')
  })

  it('Should set the view engine and src from config', () => {
    const { app } = new Specla({
      view: {
        engine: 'some-other-engine',
        path: 'some-other-folder'
      }
    })

    expect(app.settings['view engine']).to.be.equal('some-other-engine')
    expect(app.settings['views']).to.be.equal('some-other-folder')
  })
})
