const { env } = process

export default {
  host: env.APP_HOST || 'localhost',
  port: env.APP_PORT || 3000
}
