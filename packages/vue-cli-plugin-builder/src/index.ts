import R from 'ramda'
import * as path from 'path'
// import WebpackChain from 'webpack-chain/types'

// import {} from '@mand-mobile/platform-builder'


const commands = ['md-preview', 'md-install']

export = (api:any, projectOptions: any) => {

  R.forEach((command) => {
    const handler = require(path.resolve(__dirname, `commands/${command}`))
    api.registerCommand(command, handler(api))
  }, commands)
}