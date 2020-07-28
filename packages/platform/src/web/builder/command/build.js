const buildBundle = require('./build-bundle')
const buildLib = require('./build-lib')

module.exports = (args, api) => {
  const {MAND_BUILD_TARGET, webpackConfig} = api.mdContext
  console.log(api)
  if (MAND_BUILD_TARGET === 'bundle') {
    return buildBundle(webpackConfig, args._)
  } else if (MAND_BUILD_TARGET === 'lib') {
    return buildLib(webpackConfig, args)
  }
}
