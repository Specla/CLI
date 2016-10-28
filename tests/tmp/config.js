const ENV = process.env;

module.exports = {

  namespace: "Specla",

  api: {
    host: ENV.APP_HOST || 'localhost',
    debug: ENV.DEBUG || true,
    key: ENV.KEY || 'somekey'
  },

  server: {
    port: ENV.SERVER_PORT || 3000
  },

  database: {
    driver: 'mongo',
    host: ENV.DB_HOST || '192.168.99.100',
    port: ENV.DB_PORT || 32768,
    database: ENV.DB_DATABASE || 'mydb'
  },

  view: {
    engine: 'pug',
    path: 'resources/views'
  },

  autoloader: {
    global: [
      'api/models'
    ]
  }

};
