import { dependencies } from '../package.json'

/**
 * Determine if a module can auto register
 * @param  {String} module
 * @return {Boolean}
 * @private
 */
function moduleShouldRegister (module) {
  const { specla } = require(module + '/package.json')

  if (typeof specla === 'object' && specla.register) {
    return true
  }

  return false
}

/**
 * Get the registration contract
 * @param  {String} module
 * @return {Function}
 */
function getRegistrationContract (module) {
  const { specla } = require(module + '/package.json')

  try {
    const register = require(module + '/' + specla.register)
  } catch (err) {
    throw new Error(`Couldn't auto register the ${module}`)
  }

  if (register.__esModule) {
    return register.default
  }

  return register
}

/**
 * Auto register modules
 * @param  {Config} config
 * @return {Object}
 * @public
 */
export default specla => {
  const modules = {}

  for (const module in dependencies) {
    try {
      if (moduleShouldRegister(module)) {
        const contract = getRegistrationContract(module)
        const { alias, obj } = contract(specla)
        modules[alias] = obj
      }
    } catch (err) {
      throw new Error(`Couldn't auto register module`)
    }
  }

  return modules
}
