/* eslint-env mocha */

const fs = require('fs')
const path = require('path')
const { expect } = require('chai')
const Specla = require('../lib/Specla')

describe('Specla.setupMulter', () => {
  it('Should setup express multer for handling file uploads', () => {
    const specla = new Specla({
      paths: {
        storage: 'storage'
      }
    })

    expect(specla.upload).to.be.a.object
    fs.rmdirSync(path.resolve(__dirname, 'storage'))
  })
})
