/* global describe, it, before, after */

const assert = require('assert')
const request = require('request')
const { spawn } = require('child_process')

const Specla = require('specla')
const config = require('../.tmp/config')
const app = new Specla(config)

let events = []
let server = null

describe('# Specla.listen:', () => {
  before(() => {
    app.on('ready', () => {
      events.push('ready')
    })
  })

  it('Should start the server', function (done) {
    this.timeout(5000)
    this.slow(3000)
    server = spawn('node', ['server.js'])
    setTimeout(() => {
      request('http://localhost:3000', (err, res, body) => {
        if (err) throw err
        assert.equal(200, res.statusCode)
        done()
      })
    }, 1000)
  })

  after(() => {
    server.kill()
  })
})