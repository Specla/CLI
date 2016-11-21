/* global describe, it, before */

const assert = require('assert')

const Specla = require('../../lib/Specla')
const config = require('../.tmp/config')
const app = new Specla(config)

describe('# Specla.on:', () => {
  before(() => {
    app.on('test', arg => {})
  })

  it('Should add event listener', () => {
    assert.equal(true, app._events['test'] !== undefined)
  })

  it('Should add another event listener', () => {
    app.on('test', arg => {})
    assert.equal(2, app._events['test'].length)
  })
})
