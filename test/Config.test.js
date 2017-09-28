/* eslint-env jest */
import fs from 'fs'
import { exec } from 'child_process'
import Config from '../src/Config'
import setup from './utils/setup'
import cleanup from './utils/cleanup'

beforeEach(setup)
afterEach(cleanup)

test('Should load the .env file if it exists in the project root', () => {
  new Config() // eslint-disable-line
  expect(process.env.APP_HOST).toBe('localhost')
  delete process.env.APP_HOST
})

test('Should work without the .env file', () => {
  fs.unlinkSync('.env')
  new Config() // eslint-disable-line
  expect(process.env.APP_HOST).toBe(undefined)
  delete process.env.APP_HOST
})

test('Should load config files from the config folder and merge them together', () => {
  const config = new Config({ 'config.path': './config' })
  expect(config).toMatchSnapshot()
})

test('Should merge the config argument in the constructor with the config files', () => {
  const config = new Config({ app: { host: '127.0.0.1' } })
  expect(config.get('app.host')).toBe('127.0.0.1')
})

test('Should access item in the config object', () => {
  const config = new Config({ mySettings: true })
  expect(config.get('mySettings')).toBe(true)
})

test('Should set new item in the config object', () => {
  const config = new Config()
  config.set('app.setting', true)
  expect(config._flattenConfig['app.setting']).toBe(true)
  expect(config._config.app.setting).toBe(true)
})

test('Should work without a config folder', done => {
  exec('rm -rf ./config', () => {
    const config = new Config({ setting: true })
    expect(config).toMatchSnapshot()
    done()
  })
})
