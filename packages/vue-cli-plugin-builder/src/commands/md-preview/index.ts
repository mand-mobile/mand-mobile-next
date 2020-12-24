import * as path from 'path'
import * as assert from 'assert'
import { BuilderContainer } from '@mand-mobile/platform-builder'
import { PlatformSetupPlugin, VueCliBuilderUniPlugin, VueCliBuilderPlugin, ThemeSetupPlugin, ComponentsSourceSetupPlugin } from '@mand-mobile/platform-builder/lib/builtin-plugins'
import * as R from 'ramda'
export = (api: any) => async (args: any) => {

  // const config = api.resolveWebpackConfig()

  const plugins = []
  
  
  let themeOptions: any = {}
  if (!args.theme) {
    themeOptions.theme = args.theme
  }
  plugins.push([ThemeSetupPlugin, themeOptions])
  
  plugins.push([ComponentsSourceSetupPlugin, {
    namedAs: 'mand-mobile',
    watched: args.watch,
  }])
  
  if (args.platform) {
    plugins.push([PlatformSetupPlugin, {
      platform: args.platform, 
      removePlatformExt: ['lib', 'sfc'].includes(args.target),
      watched: args.watch,
    }])
    if (args.platform === 'uni') {
      assert.strictEqual(typeof args.output === 'string', true, 'output must be a dist path')
      plugins.push([VueCliBuilderUniPlugin, {
        single: args.single,
        watched: args.watch,
        componentName: args['component-name'],
      }])
    }

    if (args.platform === 'web') {
      args.output = args.output || ''
      plugins.push([VueCliBuilderPlugin, {
        single: args.single,
        watched: args.watch,
        componentName: args['component-name'],
      }])
    }
  }
  const c = new BuilderContainer({
    // 暂时使用一个唯一的时间戳用于创建临时文件，防并发使用随机数前缀生成文件格式为 ${timestamp}-${platform}-${random-number}
    outputRoot: path.resolve(process.cwd(), `__temp__/${+(new Date())}-${args.platform}-${R.compose((item) => item.toString(), Math.floor, (num) => num * 100, Math.random)()}`),
    artifactRoot: path.resolve(process.cwd(), args.output),
    plugins,
  })
  await c.create()
  await c.serve()

  process.on('exit', async () => {
    // 进程退出前自动清理构建产物
    return c.destory()
  })
  
}