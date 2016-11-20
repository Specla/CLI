/* global describe, it, before, after */

const assert = require('assert')
const request = require('request')
const { spawn } = require('child_process')

let server

describe('# Command: serve', () => {
  before(done => {
    server = spawn('node', ['server.js'])
    setTimeout(done, 1000)
  })

  it('Should start the web server', function (done) {
    request('http://localhost:3000', (err, res, body) => {
      if (err) throw err
      assert.equal(200, res.statusCode)
      done()
    })
  })

  after(() => {
    server.kill()
  })
})
