const path = require('path')


const utils = require('@vue/cli-shared-utils')


const exeRootPath = process.cwd()
const pluginRootPath = path.resolve(__dirname, '../../../')


const log = require("../../utils/log")
const R = require('ramda')
const constant = require('../../constant')



export = (api: any) => async (args: any) => {
  
  const config = api.resolveWebpackConfig()
  
  const platform =  args.platform
  const command = require(`@mand-mobile/platform/lib/${platform}/builder/command/build`)


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
    webpackConfig: config,
    MAND_BUILD_TARGET: args.target
  })
  api.mdUtils = Object.assign({}, args.mdUtils, utils)


  return command(args, api)
  // if (args.target === constant.BUILD_TARGET_BUNDLE  && args.platform === constant.PLATFORM_WEB) {
    
  //   // console.log(config)
  //   const run = R.compose(generate, translateToRollupConfig)
  //   await run({webpackConfig: config, entry: args._})
  //   log.info('h5 bundle was called')
  // }


  // if (args.target === constant.BUILD_TARGET_LIB && args.platform === constant.PLATFORM_WEB) {
  //   log.info('h5 lib was called')
  //   // getComponets()

  //   compileVueSFC()
  // }
}