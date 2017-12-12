import { spawn } from 'child_process'
import Command from '../Command'
import Build from './build/Build'
import { config } from '../../'

export default class Serve extends Command {
  /**
   * Command signature
   * @type {String}
   */
  static signature = 'serve'

  /**
   * Command description
   */
  static description = 'Start server'

  build = null
  process = null

  constructor () {
    super()

    Command.options.watch = true
    this.build = new Build()

    this.build.process.stdout.on('data', () => {
      if (this.process) this.process.kill()
    })

    this.startServer()

    process.on('exit', () => {
      this.process.kill()
    })
  }

  startServer () {
    if (this.process) {
      return
    }

    console.log('starting process')

    this.process = spawn('node', [`${config.get('specla.build.path')}/server.js`])
    this.process.stderr.on('data', data => this.stdout(data.toString()))
    this.process.stdout.on('data', data => this.stdout(data.toString()))
    this.process.on('close', code => {
      this.process = null
      setTimeout(() => this.startServer(), 3000)
    })
  }
}
