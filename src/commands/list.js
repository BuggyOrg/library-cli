
import {connect} from '@buggyorg/library-client'
import {error} from '../utils'

export const command = 'list'
export const desc = 'List all components'
export const handler = (argv) => {
  console.log('Listing all components')
  console.log(argv.server)
  return connect(argv.server)
  .then((con) => con.components())
  .then((comps) => console.log('Components: ', comps))
  .catch((err) => error(err, command))
}
