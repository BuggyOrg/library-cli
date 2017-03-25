
import {connect} from '@buggyorg/library-client'
import {error, searchNode, log} from '../utils'

export const command = 'show'
export const desc = 'Shows the definition of a component.'
export const builder = (yargs) => {
  return yargs.completion('', (current, argv) => {
    if (current === 'search') return []
    return searchNode(argv.library, current)
  })
  .option('p', 'prettyprint')
  .demand(1)
}
export const handler = (argv) => {
  log(argv, 'Showing component:', argv._[1])
  return Promise.resolve(connect(argv.library))
  .then((client) => client.component(argv._[1]))
  .then((res) => {
    if (argv.prettyprint) {
      console.log(JSON.stringify(res, null, 2))
    } else {
      console.log(JSON.stringify(res))
    }
  })
  .catch((err) => error(err, 'show'))
}
