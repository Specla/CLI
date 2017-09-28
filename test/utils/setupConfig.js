import fs from 'fs'

const configFile = `const { env } = process

export default {
  default: 'test',
  host: env.APP_HOST,
  array: ['item1', 'item2'],
  'locale.language': 'en-US',
  locale: {
    dateFormat: 'YY-mm-dd'
  }
}
`

export default () => {
  if (!fs.existsSync('./config')) {
    fs.mkdirSync('./config')
  }

  fs.writeFileSync('./config/app.js', configFile)
}
