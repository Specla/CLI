import fs from 'fs'

const dotEnvFile = `APP_HOST=localhost`

export default () => {
  if (fs.existsSync('.env')) {
    return
  }

  fs.writeFileSync('.env', dotEnvFile)
}
