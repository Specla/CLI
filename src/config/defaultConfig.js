import path from 'path'

/**
 * Specla default config
 * @type {Object}
 */
export default {
  specla: {
    'build.path': './build',
    'src.path': './src',
    'config.path': config => './' + path.join(config.get('specla.build.path'), 'config'),
    'command.path': config => './' + path.join(config.get('specla.build.path'), 'commands')
  }
}
