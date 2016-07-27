
Specla.on('make:controller', 'make/controller');

Specla.on('missing', () => {
  Log.warn('The command doesn\'t exist');
});
