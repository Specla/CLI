'use strict';

const { exec } = require('child_process');

exec('npm link');

require('./create');
