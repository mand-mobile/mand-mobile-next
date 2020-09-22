import * as path from 'path'
import * as R from 'ramda'

import { BuilderContainer } from '../index';
import { resolveComponents, resolveCategory, chainExtendsHandler, packagesResolver } from '../helper'

const Service = require('@vue/cli-service')

export class VueSFCBuilderPlugin {

  constructor(private readonly options: any = {}) { }

  public apply(container: BuilderContainer) {

    const components = resolveComponents({platform: 'web', componentSource: packagesResolver('@mand-mobile/components', 'src')})
    const category = resolveCategory(components)

    

    // 指定vue-cli 需要的package.json目录，防止被其余插件影响
    container.hooks.addTemplates.tap('vueCliBuilder', template => {
      template.push([{template: path.resolve(__dirname, 'templates/web-preview/common/package.json'), renderer: 'package.json'}])
    })

    // 为容器启动添加 node_modules依赖 
    // @Fixme 替换相对路径
    container.hooks.addLinks.tap('vueCliBuilder', linkpaths => {
      linkpaths.push({
        source: path.resolve(__dirname, '../../node_modules'),
        target: 'node_modules',
      })
    })

    // 添加源码到组件文件夹下
    container.hooks.addLinks.tap('vueCliBuilder', linkpaths => {
      linkpaths.push({
        source: packagesResolver('@mand-mobile/components', 'src'),
        target: 'mand-mobile'
      })
    })
  }

  public async build(builderContext, container: BuilderContainer): Promise<void> {
    const { babelConfig, postcssConfig, stylusConfig } = builderContext


  }


  public async serve(builderContext, container) {}
}


