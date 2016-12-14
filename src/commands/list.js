
import {connect} from '@buggyorg/library-client'
import {error} from '../utils'

export const command = 'list'
export const desc = 'List all components'
export const handler = (argv) => {
  console.log('Listing all components [' + argv.library + ']')
  return connect(argv.library)
  .then((con) => con.components())
  .then((comps) => console.log('Components: ', comps))
  .catch((err) => error(err, command))
}
