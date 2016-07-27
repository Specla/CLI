#!/usr/bin/env node

'use strict';

const CLI = require('../libs/Cli');
const fs = require('fs');
global.Log = require('../libs/Log');

global.Specla = new CLI({
  name: 'specla',
  path: __dirname+'/commands',
  default: 'help'
});
let ps;

Specla.on('create', 'create');
Specla.on('serve', 'serve');
Specla.on('help', 'help');

// try {
//   let ps = JSON.parse(fs.readFileSync(process.cwd()+'/package.json', 'utf8'));
//   ps.dependencies.specla;
// } catch(err) {
//   return Log.error('The current directory is not a Specla project...');
// }

require('./commands');

Specla.start();
