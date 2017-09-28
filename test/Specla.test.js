/* eslint-env jest */
import Specla from '../src'
import setup from './utils/setup'
import cleanup from './utils/cleanup'
import { version } from '../package.json'

beforeEach(setup)
afterEach(cleanup)

test('Should configure and create new application', () => {
  const specla = new Specla()
  expect(specla.config).toMatchSnapshot()
})

test('Should expose the version from package.json as a static property', () => {
  const specla = new Specla()
  expect(Specla.version).toBe(version)
})

test('Should expose the config object as a static property', () => {
  const specla = new Specla()
  expect(Specla.config).toBe(specla.config)
})
