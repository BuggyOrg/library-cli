
export function error (errorStr, command) {
  console.error('The command "' + command + '" failed with the following error:\n' + errorStr)
  process.exit(1)
}
