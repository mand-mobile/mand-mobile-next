import { VueCliBuilderUniPlugins } from './../src/builtin-plugins/plugin-vuecli-uni';
import * as  path from 'path'
import { BuilderContainer } from "../src/index"
// import { VueCliBuilderPlugins } from "../src/builtin-plugins/plugin-vuecli-core"



it('should exec build command in muti-component mode', async () => {
  const builder = new BuilderContainer({outputRoot: path.resolve(__dirname, '__temp__/uni-preview'), plugins: [
    // [VueCliBuilderPlugins, {}],
    [VueCliBuilderUniPlugins, {}]
  ]})

  await builder.create()
  await builder.build()

}, 100000)


it('should exec build command in single mode', async () => {
  const builder = new BuilderContainer({outputRoot: path.resolve(__dirname, '__temp__/uni-preview-single'), plugins: [
    // [VueCliBuilderPlugins, {single: true, componentName: 'button'}],
    [VueCliBuilderUniPlugins, {single: true, componentName: 'button'}],
  ]})

  await builder.create()
  await new Promise((resolve, reject) => {
    builder.build()
    setTimeout(resolve,  100000)
  })
}, 200000)


// 验证serve命令是否调通，业务代码验证可用
it.only('should exec serve command in single mode', async () => {

  const builder = new BuilderContainer({outputRoot: path.resolve(__dirname, '__temp__/uni-preview-single-serve'), plugins: [
    // [VueCliBuilderPlugins, {single: true, componentName: 'button'}],
    [VueCliBuilderUniPlugins, {single: true, componentName: 'button'}]
  ]})

  await builder.create()
  await new Promise((resolve, reject) => {
    builder.serve()
    setTimeout(resolve,  1000000)
  })
}, 2000000)