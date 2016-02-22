#!/usr/bin/env node

'use strict';
var Cli = require('./cli');


var cli = new Cli({
  name: 'Specla',
});


cli.on(['help', '-h', 'h'], () => {
  cli.log('Help...');
});


cli.on(['new', 'create'], (name) => {
  if(name === undefined){
    cli.info('To create a new Specla project you have to give it a name');
    return;
  }

  cli.info('Creating a new Specla project: '+name);
});

cli.start();