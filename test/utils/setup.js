import fs from 'fs'
import setupDotEnv from './setupDotEnv'
import setupConfig from './setupConfig'

global.__repoPath = process.cwd()

export default () => {
  const projectPath = './test/tmp'

  if (!fs.existsSync(projectPath)) {
    fs.mkdirSync(projectPath)
  }

  process.chdir(projectPath)

  setupDotEnv()
  setupConfig()
}
