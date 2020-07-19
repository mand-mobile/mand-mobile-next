const path = require('path')
const Service = require('@vue/cli-service/lib/Service')

const setUpEnv = env => {
  Object.keys(env).forEach(key => (process.env[key] = env[key]))
}

module.exports = (args, api) => {
  const {
    exeRootPath,
    pluginRootPath,
    vueCliService,
    MAND_PLATFORM,
    MAND_INPUT_DIR = '.mand-mobile',
    MAND_OUTPUT_DIR = 'dist/mp-weixin/development',
  } =
    api.mdContext || {}

  const platformRootPath = path.resolve(__dirname, '../../../../')

  const {execa, info, error} = api.mdUtils

  const NODE_PATH = `${path.resolve(exeRootPath, './node_modules')}:${path.resolve(
    platformRootPath,
    './node_modules',
  )}:${path.resolve(pluginRootPath, './node_modules')}`

  // 创建platform/node_modules软链接到src/node_modules下用于绕过uni对于包依赖加载路径的限制
  execa('ln', ['-s', `${platformRootPath}/node_modules`, `${exeRootPath}/${MAND_INPUT_DIR}/node_modules`])
  execa('ln', [
    '-s',
    `${exeRootPath}/node_modules/@mand-mobile/components`,
    `${exeRootPath}/${MAND_INPUT_DIR}/_mand-mobile`,
  ])

  const runner = execa(vueCliService, ['uni-build', '--watch'], {
    stdio: 'inherit',
    env: {
      FORCE_COLOR: true,
      // 运行npx vue-cli-service uni-serve 时需要指定以下两个环境变量
      NODE_ENV: 'development',
      UNI_PLATFORM: 'mp-weixin',
      MAND_PLATFORM,
      UNI_OUTPUT_DIR: path.resolve(exeRootPath, MAND_OUTPUT_DIR),
      UNI_INPUT_DIR: path.resolve(exeRootPath, MAND_INPUT_DIR),
      VUE_CLI_SERVICE_CONFIG_PATH: path.resolve(exeRootPath, 'vue.config.js'),
      VUE_CLI_CONTEXT: __dirname,
      NODE_PATH,
    },
  })
}
