#!/usr/bin/env node

'use strict';

const SuperCLI = require('super-cli');
const CommandLoader = require('./libs/CommandLoader');
global.packageInfo = require('../package.json');

const cli = new SuperCLI({
  name: 'Specla'
});

new CommandLoader(cli);

cli.on('missing', () => {
  cli.trigger('help');
});

cli.start();
