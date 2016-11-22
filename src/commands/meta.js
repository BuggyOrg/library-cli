
import {connect} from '@buggyorg/library-client'
import {error, searchNode} from '../utils'

export const command = 'meta <component> <key> [version]'
export const desc = 'Get a meta key for a component'
export const builder = (yargs) => {
  return yargs.completion('', (current, argv) => {
    if (current === 'search') return []
    if (argv._.length === 4) {
      return searchNode(argv.server, current)
    }
    return
  })
}
export const handler = (argv) => {
  console.log('Meta information ' + argv.key + ' for ' + argv.node)
  return connect(argv.server)
  .then((con) => con.meta(argv.component, argv.key, argv.version))
  .then((meta) => console.log(meta))
  .catch((err) => error(err, command))
}
