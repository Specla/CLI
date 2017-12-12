/* global __repoPath */
import { exec } from 'child_process'
import Specla from '../../src'

export default done => {
  Specla.reset()
  process.chdir(__repoPath)
  exec('rm -rf ./test/tmp', done)
}
