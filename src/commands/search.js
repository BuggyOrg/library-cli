
export const command = 'search <query>'
export const desc = 'Search a component'
export const builder = (yargs) => {
  return yargs.completion('', () => ['abc', 'def'])
}
export const handler = (argv) => {
  console.log('Searching for ' + argv.query)
}
