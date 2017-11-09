export default {
  'app.name': 'specla',
  'app.port': 3000,
  specla: {
    'runtime': 'server',
    'config.path': './config',
    'controller.path': './api/controllers',
    'command.path': './api/commands',
    'model.path': './api/models',
    'view.path': './src/views',
    'public.path': './public',
    storage: {
      path: './storage',
      app: './storage/app',
      cache: './storage/cache'
    }
  }
}
