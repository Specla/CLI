/* eslint-env jest */
import Express from '../src/Express'
import setup from './utils/setup'
import cleanup from './utils/cleanup'

beforeEach(setup)
afterEach(cleanup)

test('Should export the enhanced Router class', () => {
  expect(!Express.Router).toBe(true)
})

test('Should export properties', () => {
  const app = new Express()
  expect(app.locals).toMatchSnapshot()
  expect(app.mountpath).toMatchSnapshot()
})

test('Should proxy .use to the express instance', () => {
  const app = new Express()
  app.use(function testMiddleware (req, res, next) {})
  expect(app._express._router.stack[2].name).toBe('testMiddleware')
})

test('Should proxy .all to the express instance', () => {
  const app = new Express()
  app.all('all', function allCallback (req, res) {})
  expect(app._express._router.stack[2]).toMatchSnapshot()
})

test('Should proxy .get (http) to the express instance', () => {
  const app = new Express()
  app.get('get', function getCallback (req, res) {})
  expect(app._express._router.stack[2]).toMatchSnapshot()
})

test('Should proxy .get (retreive value) to the express instance', () => {
  const app = new Express()
  app.enable('trust proxy')
  expect(app.get('trust proxy')).toBe(true)
})

test('Should proxy .post to the express instance', () => {
  const app = new Express()
  app.post('post', function deleteCallback (req, res) {})
  expect(app._express._router.stack[2]).toMatchSnapshot()
})

test('Should proxy .put to the express instance', () => {
  const app = new Express()
  app.put('put', function deleteCallback (req, res) {})
  expect(app._express._router.stack[2]).toMatchSnapshot()
})

test('Should proxy .delete to the express instance', () => {
  const app = new Express()
  app.delete('delete', function deleteCallback (req, res) {})
  expect(app._express._router.stack[2]).toMatchSnapshot()
})

test('Should proxy .disable to the express instance', () => {
  const app = new Express()
  app.disable('trust proxy')
  expect(app._express.get('trust proxy')).toBe(false)
})

test('Should proxy .disabled to the express instance', () => {
  const app = new Express()
  app.disable('trust proxy')
  expect(app.disabled('trust proxy')).toBe(true)
})

test('Should proxy .enable to the express instance', () => {
  const app = new Express()
  app.enable('trust proxy')
  expect(app._express.enabled('trust proxy')).toBe(true)
})

test('Should proxy .enabled to the express instance', () => {
  const app = new Express()
  app.enable('trust proxy')
  expect(app.enabled('trust proxy')).toBe(true)
})

test('Should proxy .engine to the express instance', () => {
  const app = new Express()
  app.engine('pug', () => {})
  expect(app._express.engines).toMatchSnapshot()
})

test('Should proxy .listen to the express instance', done => {
  const app = new Express()
  const server = app.listen(3000, () => {
    server.close()
    done()
  })
})

test('Should proxy .param to the express instance', () => {
  const app = new Express()
  app.param('id', () => {})
  expect(app._express._router.params).toMatchSnapshot()
})

test('Should proxy .path to the express instance', () => {
  const app = new Express()
  const blog = new Express()
  app.use('/test', blog)
  expect(blog.path()).toBe('/test')
})

test('Should proxy .render method to express instance', () => {
  const app = new Express()
  expect(app.render instanceof Function).toBe(true)
})

test('Should proxy .route method to express instance', () => {
  const app = new Express()
  app.route('/test')
    .all(function all () {})
    .get(function get () {})

  expect(app._express._router.stack[2]).toMatchSnapshot()
})

test('Should proxy .set method to express instance', () => {
  const app = new Express()
  app.set('test', true)
  expect(app.get('test')).toBe(true)
})

test('Should proxy .on method to the express instance', () => {
  const app = new Express()
  app.on('mount', () => {})
  expect(app._express._events).toMatchSnapshot()
})
