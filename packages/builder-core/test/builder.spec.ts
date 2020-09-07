import * as  path from 'path'
import { BuilderContainer } from "../src/index";
import { vueCliServiceBuilder } from "../src/vue-cli-service.builder";


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



it.only('should exec builder container in dist container', async () => {

  vueCliServiceBuilder.setConfig({outputRoot: path.resolve(__dirname, '__temp__/vue')})
  vueCliServiceBuilder.hooks.addTemplates.tap('builder-unit-testcases', templates => {
    templates.push([{
      template: path.resolve(__dirname, '__fixtures__/vue-template-project'),
      renderer: '.',
    }, {user: {name: 'lisi'}}])
  })

  await vueCliServiceBuilder.create()

  await vueCliServiceBuilder.build()

}, 10000)