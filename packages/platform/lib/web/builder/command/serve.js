
const path = require('path')

module.exports = (args, api) => {
  
  const {exeRootPath, pluginRootPath, vueCliService, MAND_PLATFORM, MAND_INPUT_DIR} = (api.mdContext || {})
  const platformRootPath = path.resolve(__dirname, '../../../../')

  const {execa, info, error} = api.mdUtils

  const NODE_PATH = `${path.resolve(exeRootPath, './node_modules')}:${path.resolve(platformRootPath, './node_modules')}::${path.resolve(pluginRootPath, './node_modules')}`

  execa('ln', ['-s', `${exeRootPath}/node_modules/@mand-mobile/components`, `${exeRootPath}/${MAND_INPUT_DIR}/_mand-mobile`])
  const runner = execa(vueCliService, ['serve', path.resolve(exeRootPath, `${MAND_INPUT_DIR}/main.js`)], {
    stdio: 'inherit',
    env: { 
      FORCE_COLOR: true,

      /**
       * 将所有构建时所需要的依赖都收敛到`vue-cli-plugin-mdbuilder`,
       * 所以当在mand-mobile主包下执行构建命令找不到相关依赖时，需要从vue-cli-plugin-md-builder/node_modules 这里加载依赖
       */
      VUE_CLI_SERVICE_CONFIG_PATH: path.resolve(exeRootPath, MAND_INPUT_DIR, 'vue.config.js'),

      // @fixme 调整目录结构
      // VUE_CLI_CONTEXT: __dirname,
      NODE_PATH,
      MAND_PLATFORM,
    },
  })
  runner.on('error', (e) => error(e.msg))
  runner.on('exit', () => info('it should clear glue code at this point'))
}