import * as path from 'path'
import * as R from 'ramda'
import { BuilderContainer } from '../../index';
import { rollupConfigBuilder } from './rollup-config-builder';
import { PlatformSetupPlugin } from '..';

const rollup = require('rollup')

export class RollupBuilderPlugin {

  constructor(private readonly options: any = {}) { }

  public apply(container: BuilderContainer) {

    container.hooks.addTemplates.tap('vueCliBuilder', template => {
      const components: any[] = container.context[PlatformSetupPlugin.NS].components
      template.push([{template: path.resolve(__dirname, '../templates/web-bundle/main.js'), renderer: 'main.js'}, {components}])
    })

    // 指定vue-cli 需要的package.json目录，防止被其余插件影响
    container.hooks.addTemplates.tap('vueCliBuilder', template => {
      template.push([{template: path.resolve(__dirname, '../templates/web-preview/common/package.json'), renderer: 'package.json'}])
    })

    // 为容器启动添加 node_modules依赖 
    // @Fixme 替换相对路径
    container.hooks.addLinks.tap('vueCliBuilder', linkpaths => {
      linkpaths.push({
        source: path.resolve(__dirname, '../../../node_modules'),
        target: 'node_modules',
      })
    })
  }

  public async build(builderContext, container: BuilderContainer): Promise<void> {

    const {inputOptions, outputOptions} = rollupConfigBuilder({
      builderContext, 
      entry: path.resolve(container.config.outputRoot, 'main.js'), 
      artifactRoot: container.config.artifactRoot
    })
    
    const bundle = await rollup.rollup(inputOptions)
    await Promise.all(R.map(option => bundle.write(option), outputOptions))
    return 
  }


  public async serve(builderContext, container) {
    //@TODO
  }
}


