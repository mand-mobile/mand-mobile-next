const buildBundle = require('./build-bundle')
const buildLib = require('./build-lib')
const buildLibVW = require('./build-lib-vw')

module.exports = (args, api) => {
  const {MAND_BUILD_TARGET, webpackConfig, MAND_OUTPUT_DIR, MAND_INPUT_DIR, exeRootPath} = api.mdContext

  if (MAND_BUILD_TARGET === 'bundle') {
    return buildBundle(webpackConfig, args._, {
      MAND_INPUT_DIR,
      MAND_OUTPUT_DIR,
      exeRootPath,
    })
  } else if (MAND_BUILD_TARGET === 'lib') {
    // TODO 按 css, js, ts 抽取出相应的配置
    return buildLib(webpackConfig, args, api)
  } else if (MAND_BUILD_TARGET === 'lib-vw') {
    return buildLib(webpackConfig, args, api)
  }
}
