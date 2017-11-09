/* eslint-env jest */
import fs from 'fs'
import { exec } from 'child_process'
import configure from '../../src/config/configure'
import setup from '../utils/setup'
import cleanup from '../utils/cleanup'

beforeEach(setup)
afterEach(cleanup)

test('Should load the .env file if it exists in the project root', () => {
  configure()
  expect(process.env.APP_HOST).toBe('localhost')
  delete process.env.APP_HOST
})

test('Should work without the .env file', () => {
  fs.unlinkSync('.env')
  configure()
  expect(process.env.APP_HOST).toBe(undefined)
  delete process.env.APP_HOST
})

test('Should load config files from the config folder and merge them together', () => {
  const config = configure({ 'specla.config.path': './config' })
  expect(config).toMatchSnapshot()
})

test('Should merge the config argument in the constructor with the config files', () => {
  const config = configure({ app: { host: '127.0.0.1' } })
  expect(config.get('app.host')).toBe('127.0.0.1')
})

test('Should access item in the config object', () => {
  const config = configure({ mySettings: true })
  expect(config.get('mySettings')).toBe(true)
})

test('Should set new item in the config object', () => {
  const config = configure()
  config.set('app.setting', true)
  expect(config._flattenConfig['app.setting']).toBe(true)
  expect(config._config.app.setting).toBe(true)
})

test('Should work without a config folder', done => {
  exec('rm -rf ./config', () => {
    const config = configure({ setting: true })
    expect(config).toMatchSnapshot()
    done()
  })
})
