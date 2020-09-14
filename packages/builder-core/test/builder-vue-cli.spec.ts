import * as  path from 'path'
import { BuilderContainer } from "../src/index";
import { VueCliBuilderPlugins } from "../src/builder-plugin-vue-cli";


/**
 * 基于EJS语法编译字符串
 */
it('should create a builder container and create workingspace', async () => {

  const builder = new BuilderContainer({outputRoot: path.resolve(__dirname, '__temp__')})

  builder.hooks.addTemplates.tap('builder-unit-testcases', templates => {
    templates.push([{
      template: path.resolve(__dirname, '__fixtures__/render-template'),
      renderer: 'render-working-directory',
    }, {user: {name: 'lisi'}}])
  })

  await builder.create()
  
})

it('should create a builder container and create soft link directories', async () => {

  const builder = new BuilderContainer({outputRoot: path.resolve(__dirname, '__temp__')})

  builder.hooks.addLinks.tap('builder-unit-testcases', links => {
    links.push({
      source: path.resolve(__dirname, '__fixtures__/render-template'),
      target: 'softlinkdir'
    })
  })

  await builder.create()
  
})





it('should exec builder container in dist container', async () => {
  const builder = new BuilderContainer({outputRoot: path.resolve(__dirname, '__temp__/vue'), plugins: [
    [VueCliBuilderPlugins, {}],
  ]})

  /**
   * 调通流程，拆解到业务逻辑内
   */
  builder.hooks.addTemplates.tap('builder-unit-testcases', templates => {
    templates.push([{
      template: path.resolve(__dirname, '__fixtures__/vue-template-project'),
      renderer: '.',
    }, {user: {name: 'lisi'}}])
  })

  await builder.create()
  await builder.build()

}, 10000)


it.only('should exec builder container in dist container', async () => {
  const builder = new BuilderContainer({outputRoot: path.resolve(__dirname, '__temp__/web-preview'), plugins: [
    [VueCliBuilderPlugins, {}],
  ]})


  await builder.create()
  // await builder.build()

}, 10000)


it('should serve builder container', async () => {
  const builder = new BuilderContainer({outputRoot: path.resolve(__dirname, '__temp__/vue'), plugins: [
    [VueCliBuilderPlugins, {}],
  ]})

  /**
   * 调通流程，拆解到业务逻辑内
   */
  builder.hooks.addTemplates.tap('builder-unit-testcases', templates => {
    templates.push([{
      template: path.resolve(__dirname, '__fixtures__/vue-template-project'),
      renderer: '.',
    }, {user: {name: 'lisi'}}])
  })
  await builder.create()
  await builder.serve()
}, 100000)