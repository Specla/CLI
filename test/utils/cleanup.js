/* global __repoPath */
import { exec } from 'child_process'

export default done => {
  process.chdir(__repoPath)
  exec('rm -rf ./test/tmp', done)
}
