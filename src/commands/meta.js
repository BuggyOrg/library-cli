
import {connect} from '@buggyorg/library-client'
import {error, searchNode, log} from '../utils'

export const command = 'meta <component> [key] [version]'
export const desc = 'Get a meta key for a component'
export const builder = (yargs) => {
  return yargs.completion('', (current, argv) => {
    if (current === 'search') return []
    if (argv._[argv._.length - 2] === 'search') {
      return searchNode(argv.library, current)
    }
    return
  })
}
export const handler = (argv) => {
  log(argv, 'Meta information ' + ((argv.key) ? argv.key : '') + ' for component `' + argv.component + '` [' + argv.library + ']')
  return connect(argv.library)
  .then((con) => con.meta(argv.component, argv.key, argv.version))
  .then((meta) => console.log(meta))
  .catch((err) => error(err, command))
}
