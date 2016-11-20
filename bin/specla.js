#!/usr/bin/env node

const SuperCLI = require('super-cli')
const CommandLoader = require('./libs/CommandLoader')

const cli = new SuperCLI({
  name: 'Specla'
})

CommandLoader(cli)

cli.on('missing', () => {
  if (cli.has(['-v', '--version'])) {
    return cli.trigger('version')
  }

  cli.trigger('help')
})

cli.start()
