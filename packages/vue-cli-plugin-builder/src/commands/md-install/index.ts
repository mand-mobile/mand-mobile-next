import * as path from 'path'
import * as assert from 'assert'
import { BuilderContainer } from '@mand-mobile/platform-builder/lib'
import { PlatformSetupPlugin, RollupBuilderPlugin, ThemeSetupPlugin, VueifySFCBuilderPlugin, VueSFCBuilderPlugin, ComponentsSourceSetupPlugin } from '@mand-mobile/platform-builder/lib/builtin-plugins'

const validTargets = new Set(['lib', 'sfc', 'bundle'])
export = (api: any) => async (args: any) => {
  const targetTable =  {
    'lib': (options: any = {}) => [VueifySFCBuilderPlugin, options],
    'sfc': (options: any = {}) => [VueSFCBuilderPlugin, options],
    'bundle': (options: any = {}) => [RollupBuilderPlugin, options],
  }
  // const config = api.resolveWebpackConfig()
  const plugins = []
  assert.strictEqual(typeof args.output === 'string', true, 'output must be a dist path')
  if (args.platform) {
    plugins.push([PlatformSetupPlugin, {platform: args.platform, removePlatformExt: ['lib', 'sfc'].includes(args.target)}])
  }

  if (args.transformCss === true) {
    assert.strictEqual((['lib', 'sfc'].includes(args.target)), true, 'transformCss options must set in sfc mode')
  }
  if (args.target) {
    assert.strictEqual(validTargets.has(args.target), true, 'build target must in [lib, sfc, bundle]')
    plugins.push(targetTable[args.target]({transformCss: args.transformCss}))
  }
  
  let themeOptions: any = {}
  if (!args.theme) {
    themeOptions.theme = args.theme
  }
  plugins.push([ThemeSetupPlugin, themeOptions])
  
  plugins.push([ComponentsSourceSetupPlugin, {
    namedAs: 'mand-mobile'
  }])

  const c = new BuilderContainer({
    outputRoot: path.resolve(process.cwd(), '__temp__'),
    artifactRoot: path.resolve(process.cwd(), args.output),
    plugins,
  })
  await c.create()
  await c.build()
  return c.destory()

}