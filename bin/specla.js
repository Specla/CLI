#!/usr/bin/env node

/* global cli */

const SuperCLI = require('super-cli')
const commands = require('./commands')

global.cli = new SuperCLI({
  name: 'Specla'
})

for (let command in commands) {
  cli.on(command, commands[command])
}

cli.on('*', (arg) => {
  if (cli.option('-v', '--version')) {
    return cli.run('version')
  }

  if (cli.option('-h', '--help') && !arg) {
    return cli.run('help')
  }

  cli.run('serve')
})
