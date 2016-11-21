
import {connect} from '@buggyorg/library-client'
import {error} from '../utils'

const search = (server, query) => {
  return connect(server)
  .then((client) => client.components())
  .then((components) => components.filter((cmp) => cmp.indexOf(query) === 0))
}

export const command = 'search <query>'
export const desc = 'Search a component'
export const builder = (yargs) => {
  return yargs.completion('', (current, argv) => {
    if (current === 'search') return []
    return search(argv.server, current)
  })
}
export const handler = (argv) => {
  console.log('Searching for ' + argv.query)
  return search(argv.server, argv.query)
  .then((res) => {
    if (res.length === 0) return Promise.reject('No component found that matches "' + argv.query + '"')
    console.log(res)
  })
  .catch((err) => error(err, 'search'))
}
