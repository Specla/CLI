import fs from 'fs'
import { resolve } from 'path'
import Create from '../../src/cli/commands/Create'

global.__repoPath = process.cwd()

export default () => {
  const projectPath = './test/tmp'

  if (!fs.existsSync(projectPath)) {
    fs.mkdirSync(projectPath)
  }

  process.chdir(projectPath)

  new Create() //eslint-disable-line
}
