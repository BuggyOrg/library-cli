
// import client from '@buggyorg/library-client'

export const command = 'list'
export const desc = 'List all components'
export const handler = (argv) => {
  console.log('Listing all components')
  console.log(argv.server)
}
