
export default function (yargs, convertToPortgraph, convertFromPortgraph) {
  return yargs
    .commandDir('.')
    .defaults('___toPortgraph___', {call: convertToPortgraph})
    .defaults('___fromPortgraph___', {call: convertFromPortgraph})
    .global(['___toPortgraph___', '___fromPortgraph___'])
}
