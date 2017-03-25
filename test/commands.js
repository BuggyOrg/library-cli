/* global describe, it */
import {serveJSON} from '@buggyorg/library-fileserver'
import {exec} from 'child_process'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import getPort from 'get-port'

const expect = chai.expect
chai.use(chaiAsPromised)

var testPort = 12458

const runCLI = (args, data) => {
  return new Promise((resolve, reject) => {
    var cli = exec('node lib/cli -q --library http://localhost:' + testPort + ' ' + args,
      (error, stdout, stderr) => {
        if (error) {
          reject(stderr)
        } else {
          resolve(stdout)
        }
      }
    )
    if (data) {
      if (typeof data !== 'string') {
        data = JSON.stringify(data)
      }
      cli.stdin.write(data)
    }
    cli.stdin.end()
  })
}

const initServer = (init) => getPort().then((port) => {
  testPort = port
  return serveJSON(testPort, init || {})
})

const noServer = () => {
  testPort = 1
  return Promise.resolve()
}

describe('CLI Commands', () => {
  describe('`add`', () => {
    it('Adds a new node', () =>
      expect(initServer()
      .then(() => runCLI('add',
        {componentId: 'a', atomic: true, version: '0.1.0', ports: [{port: 'a', kind: 'input', type: 'generic'}]})))
      .to.be.fulfilled
    )

    it('Returns with an error code when no server is running', () =>
      expect(noServer()
      .then(() => runCLI('add',
        {componentId: 'a', atomic: true, version: '0.1.0', ports: [{port: 'a', kind: 'input', type: 'generic'}]})))
        .to.be.rejectedWith(/Unable to connect/))
  })

  describe('`list`', () => {
    it('Works on a fresh database', () =>
      expect(initServer()
      .then(() => runCLI('list')))
      .to.be.fulfilled)

    it('Works with multiple elements', () =>
      expect(initServer({components: [
        {componentId: 'a', atomic: true, version: '0.1.0', ports: [{port: 'a', kind: 'input', type: 'generic'}]},
        {componentId: 'b', atomic: true, version: '0.1.0', ports: [{port: 'a', kind: 'input', type: 'generic'}]}]})
      .then(() => runCLI('list')))
      .to.be.fulfilled)

    it('Returns an error code when no server is running', () =>
      expect(noServer()
      .then(() => runCLI('list')))
      .to.be.rejectedWith(/Unable to connect/))
  })

  describe('`search`', () => {
    it('Finds a component by id', () =>
      expect(initServer({components: [
        {componentId: 'compID', atomic: true, version: '0.1.0', ports: [{port: 'a', kind: 'input', type: 'generic'}]}]})
      .then(() => runCLI('search com'))).to.eventually.match(/compID/))

    it('Returns an error code when no component matches the search string', () =>
      expect(initServer({components: [
        {componentId: 'compID', atomic: true, version: '0.1.0', ports: [{port: 'a', kind: 'input', type: 'generic'}]}]})
      .then(() => runCLI('search dull'))).to.be.rejected)

    it('Supports completion', () =>
      expect(initServer({components: [
        {componentId: 'autoCompID', atomic: true, version: '0.1.0', ports: [{port: 'a', kind: 'input', type: 'generic'}]}]})
      .then(() => runCLI('search au'))).to.eventually.match(/autoCompID/))
  })

  describe('`meta` (getting meta information)', () => {
    it('Gets a list of meta information for a node', () =>
      expect(initServer({
        components: [{componentId: 'compID', atomic: true, version: '0.1.0', ports: [{port: 'a', kind: 'input', type: 'generic'}]}]})
      .then(() => runCLI('add-meta compID metaKey1', 'value_for_1'))
      .then(() => runCLI('add-meta compID metaKey2', 'value_for_2'))
      .then(() => runCLI('meta compID'))).to.eventually.match(/metaKey1/).and.match(/metaKey2/))

    it('Gets the value of a meta key', () =>
      expect(initServer({
        components: [{componentId: 'compID', atomic: true, version: '0.1.0', ports: [{port: 'a', kind: 'input', type: 'generic'}]}]})
      .then(() => runCLI('add-meta compID metaKey1', 'value_for_1'))
      .then(() => runCLI('meta compID metaKey1'))).to.eventually.match(/value_for_1/))
  })

  describe('`show`', () => {
    it('Gets the contents of a component', () => {
      const comp = {componentId: 'compID', atomic: true, version: '0.1.0', ports: [{port: 'a', kind: 'input', type: 'generic'}]}
      return expect(initServer({components: [comp]})
        .then(() => runCLI('show compID').then((str) => JSON.parse(str)))).to.eventually.eql(comp)
    })
  })
})
