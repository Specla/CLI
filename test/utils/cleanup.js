/* global __repoPath */
import { exec } from 'child_process'
import Specla from '../../src'

export default done => {
  Specla.destroy()
  process.chdir(__repoPath)
  exec('rm -rf ./test/tmp', done)
}
