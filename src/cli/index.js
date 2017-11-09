#!/usr/bin/env babel-node
// TODO Should compile and cache esnext files on the fly, cached files could be placed in the storage folder

import minimist from 'minimist'
import Specla from '../'
import loadCommands from './loadCommand'

const specla = new Specla({ 'specla.runtime': 'cli' })
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
