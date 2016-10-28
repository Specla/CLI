'use strict';

const Specla = require('specla');
const config = require('./config');

const server = new Specla(config);

server.listen();
