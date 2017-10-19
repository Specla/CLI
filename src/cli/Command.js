import readline from 'readline'

export default class Command {
  static options = {}

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
   * @param  {Number} [code=1]
   */
  exit (code) {
    process.exit(code)
  }
}
