/* eslint-env jest */
import CLI from '../../src/cli/CLI'
import Command from '../../src/cli/Command'

afterEach(() => CLI.reset())

test('Should set runtime to cli', () => {
  const cli = new CLI()
  expect(cli.config.get('specla.runtime')).toBe('cli')
})

test('Should load the specla commands', () => {
  const cli = new CLI()
  expect(cli._commands).toMatchSnapshot()
})

test('Should parse arguments and options', () => {
  const backup = process.argv
  process.argv = ['node', 'specla', 'test:command', 'argument', '-th', '--name=name', '--lastname', 'lastname']
  const cli = new CLI()
  expect(cli._command).toBe('test:command')
  expect(cli._args).toMatchSnapshot()
  expect(cli._options).toMatchSnapshot()
  process.argv = backup
})

test('Should parse argument and options to the Command class', () => {
  const cli = new CLI()
  expect(cli._options).toBe(Command.options)
  expect(cli._args).toBe(Command.args)
})

test('Should trigger run the command', () => {
  const cli = new CLI()
  expect(cli.run()).toMatchSnapshot()
})
