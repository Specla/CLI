# Specla

[![npm version](https://img.shields.io/npm/v/specla.svg)](https://www.npmjs.com/package/specla)
[![Build Status](https://travis-ci.org/Specla/Specla.svg?branch=master)](https://travis-ci.org/Specla/Specla)
[![Dependency Status](https://david-dm.org/specla/specla.svg)](https://david-dm.org/specla/specla)
[![devDependencies Status](https://david-dm.org/specla/specla/dev-status.svg)](https://david-dm.org/specla/specla?type=dev)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

### What?? another js web framework?
This is properly what your are thinking when your are seeing this repo. But the
goal of this project is not to create a new framework with a lot of new
api's to learn. This is just an extension of the express framework.

The basics of this extension is to make the web development environment in node
more intuitive an expressive. I love the express framework and its simplicity,
but you have to configure and put the stack together for every project,
and the config is almost identical per project.
Wouldn't it be great if all this just worked, but without compromising the
simplicity and extensibility of the express framework.
This is exactly what this project is about, delivering a secure, expressive and
intuitive implementation of a web server in node.js with the express framework
as the main engine. :rocket:

```js
// To setup express with a basic config all you have to do is this and your
// good to go
const Specla = require('specla')
const { app } = new Specla()

app.get('/some-cool-express-route', (req, res) =>
  res.send('This is awesome, no more config hell...')
)

app.listen(3000)
```

When your Specla app is instantiated you will be able to import the following
modules from the Specla package.
  - `app`: The express app
  - `config`: The app configuration
  - `Controller`: A base controller to extend other controllers functionality
    like methods for easier request validation
  - `router`: An extended express router, you should be able to give it a path
    to a controller file instead of just functions (it will require the controller
    file for you) (not implemented yet)
  - `more to come..`

Those modules are just examples and not all of them are implement yet, but this is
just to give you a basic idea of what this is about. The Specla modules are only
ment to make the code more expressive, intuitive and easier to reason about.
If you don't like them you can always just use Specla as the basic setup
and use express as you've always done.

### Smart imports
The main idea is that you will have access to the modules from the Specla package.
So you can just require or import them as any other module or npm package.
```js
// access the express app from anywere in your project without polluting your
// global scope
const { app } = require('specla')

// if you use es6
import { app } from 'specla'
```

If you want to access your application config it's as simple as.
```js
const { config } = require('specla')
```

An other example could be in your controller files you want to extend your
controller class to get some extra functionality as request validation.
```js
const { Controller } = require('specla')

class MyController extends Controller {

  action (req, res) {
    res.send('Hey from MyController')
  }

}
```

### What does Specla configure for you
When you instantiate Specla it will setup the following modules.
  - `express-session`: For session handling, can be configured in the `specla.config.js`
  - `compression`: Compresses the response bodies for requests
  - `dotenv`: Loads the `.env` config if the file exists in the project root
  - `body-parser`: Parses the request body into an Object
  - `lusca`: Handles basic security like csrf-token, nosniff, x-frame and xss-protection
  - `multer`: Handles file uploads
  - `pug`: The default template engine, can be configured in `specla.config.js`
  - If you are missing something you can just configure it via express as you
    are used too.

#### More to come...

### Example `specla.config.js`
```js
module.exports = {
  key: 'secret-key',
  host: 'http://localhost',
  port: 3000

  paths: {
    routes: 'path/to/routes.js',
    controllers: 'where/is/your/controllers/located?',
    middlewares: 'where/is/your/controllers/located?',
    storage: 'application/data/path'
  }
}
```
