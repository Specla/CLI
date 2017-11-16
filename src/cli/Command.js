import readline from 'readline'

export default class Command {
  /**
   * CLI arguments
   * @type {Array}
   */
  static args = []

  /**
   * CLI options
   * @type {Object}
   */
  static options = {}

  /**
   * Available commands
   * @type {Object}
   */
  static availableCommands = {}

  /**
   * Check if option is set and return the value
   * @param  {String} options
   * @return {Mixed}
   */
  options (...options) {
    for (const option of options) {
      if (Command.options[option] !== undefined) return Command.options[option]
    }
  }

  /**
   * Alias for options method
   * @param  {String} options
   * @return {Mixed}
   */
  option (...options) {
    return this.options(...options)
  }

  /**
   * Listen for data on stdin
   * @return {Promise}
   */
  stdin () {
    return Promise(resolve => {
      process.stdin.on('readable', () => {
        const data = process.stdin.read()

        if (data !== null) {
          resolve(data)
        }
      })
    })
  }

  /**
   * Write message to stdout
   * @param {String} message
   */
  stdout (message) {
    process.stdout.write(message)
  }

  /**
   * Ask the user a question
   * @param  {String} question
   * @return {Promise}
   */
  prompt (question) {
    return new Promise(resolve => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      })

      rl.question(question + ' ', result => {
        resolve(result)
        rl.close()
      })
    })
  }

  /**
   * Exit process with an exit code
   * @param  {Number} [code=0]
   */
  exit (code = 0) {
    process.exit(code)
  }
}
