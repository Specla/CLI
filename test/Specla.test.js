/* eslint-env jest */
import Specla from '../src'

beforeEach(() => Specla.reset())

test('Should configure and create new application', () => {
  const specla = new Specla()
  expect(specla.config.get()).toMatchSnapshot()
})

test('Should expose the version from package.json as a static property', () => {
  const specla = new Specla()
  expect(Specla.version).toBe(specla.version)
})

test('Should expose the config object as a static property', () => {
  const specla = new Specla()
  expect(Specla.config).toBe(specla.config)
})

test('Should throw error if multiple instances of Specla is created', () => {
  new Specla() // eslint-disable-line
  expect(() => new Specla()).toThrowErrorMatchingSnapshot()
})
