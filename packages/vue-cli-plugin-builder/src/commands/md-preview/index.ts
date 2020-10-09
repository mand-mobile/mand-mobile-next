import * as path from 'path'
import * as assert from 'assert'
import { BuilderContainer } from '@mand-mobile/platform-builder/lib'
import { PlatformSetupPlugin, VueCliBuilderUniPlugin, VueCliBuilderPlugin, ThemeSetupPlugin, ComponentsSourceSetupPlugin } from '@mand-mobile/platform-builder/lib/builtin-plugins'

export = (api: any) => async (args: any) => {

  // const config = api.resolveWebpackConfig()

  const plugins = []
  
  
  let themeOptions: any = {}
  if (!args.theme) {
    themeOptions.theme = args.theme
  }
  plugins.push([ThemeSetupPlugin, themeOptions])
  
  plugins.push([ComponentsSourceSetupPlugin, {
    namedAs: 'mand-mobile'
  }])
  
  if (args.platform) {
    plugins.push([PlatformSetupPlugin, {platform: args.platform, removePlatformExt: ['lib', 'sfc'].includes(args.target)}])
    if (args.platform === 'uni') {
      assert.strictEqual(typeof args.output === 'string', true, 'output must be a dist path')
      plugins.push([VueCliBuilderUniPlugin, {}])
    }

    if (args.platform === 'web') {
      args.output = args.output || ''
      plugins.push([VueCliBuilderPlugin, {}])
    }
  }
  const c = new BuilderContainer({
    outputRoot: path.resolve(process.cwd(), `__temp__/${+(new Date)}`),
    artifactRoot: path.resolve(process.cwd(), args.output),
    plugins,
  })
  await c.create()
  await c.serve()
  // return c.destory()
  
}