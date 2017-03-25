
import {connect} from '@buggyorg/library-client'
import {error, searchNode, log} from '../utils'
import dropWhile from 'lodash/fp/dropWhile'

export const command = 'show'
export const desc = 'Shows the definition of a component.'
export const builder = (yargs) => {
  return yargs.completion('', (current, argv) => {
    if (current === 'search') return []
    return searchNode(argv.library, current)
  })
  .option('prettyprint', {alias: 'p'})
  .demand(1)
}
export const handler = (argv) => {
  const args = dropWhile((a) => a !== 'show', argv._)
  log(argv, 'Showing component:', args[1])
  return Promise.resolve(connect(argv.library))
  .then((client) => client.component(args[1]))
  .then((res) => {
    if (argv.prettyprint) {
      console.log(JSON.stringify(res, null, 2))
    } else {
      console.log(JSON.stringify(res))
    }
  })
  .catch((err) => error(err, 'show'))
}
