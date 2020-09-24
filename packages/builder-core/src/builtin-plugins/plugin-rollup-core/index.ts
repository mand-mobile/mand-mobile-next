import * as path from 'path'
import * as R from 'ramda'

import { BuilderContainer } from '../../index';
import { resolveComponents, resolveCategory, packagesResolver } from '../../helper'
import { rollupConfigBuilder } from './rollup-config-builder';

const rollup = require('rollup')

export class RollupBuilderPlugin {

  constructor(private readonly options: any = {}) { }

  public apply(container: BuilderContainer) {

    const components = resolveComponents({platform: 'web', componentSource: packagesResolver('@mand-mobile/components', 'src')})
    const category = resolveCategory(components)


    container.hooks.addTemplates.tap('vueCliBuilder', template => {
      template.push([{template: path.resolve(__dirname, '../templates/web-bundle/main.js'), renderer: 'main.js'}, {components}])
    })

    // 纯用于复制一份组件库文件到目标容器文件夹下
    container.hooks.addTemplates.tap('vueCliBuilder', template => {
      template.push([{template: packagesResolver('@mand-mobile/components', 'src'), renderer: '_mand-mobile'}, {}])
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

    // 添加源码到组件文件夹下
    container.hooks.addLinks.tap('vueCliBuilder', linkpaths => {
      linkpaths.push({
        source: packagesResolver('@mand-mobile/components', 'src'),
        target: 'mand-mobile'
      })
    })


    // 设置编译内容
    container.hooks.extendsStylus.tap('vueCliBuilder', options => {
      const result = [
        packagesResolver('@mand-mobile/shared', 'lib/style/mixin/theme.basic.styl'),
        packagesResolver('@mand-mobile/shared', 'lib/style/mixin/theme.components.styl'),
        packagesResolver('@mand-mobile/shared', 'lib/style/mixin/util.styl'),
      ]
      options.import = (options.import || [])
      options.import.push(...result)
    })

    container.hooks.extendsBabelConfig.tap('vueCliBuilder', babelConfig => {})

    container.hooks.extendsPostcssConfig.tap('vueCliBuilder', postcssConfig => {
      postcssConfig.plugins = [...(postcssConfig.plugins || []),
        require('postcss-url')({url: 'inline'}),
        require('cssnano')({
          preset: ['default', {
            zindex: false,
            mergeIdents: false,
            discardUnused: false,
            autoprefixer: false,
            reduceIdents: false,
          }]
        }),
        // require('postcss-pxtorem')({rootValue: 100, minPixelValue: 2}),
      ]
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


