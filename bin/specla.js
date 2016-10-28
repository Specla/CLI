#!/usr/bin/env node

'use strict';

const SuperCLI = require('super-cli');
const CommandLoader = require('./libs/CommandLoader');

const cli = new SuperCLI({
  name: 'Specla'
});

new CommandLoader(cli);

cli.on('missing', () => {
  if(cli.has(['-v', '--version'])){
    return cli.trigger('version');
  }

  cli.trigger('help');
});

cli.start();
