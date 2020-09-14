import { BuilderContainer } from './index';
import * as path from 'path'
import * as tapable from 'tapable'
import * as R from 'ramda'
import { resolveComponents, resolveCategory, chainExtendsHandler } from './helper'
const Service = require('@vue/cli-service')

const resolver = (moduleName, suffix) => path.join(path.dirname(require.resolve(moduleName)), suffix)

export class VueCliBuilderPlugins {

  constructor(private readonly options: any = {}) { }

  public apply(container: BuilderContainer) {

    const components = resolveComponents({platform: 'web', componentSource: resolver('@mand-mobile/components', 'src')})
    const category = resolveCategory(components)

    // 构建模板,单组件模式
    if (this.options.single) {
      container.hooks.addTemplates.tap('vueCliBuilder', templates => {
        templates.push([{
          template: path.resolve(__dirname, 'templates/web-preview/preview-single'),
          renderer: '.',
        }, {category: category}])
      })

    // 构建模板，多组件模式  
    } else {
      container.hooks.addTemplates.tap('vueCliBuilder', templates => {
        templates.push([{
          template: path.resolve(__dirname, 'templates/web-preview/preview-batch'),
          renderer: '.',
        }, {components, category}])
      })
      container.hooks.addLinks.tap('vueCliBuilder', linkpaths => {}) 
    }

    // 设置编译内容
    container.hooks.extendsStylus.tap('vueCliBuilder', options => {
      const result = [
        resolver('@mand-mobile/shared', 'lib/style/mixin/theme.basic.styl'),
        resolver('@mand-mobile/shared', 'lib/style/mixin/theme.components.styl'),
        resolver('@mand-mobile/shared', 'lib/style/mixin/util.styl'),
      ]
      options.import = (options.import || [])
      options.import.push(...result)
    })

    container.hooks.extendsBabelConfig.tap('vueCliBuilder', babelConfig => {})
    container.hooks.extendsPostcssConfig.tap('vueCliBuilder', postcssConfig => {
      postcssConfig.plugins = [...postcssConfig.plugins,
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
        require('postcss-pxtorem')({rootValue: 100, minPixelValue: 2}),
      ]
    })
  }

  public async build(builderContext, container): Promise<void> {
    const { babelConfig, postcssConfig, stylusConfig } = builderContext

    const service = new Service(container.config.outputRoot)

      //@todo set mode process.env.VUE_CLI_MODE
    service.init()
    
    service.webpackChainFns.push(chainExtendsHandler({ babelConfig, postcssConfig, stylusConfig }))

    return service.run('build', {}, []).catch(err => { console.error(err, 'error occured') })
  }


  public async serve(builderContext, container) {
    const { babelConfig, postcssConfig, stylusConfig } = builderContext

    const service = new Service(container.config.outputRoot)
      //@todo set mode process.env.VUE_CLI_MODE
    service.init()
    service.webpackChainFns.push(chainExtendsHandler({ babelConfig, postcssConfig, stylusConfig }))
    return service.run('serve', {}, []).catch(err => { console.error(err, 'error occured') })
  }
}


