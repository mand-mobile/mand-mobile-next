import { RollupBuilderPlugin } from './../src/builtin-plugins/plugin-rollup-core';
import * as  path from 'path'
import { BuilderContainer } from "../src/index";


it('should build rollup bundle', async () => {

  const outputRoot = path.resolve(__dirname, '__temp__/web-rollup-bundle')
  const artifactRoot = path.resolve(outputRoot, 'dist')
  const builder = new BuilderContainer({outputRoot, artifactRoot, plugins: [
    [RollupBuilderPlugin, {}],
  ]})
  await builder.create()
  await builder.build()
  // await new Promise((resolve, reject) => {
  //   setTimeout(resolve,  1000000)
  // })
}, 100000)