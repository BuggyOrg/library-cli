
import {input} from 'cli-ext'
import * as Graph from '@buggyorg/graphtools'
import {allPass, compose} from 'lodash/fp'
import {connect} from '@buggyorg/library-client'
import {error, log} from '../utils'

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
  var dataVerify = allPass([isJSON, compose(Component.isValid, JSON.parse)])
  var conv = JSON.parse
  var cmp = null
  if (argv.___toPortgraph___) {
    conv = argv.___toPortgraph___.call
    dataVerify = (data) => conv(data).then(Component.isValid)
  }
  return Promise.resolve(connect(argv.library))
  .then((client) => input(null, {verify: dataVerify,
    defaultContent: JSON.stringify(defaultComponent, null, 2)})
    .then(conv)
    .then((component) => (cmp = component))
    .then((component) => client.addComponent(component).then(() => component))
    .then((component) => log(argv, 'Successfully added component "' + component.componentId + '". [' + argv.library + ']')))
  .catch((err) => error(err, command, cmp))
}
