/* global describe, it, before */

const assert = require('assert')

const Specla = require('../../lib/Specla')
const config = require('../.tmp/config')
const app = new Specla(config)

describe('# Specla.off:', () => {
  before(() => {
    app.on('test', arg => {})
  })

  it('Should remove event listener', () => {
    app.off('test')
    assert.equal(undefined, app._events['test'])
  })
})
