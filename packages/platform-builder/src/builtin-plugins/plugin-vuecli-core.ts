import * as path from 'path'
import * as R from 'ramda'

import { BuilderContainer } from '../index';
import { resolveComponents, resolveCategory, chainExtendsHandler, packagesResolver } from '../helper'
import { PlatformSetupPlugin } from '.';
import babelPluginImport from 'babel-plugin-import'

const Service = require('@vue/cli-service')

export class VueCliBuilderPlugin {
  public static NS = 'vue-cli-builder-plugin'
  constructor(private readonly options: any = {}) { }

  public apply(container: BuilderContainer) {

    console.info(`[${VueCliBuilderPlugin.NS}] was applyed`)
    // 创建模板容器
    // 构建模板,单组件模式
    if (this.options.single) {
      container.hooks.addTemplates.tap(VueCliBuilderPlugin.NS, templates => {
        const category = container.context[PlatformSetupPlugin.NS].category
        templates.push([{
          template: path.resolve(__dirname, 'templates/web-preview/preview-single'),
          renderer: '.',
        }, { category: category }])
      })

      container.hooks.addTemplates.tap(VueCliBuilderPlugin.NS, templates => {
        const components: any[] = container.context[PlatformSetupPlugin.NS].components
        const component = R.find((item) => item.name === this.options.componentName, components)
        templates.push([{
          template: path.resolve(__dirname, 'templates/web-preview/common/demo-group.vue'),
          renderer: `pages/demo-group.vue`
        }, { component }])
      })


      // 构建模板，多组件模式  
    } else {
      // 渲染容器
      container.hooks.addTemplates.tap(VueCliBuilderPlugin.NS, templates => {
        const components: any[] = container.context[PlatformSetupPlugin.NS].components
        const category = container.context[PlatformSetupPlugin.NS].category
        templates.push([{
          template: path.resolve(__dirname, 'templates/web-preview/preview-batch'),
          renderer: '.',
        }, { components, category }])
      })

      // 渲染组件demo入口
      container.hooks.addTemplates.tap(VueCliBuilderPlugin.NS, templates => {
        const components: any[] = container.context[PlatformSetupPlugin.NS].components
        R.forEach(component => {
          templates.push([{
            template: path.resolve(__dirname, 'templates/web-preview/common/demo-group.vue'),
            renderer: `pages/${component.name}.vue`
          }, { component }])
        }, components)
      })
    }

    // 指定vue-cli 需要的package.json目录，防止被其余插件影响
    container.hooks.addTemplates.tap(VueCliBuilderPlugin.NS, template => {
      template.push([{ template: path.resolve(__dirname, 'templates/web-preview/common/package.json'), renderer: 'package.json' }])
    })

    // 为容器启动添加 node_modules依赖 
    // @Fixme 替换相对路径
    container.hooks.addLinks.tap(VueCliBuilderPlugin.NS, linkpaths => {
      linkpaths.push({
        source: path.resolve(__dirname, '../../node_modules'),
        target: 'node_modules',
      })
    })

    container.hooks.extendsPostcssConfig.tap(VueCliBuilderPlugin.NS, postcssConfig => {
      postcssConfig.plugins = [...(postcssConfig.plugins || []),
      require('postcss-pxtorem')({ rootValue: 100, minPixelValue: 2 }),
      ]
    })

    // 为demo中的mand-mobile单独配置解析规则
    container.hooks.extendsBabelConfig.tap(VueCliBuilderPlugin.NS, babelConfig => {
      // fixme 这里应该被抽象为一个新的插件，用于对demo文件进行特殊处理，以及对于demo配置特殊的解析规则etc...
      // @todo 重构需求，针对demo进行特殊的提取和配置
      babelConfig.plugins.unshift([babelPluginImport, {
        "libraryName": "mand-mobile",
        "style": false,   // or 'css'
        "libraryDirectory": "."
      }])
    })
  }

  public async build(builderContext, container: BuilderContainer): Promise<void> {
    const { babelConfig, postcssConfig, stylusConfig, aliasMapper } = builderContext

    const service = new Service(container.config.outputRoot)

    //@todo set mode process.env.VUE_CLI_MODE
    service.init()


    service.webpackChainFns
      .push(chainExtendsHandler({ babelConfig, postcssConfig, stylusConfig }))

    service.webpackChainFns
      .push(chain => {

        chain.entry('app').clear().add('./main.js').end()

        chain.resolve.symlinks(false)

        aliasMapper.forEach(([from, to]) => {
          chain.resolve.alias.set(from, to).end()
        })
        // chain.resolve.alias.set('mand-mobile/lib', path.join(container.config.outputRoot, 'mand-mobile')).end()

        // 扩展.web.[ext]后缀，并提升优先级
        const extFiletypes = Array.from(chain.resolve.extensions.store)
        extFiletypes.forEach(ext => chain.resolve.extensions.prepend(`.web${ext}`))

      })

    return service.run('build', {}, []).catch(err => { console.error(err, 'error occured') })
  }


  public async serve(builderContext, container) {
    const { babelConfig, postcssConfig, stylusConfig, aliasMapper } = builderContext

    const service = new Service(container.config.outputRoot)
    //@todo set mode process.env.VUE_CLI_MODE

    service.init()
    service.webpackChainFns
      .push(chainExtendsHandler({ babelConfig, postcssConfig, stylusConfig }))
    service.webpackChainFns
      .push(chain => {
        chain.entry('app').clear().add('./main.js').end()

        chain.resolve.symlinks(false)

        console.info(aliasMapper, 'aliasMapper')

        aliasMapper.forEach(([from, to]) => {
          chain.resolve.alias.set(from, to).end()
        })

        // 扩展.web.[ext]后缀，并提升优先级
        const extFiletypes = Array.from(chain.resolve.extensions.store)
        extFiletypes.forEach(ext => chain.resolve.extensions.prepend(`.web${ext}`))

      })

    return service.run('serve', {}, []).catch(err => { console.error(err, 'error occured') })
  }
}


