#!/usr/bin/env node

const SuperCLI = require('super-cli')
const commandLoader = require('./libs/CommandLoader')

const cli = new SuperCLI({
  name: 'Specla'
})

commandLoader(cli)

cli.on('missing', () => {
  if (cli.has(['-v', '--version'])) {
    return cli.trigger('version')
  }

  cli.trigger('help')
})

cli.start()
