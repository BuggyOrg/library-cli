
import {input} from 'cli-ext'
import * as Graph from '@buggyorg/graphtools'
import {allPass, compose} from 'lodash/fp'
import {connect} from '@buggyorg/library-client'
import {error} from '../utils'

const Component = Graph.Component

const isJSON = (str) => {
  try {
    JSON.parse(str)
    return true
  } catch (err) {
    return false
  }
}

const defaultComponent = {
  componentId: '<id>',
  version: '<0.0.0>',
  atomic: true,
  ports: [{port: '<name>', kind: '<input|output>', type: '<generic>'}]
}

export const command = 'add'
export const desc = 'Add a new component.'
export const handler = (argv) => {
  var jsonVerify = allPass([isJSON, compose(Component.isValid, JSON.parse)])
  var conv = JSON.parse
  if (argv.___toPortgraph___) {
    conv = argv.___toPortgraph___.call
    jsonVerify = compose(Component.isValid, conv)
  }
  return Promise.resolve(connect(argv.library))
  .then((client) => input(null, {verify: jsonVerify,
    defaultContent: JSON.stringify(defaultComponent, null, 2)})
    .then(conv)
    .then((component) => client.addComponent(component).then(() => component)))
    .then((component) => console.log('Successfully added component "' + component.componentId + '". [' + argv.library + ']'))
  .catch((err) => error(err, command))
}
