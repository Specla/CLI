#!/usr/bin/env node

'use strict';

const Specla = require('specla');
const SuperCLI = require('super-cli');
const CommandLoader = require('./libs/CommandLoader');

global.packageInfo = require('../package.json');

let config = {};
try { config = require(process.cwd()+'/config'); } catch(err) {}

const specla = new Specla(config);

const cli = new SuperCLI({
  name: 'Specla'
});

specla.modules.cli = cli;

new CommandLoader(cli);

cli.on('missing', () => {
  cli.trigger('help');
});

cli.start();
