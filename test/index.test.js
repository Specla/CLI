/* eslint-env jest */

import index from 'index'

test('Should export the Specla class', () => {
  expect(index.prototype.constructor.name).toBe('Specla')
})
