import { spawn } from 'child_process'
import Command from '../../../command/Command'
import { config } from '../../../'

export default class Build extends Command {
  /**
   * Command signature
   * @type {String}
   */
  static signature = 'build'

  /**
   * Command description
   */
  static description = 'Build destribution package'

  process = null

  constructor (path = './src') {
    super()
    const ignore = ['node_modules', 'dist']
    const args = [
      path,
      '-D',
      '--ignore',
      ignore.join(','),
      '-d',
      config.get('specla.build.path')
    ]

    if (this.options('w', 'watch')) args.push('--watch')

    this.process = spawn('babel', args)

    this.process.on('close', code => {
      this.exit(code)
    })

    process.on('exit', () => {
      this.process.kill()
    })
  }
}
