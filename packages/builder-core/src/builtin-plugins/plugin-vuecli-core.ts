import * as path from 'path'
import * as R from 'ramda'

import { BuilderContainer } from '../index';
import { resolveComponents, resolveCategory, chainExtendsHandler, packagesResolver } from '../helper'

const Service = require('@vue/cli-service')

const resolver = (moduleName, suffix) => path.join(path.dirname(require.resolve(moduleName)), suffix)

export class VueCliBuilderPlugins {

  constructor(private readonly options: any = {}) { }

  public apply(container: BuilderContainer) {

    const components = resolveComponents({platform: 'web', componentSource: resolver('@mand-mobile/components', 'src')})
    const category = resolveCategory(components)

    // 创建模板容器
    // 构建模板,单组件模式
    if (this.options.single) {
      const component = R.find((item) => item.name === this.options.componentName, components)

      if (!component) {
        throw new Error(`[vueCliBuilder] cannot find target component in single component mode`)
      }
      container.hooks.addTemplates.tap('vueCliBuilder', templates => {
        templates.push([{
          template: path.resolve(__dirname, 'templates/web-preview/preview-single'),
          renderer: '.',
        }, {category: category}])
      })

      container.hooks.addTemplates.tap('vueCliBuilder', templates => {
        templates.push([{
          template: path.resolve(__dirname, 'templates/web-preview/common/demo-group.vue'),
          renderer: `pages/demo-group.vue`
        }, {component}])
      })


    // 构建模板，多组件模式  
    } else {
      // 渲染容器
      container.hooks.addTemplates.tap('vueCliBuilder', templates => {
        templates.push([{
          template: path.resolve(__dirname, 'templates/web-preview/preview-batch'),
          renderer: '.',
        }, {components, category}])
      })

      // 渲染组件demo入口
      R.forEach(component =>  {
        container.hooks.addTemplates.tap('vueCliBuilder', templates => {
          templates.push([{
            template: path.resolve(__dirname, 'templates/web-preview/common/demo-group.vue'),
            renderer: `pages/${component.name}.vue`
          }, {component}])
        })
      }, components)
    }

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
        require('postcss-pxtorem')({rootValue: 100, minPixelValue: 2}),
      ]
    })
  }

  public async build(builderContext, container): Promise<void> {
    const { babelConfig, postcssConfig, stylusConfig } = builderContext

    const service = new Service(container.config.outputRoot)

      //@todo set mode process.env.VUE_CLI_MODE
    service.init()
    
    service.webpackChainFns
      .push(chainExtendsHandler({ babelConfig, postcssConfig, stylusConfig }))

    service.webpackChainFns
      .push(chain => {
        
        chain.entry('app').clear().add('./main.js').end()

        chain.resolve.symlinks(false)

        chain.resolve.alias.set('mand-mobile/lib', path.join(container.config.outputRoot, 'mand-mobile')).end()

        // 扩展.web.[ext]后缀，并提升优先级
        const extFiletypes = Array.from(chain.resolve.extensions.store)
        extFiletypes.forEach(ext => chain.resolve.extensions.prepend(`.web${ext}`))

      })

    return service.run('build', {}, []).catch(err => { console.error(err, 'error occured') })
  }


  public async serve(builderContext, container) {
    const { babelConfig, postcssConfig, stylusConfig } = builderContext

    const service = new Service(container.config.outputRoot)
      //@todo set mode process.env.VUE_CLI_MODE
    service.init()
    service.webpackChainFns
      .push(chainExtendsHandler({ babelConfig, postcssConfig, stylusConfig }))
    service.webpackChainFns
      .push(chain => {
        chain.entry('app').clear().add('./main.js').end()

        chain.resolve.symlinks(false)
      
        chain.resolve.alias.set('mand-mobile/lib', path.join(container.config.outputRoot, 'mand-mobile')).end()

        // 扩展.web.[ext]后缀，并提升优先级
        const extFiletypes = Array.from(chain.resolve.extensions.store)
        extFiletypes.forEach(ext => chain.resolve.extensions.prepend(`.web${ext}`))

      })

    return service.run('serve', {}, []).catch(err => { console.error(err, 'error occured') })
  }
}


