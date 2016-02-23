'use strict';

var Log = require('../libs/log');

function help(){

  var txt = [
    '',
    '  Usage:',
    '     specla [event] <arguments 1> <arguments 2> ...',
    '',
    '  Evnets:',
    '     new <name>  : Creates new project',
    '     version     : Get the CLi version',
    '     debug       : Enable debugging',
    '     serve       : Starts a simple developments server',
    '     help        : Get help',
    '',
    '',
    '  Example of how to create a new project',
    '     specla new blog',
    ''
  ];

  Log.info(txt.join('\n'));
}

module.exports = help;
