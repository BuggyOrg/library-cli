
import {connect} from '@buggyorg/library-client'
import {error, searchNode} from '../utils'
import {input} from 'cli-ext'

export const command = 'add-meta <component> <key>'
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
  .then((con) => input(null)
    .then((contents) => con.addMeta(argv.component, argv.key, contents, argv.version)))
  .then(() => console.log('Added meta information successfully.'))
  .catch((err) => error(err, command))
}
