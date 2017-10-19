#!/usr/bin/env node

import minimist from 'minimist'
import Specla from '../Specla'
import loadCommands from './loadCommand'

const specla = new Specla()
const commands = loadCommands(specla.config)
const args = minimist(process.argv.slice(2))

function run () {
  for (const command of args._) {
    if (command === 'help') return new commands['help'](commands) // eslint-disable-line

    if (commands[command]) {
      return new commands[command](...args._.slice(1)) // eslint-disable-line
    }
  }

  return new commands['help'](commands) // eslint-disable-line
}

run()
