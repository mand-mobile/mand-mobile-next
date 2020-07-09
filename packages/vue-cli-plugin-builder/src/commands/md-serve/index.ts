import * as log from "../../utils/log"
import * as constant from '../../constant'
import * as path from 'path'
// const {execa} = require('@vue/cli-shared-utils')
const utils = require('@vue/cli-shared-utils')

const exeRootPath = process.cwd()
const pluginRootPath = path.resolve(__dirname, '../../../')
export = (api: any) => (args: any) => {

  const platform =  args.platform
  const command = require(`@mand-mobile/platform/lib/${platform}/builder/command/serve`)
  const vueCliService = require.resolve('@vue/cli-service/bin/vue-cli-service', {
    // 从当前执行环境下解析vueCli
    paths: [
      exeRootPath,
    ]
  })

  api.mdContext = Object.assign({}, args.mdContext, {
    vueCliService,
    exeRootPath,
    pluginRootPath,
    MAND_PLATFORM: platform,
    MAND_INPUT_DIR: process.env.MAND_INPUT_DIR || '.mand-mobile',
    MAND_OUTPUT_DIR: process.env.MAND_OUTPUT_DIR || 'dist'
  })
  api.mdUtils = Object.assign({}, args.mdUtils, utils)
  
  log.info(`bootstrap vue serve succeed ${vueCliService}, args=${JSON.stringify(args)}`)
  
  return command(args, api)
}