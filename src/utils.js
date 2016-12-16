
import {connect} from '@buggyorg/library-client'

export function error (errorStr, command, data) {
  if (command === 'add') {
    if (/409/.test(errorStr) && data) {
      console.error('Could not insert component "' + data.componentId + '". The component already exists in the database.')
      process.exit(1)
    } else {
      console.error('Could not insert malformed component: \n ' + JSON.stringify(data, null, 2))
      process.exit(1)
    }
  }
  console.error('The command "' + command + '" failed with the following error:\n' + errorStr)
  process.exit(1)
}

export const searchNode = (server, query) => {
  return connect(server)
  .then((client) => client.components())
  .then((components) => components.filter((cmp) => cmp.indexOf(query) === 0))
}
