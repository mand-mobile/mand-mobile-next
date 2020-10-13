import { VueSFCBuilderPlugin } from './../src/builtin-plugins/plugin-sfc-core';
import * as  path from 'path'
import { BuilderContainer } from "../src/index";


it('should build sfc lib', async () => {

  const outputRoot = path.resolve(__dirname, '__temp__/src-compiler')
  const artifactRoot = path.resolve(outputRoot, 'dist')
  const builder = new BuilderContainer({outputRoot, artifactRoot, plugins: [
    [VueSFCBuilderPlugin, {
      platform: 'web',
    }],
  ]})
  await builder.create()
  await builder.build()
  // await new Promise((resolve, reject) => {
  //   setTimeout(resolve,  1000000)
  // })
}, 100000)