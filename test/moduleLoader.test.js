/* eslint-env jest */
import Specla from '../src/Specla'
import moduleLoader from '../src/moduleLoader'
import setup from './utils/setup'
import cleanup from './utils/cleanup'

beforeEach(setup)
afterEach(cleanup)

test('Should check if any of the dependencies should be auto configured', () => {
  const specla = new Specla()
  moduleLoader(specla)
})
