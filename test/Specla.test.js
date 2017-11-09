/* eslint-env jest */
import Specla from '../src'
import setup from './utils/setup'
import cleanup from './utils/cleanup'

beforeEach(setup)
afterEach(cleanup)

test('Should configure and create new application', () => {
  const specla = new Specla()
  expect(specla.config).toMatchSnapshot()
})

test('Should expose the version from package.json as a static property', () => {
  const specla = new Specla()
  expect(Specla.version).toBe(specla.version)
})

test('Should expose the config object as a static property', () => {
  const specla = new Specla()
  expect(Specla.config).toBe(specla.config)
})

test('Should only create a server instance if the runtime is server', () => {
  const speclaCli = new Specla({ 'specla.runtime': 'cli' })
  expect(speclaCli.server).toBe(undefined)
  expect(Specla.server).toBe(null)
  Specla.reset()

  const speclaServer = new Specla()
  expect(!!speclaServer.server._express).toBe(true)
  expect(speclaServer.server).toBe(Specla.server)
})

test('Should throw error if multiple instances of Specla is created', () => {
  new Specla() // eslint-disable-line
  expect(() => new Specla()).toThrowErrorMatchingSnapshot()
})
