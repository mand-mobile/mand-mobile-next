import { VueifySFCBuilderPlugin } from './../src/builtin-plugins/plugin-vueify-core';
import * as  path from 'path'
import { BuilderContainer } from "../src/index";



it('should build sfc lib', async () => {

  const outputRoot = path.resolve(__dirname, '__temp__/vueify-compile')
  const artifactRoot = path.resolve(outputRoot, 'dist')
  const builder = new BuilderContainer({outputRoot, artifactRoot, plugins: [
    [VueifySFCBuilderPlugin, {
      platform: 'web',
    }],
  ]})
  await builder.create()
  await builder.build()
  await new Promise((resolve, reject) => {
    setTimeout(resolve,  18000)
  })
}, 40000)