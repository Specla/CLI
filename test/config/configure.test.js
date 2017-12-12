/* eslint-env jest */
import fs from 'fs'
import { exec } from 'child_process'
import configure from '../../src/config/configure'

test('Should merge the config argument in the constructor with the config files', () => {
  const config = configure({ app: { host: '127.0.0.1' } })
  expect(config.get('app.host')).toBe('127.0.0.1')
})

test('Should access item in the config object', () => {
  const config = configure({ mySettings: true })
  expect(config.get('mySettings')).toBe(true)
})
