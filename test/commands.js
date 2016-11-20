/* global describe, it */
import {serveJSON} from '@buggyorg/library-fileserver'
import {exec} from 'child_process'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

const expect = chai.expect
chai.use(chaiAsPromised)

const testPort = 12458

const runCLI = (args, data) => {
  return new Promise((resolve, reject) => {
    var cli = exec('node lib/cli -server localhost:' + testPort + ' ' + args,
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

const initServer = (init) => Promise.resolve(serveJSON(testPort, init))

describe('CLI Commands', () => {
  describe('`add`', () => {
    it('Adds a new node', () =>
      expect(initServer()
      .then(() => runCLI('add',
        {componentId: 'a', atomic: true, version: '0.1.0', ports: [{port: 'a', kind: 'input', type: 'generic'}]})))
      .to.be.fulfilled
    )
  })
})
