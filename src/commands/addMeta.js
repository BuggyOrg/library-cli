
import {connect} from '@buggyorg/library-client'
import {error, searchNode, log} from '../utils'
import {input} from 'cli-ext'

export const command = 'add-meta <component> <key>'
export const desc = 'Get a meta key for a component'
export const builder = (yargs) => {
  return yargs.completion('', (current, argv) => {
    if (current === 'search') return []
    if (argv._.length === 4) {
      return searchNode(argv.library, current)
    }
    return
  })
}
export const handler = (argv) => {
  log(argv, 'Meta information ' + argv.key + ' for component `' + argv.component + '` [' + argv.library + ']')
  return connect(argv.library)
  .then((con) => input(null)
    .then((contents) => con.addMeta(argv.component, argv.key, contents, argv.version)))
  .then(() => console.log('Added meta information successfully.'))
  .catch((err) => error(err, command))
}
