
import {input} from 'cli-ext'
import * as Graph from '@buggyorg/graphtools'
import {allPass, compose} from 'lodash/fp'

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
  return input(null, {verify: allPass([isJSON, compose(Component.isValid, JSON.parse)]),
    defaultContent: JSON.stringify(defaultComponent, null, 2)})
  .catch((err) => console.error(err))
}
