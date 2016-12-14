
import {error, searchNode} from '../utils'

export const command = 'search <query>'
export const desc = 'Search a component'
export const builder = (yargs) => {
  return yargs.completion('', (current, argv) => {
    if (current === 'search') return []
    return searchNode(argv.library, current)
  })
}
export const handler = (argv) => {
  console.log('Searching for ' + argv.query + ' [' + argv.library + ']')
  return searchNode(argv.library, argv.query)
  .then((res) => {
    if (res.length === 0) return Promise.reject('No component found that matches "' + argv.query + '"')
    console.log(res)
  })
  .catch((err) => error(err, 'search'))
}
