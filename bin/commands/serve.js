/* global cli */
const fs = require('fs')
const path = require('path')
const pm2 = require('pm2')
const Specla = require('../../lib')
const { exec, spawn } = require('child_process')
const moment = require('moment')

let devProcess = null

const serve = () => {
  if (cli.option('--watch')) {
    return setupWatchMode()
  }

  if (fs.existsSync(path.join(process.cwd(), 'server.js'))) {
    return require(path.resolve(process.cwd(), 'server.js'))
  }

  const { app, config } = new Specla()

  app.listen(config.port || 3000)
}

function setupWatchMode () {
  process.env.NODE_ENV = 'development'

  pm2.connect(function (err) {
    if (err) throw err

    pm2.start({
      name: 'specla-development',
      script: 'specla',
      exec_mode: 'fork',
      cwd: process.cwd(),
      watch: true,
      ignore_watch: ['src', 'static']
    }, (err, apps) => {
      if (err) throw err
      printLog()
      process.on('exit', () => exec(`pm2 delete specla-development`))
    })

    process.on('SIGINT', () => {
      devProcess.exit()
      process.exit()
    })
  })
}

function printLog () {
  devProcess = spawn('pm2', ['log', '--json', 'specla-development'])
  devProcess.stdout.on('data', data => {
    let { message } = JSON.parse(data.toString())

    if (!message) {
      return
    }

    console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}]`, message.replace(new RegExp(' {3}', 'g'), '\n  '))
  })
}

module.exports = serve
