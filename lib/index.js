const Specla = require('./Specla')

/**
 * Specla module exports
 */
Specla.app = null
Specla.config = null
Specla.upload = null
Specla.router = null
Specla.Validator = require('@specla/validator')
Specla.types = require('@specla/validator/lib/types')
Specla.Controller = require('./controller')

module.exports = Specla
