
import {connect} from '@buggyorg/library-client'

export function error (errorStr, command) {
  console.error('The command "' + command + '" failed with the following error:\n' + errorStr)
  process.exit(1)
}

export const searchNode = (server, query) => {
  return connect(server)
  .then((client) => client.components())
  .then((components) => components.filter((cmp) => cmp.indexOf(query) === 0))
}
