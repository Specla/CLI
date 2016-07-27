#!/usr/bin/env node

'use strict';

const CLI = require('../libs/Cli');
global.Log = require('../libs/Log');

global.Specla = new CLI({
  name: 'specla',
  path: __dirname+'/commands',
  default: 'help'
});


Specla.on('serve', 'serve');
Specla.on('help', 'help');


Specla.on('missing', () => {
  Log.warn('The command doesn\'t exist');
});

Specla.start();
