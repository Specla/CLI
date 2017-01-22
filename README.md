# Specla

[![npm version](https://img.shields.io/npm/v/specla.svg)](https://www.npmjs.com/package/specla)
[![Build Status](https://travis-ci.org/Specla/Specla.svg?branch=master)](https://travis-ci.org/Specla/Specla)
[![Dependency Status](https://david-dm.org/specla/specla.svg)](https://david-dm.org/specla/specla)
[![devDependencies Status](https://david-dm.org/specla/specla/dev-status.svg)](https://david-dm.org/specla/specla?type=dev)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)


### Install
```sh
npm install specla -g
```

```js

// server.js or app.js

const Specla = require('specla')

const { app } = new Specla()

app.listen()

```

### Implement life cycle events like
  - `booted`: fired when the specla configuration is done
    - Should bind things like config staticly to the Specla object
