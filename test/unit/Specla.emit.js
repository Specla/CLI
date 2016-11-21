/* global describe, it, before */

const assert = require('assert')

const Specla = require('../../lib/Specla')
const config = require('../.tmp/config')
const app = new Specla(config)

let result = null

describe('# Specla.emit:', () => {
  before(() => {
    app.on('test 1', data => {
      result = data
    })

    app.on('test 2', (arg1, arg2) => {
      result = [arg1, arg2]
    })

    app.on('multiple', data => {
      result.push(data)
    })

    app.on('multiple', data => {
      result.push(!data)
    })
  })

  it('Should tigger event test 1 with one argument', done => {
    app.emit('test 1', true)
    setTimeout(() => {
      assert.equal(true, result)
      done()
    }, 0)
  })

  it('Should tigger event test 2 with two arguments', done => {
    app.emit('test 2', true, false)
    setTimeout(() => {
      assert.deepEqual([true, false], result)
      done()
    }, 0)
  })

  it('Should tigger multiple event callbacks', done => {
    app.emit('multiple', true)
    setTimeout(() => {
      assert.deepEqual([true, false, true, false], result)
      done()
    }, 0)
  })
})
