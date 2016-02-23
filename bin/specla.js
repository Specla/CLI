#!/usr/bin/env node

'use strict';
var Cli = require('./libs/cli');
var Log = require('./libs/log');


var App = new Cli({
  name: 'Specla',
});


App.on(['help', '-h'], require('./events/help'));
App.on(['new', 'create', '-n', '-c'], require('./events/createProject'));
App.on(['version', '-v'], () => Log.info(App.version));

App.on('serve', () => {
  Log.info('Starting dev server....');

  while (true) {}
});





