const buildBundle = require('./build-bundle')
const buildLib = require('./build-lib')

module.exports = (args, api) => {
  const {MAND_BUILD_TARGET, webpackConfig} = api.mdContext

  if (MAND_BUILD_TARGET === 'bundle') {
    return buildBundle(webpackConfig, args._)
  } else if (MAND_BUILD_TARGET === 'lib') {
    // TODO 按 css, js, ts 抽取出响应的配置
    return buildLib(webpackConfig, args, api)
  }
}
