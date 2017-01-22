#!/usr/bin/env node

const SuperCLI = require('super-cli')
const commandLoader = require('./libs/CommandLoader')

const cli = new SuperCLI({
  name: 'Specla'
})

commandLoader(cli)

cli.on('*', () => {
  if (cli.option('-v', '--version')) {
    return cli.run('version')
  }

  cli.run('help')
})
