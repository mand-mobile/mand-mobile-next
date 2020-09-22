import * as  path from 'path'
import { BuilderContainer } from "../src/index";
import { RollupBuilderPlugin } from "../src/builtin-plugins/plugin-rollup-core";


it('should build rollup bundle', async () => {
  const builder = new BuilderContainer({outputRoot: path.resolve(__dirname, '__temp__/web-rollup-bundle'), plugins: [
    [RollupBuilderPlugin, {}],
  ]})
  await builder.create()
  await builder.build()
  await new Promise((resolve, reject) => {
    setTimeout(resolve,  1000000)
  })
}, 1000000)