
import {connect} from '@buggyorg/library-client'

export const command = 'list'
export const desc = 'List all components'
export const handler = (argv) => {
  console.log('Listing all components')
  console.log(argv.server)
  Promise.resolve(connect(argv.server))
  .then((con) => con.components())
  .then((comps) => console.log('Components: ', comps))
  .catch((err) => console.error(err))
}
