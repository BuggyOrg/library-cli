#!/usr/bin/env node

import yargs from 'yargs'

var libraryServer = (process.env.BUGGY_LIBRARY_HOST) ? process.env.BUGGY_LIBRARY_HOST : 'http://localhost:8080'

yargs
  .completion('completion')
  .version(() => {
    return require('../package.json').version
  })
  .global('quiet')
  .option('quiet', {alias: 'q', describe: 'Only print data no clutter.', default: false})
  .global('library')
  .option('library', {alias: 'l', describe: 'Set the library hosting server.', default: libraryServer})
  .commandDir('commands')
  .demand(1)
  .usage('Buggy library CLI [version ' + require('../package.json').version + ']')
  .epilogue('The Buggy library-cli uses the library server ' + libraryServer +
    '.\nYou can change the server by specifying the environment variable BUGGY_LIBRARY_HOST.')
  .help()
  .argv
