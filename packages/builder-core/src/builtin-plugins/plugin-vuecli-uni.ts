import { BuilderContainer } from '../index';
import * as path from 'path'
import * as R from 'ramda'
import { resolveComponents, resolveCategory, chainExtendsHandler, packagesResolver } from '../helper'

const Service = require('@vue/cli-service')



export class VueCliBuilderUniPlugin {

  constructor(private readonly options: any = {}) { }

  public apply(container: BuilderContainer) {

    const components = resolveComponents({platform: 'uni', componentSource: packagesResolver('@mand-mobile/components', 'src')})
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
          template: path.resolve(__dirname, 'templates/uni-preview/preview-single'),
          renderer: '.',
        }, {category: category}])
      })

      container.hooks.addTemplates.tap('vueCliBuilder', templates => {
        templates.push([{
          template: path.resolve(__dirname, 'templates/uni-preview/common/demo-group.vue'),
          renderer: `pages/index.vue`
        }, {component}])
      })


    // 构建模板，多组件模式  
    } else {
      // 渲染容器
      container.hooks.addTemplates.tap('vueCliBuilder', templates => {
        templates.push([{
          template: path.resolve(__dirname, 'templates/uni-preview/preview-batch'),
          renderer: '.',
        }, {components, category}])
      })

      // 渲染组件demo入口
      R.forEach(component =>  {
        container.hooks.addTemplates.tap('vueCliBuilder', templates => {
          templates.push([{
            template: path.resolve(__dirname, 'templates/uni-preview/common/demo-group.vue'),
            renderer: `pages/${component.name}.vue`
          }, {component}])
        })
      }, components)
    }

    // 指定vue-cli 需要的package.json目录，防止被其余插件影响
    container.hooks.addTemplates.tap('vueCliBuilder', template => {
      template.push([{template: path.resolve(__dirname, 'templates/uni-preview/common/package.json'), renderer: 'package.json'}])
    })


    // @fixme 排查为啥必须设置一个空的postcss.config.js的问题
    // @todo 排查问题
    container.hooks.addTemplates.tap('vueCliBuilder', template => {
      template.push([{template: path.resolve(__dirname, 'templates/uni-preview/common/postcss.config.js'), renderer: 'postcss.config.js'}])
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

    container.hooks.addLinks.tap('vueCliBuilder', linkpaths => {
      linkpaths.push({
        source: packagesResolver('@mand-mobile/platform', 'lib'),
        target: '_platform',
      })
    })


    // 设置编译内容
    container.hooks.extendsStylus.tap('vueCliBuilder', options => {
      const result = [
        packagesResolver('@mand-mobile/shared', 'lib/style/mixin/theme.basic.styl'),
        packagesResolver('@mand-mobile/shared', 'lib/style/mixin/theme.components.styl'),
        packagesResolver('@mand-mobile/shared', 'lib/style/mixin/util.styl'),
      ]
      options.imports = (options.imports || [])
      options.imports.push(...result)
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

  

  public async build(builderContext, container: BuilderContainer): Promise<void> {
    const { babelConfig, postcssConfig, stylusConfig } = builderContext
    
    process.env = R.mergeRight(process.env, {
      UNI_INPUT_DIR: container.config.outputRoot,
      UNI_PLATFORM: 'mp-weixin',
      UNI_OUTPUT_DIR: container.config.artifactRoot || path.resolve(container.config.outputRoot, 'dist/dev/mp-weixin'),
    })

    

    const service = new Service(container.config.outputRoot)

    // @todo set mode process.env.VUE_CLI_MODE
    // @fixme 支持hooks设置环境变量
  
    // require('@dcloudio/vue-cli-plugin-uni/lib/env')
    const g = <any>global

    // @dcloudo/vue-cli-plugin-uni 并不会读取其他插件设置的chainWebpack，需要使用他自身设置webpackChain的api global.uniPlugins.chainWebpack
    g.uniPlugin.chainWebpack.push(chainExtendsHandler({ babelConfig, postcssConfig, stylusConfig }))
    g.uniPlugin.chainWebpack
      .push(chain => {
        
        chain.entry('app').clear().add('./main.js').end()

        chain.resolve.symlinks(false)

        chain.resolve.alias
                        .set('@mand-mobile/platform/lib', path.join(container.config.outputRoot, '_platform/uni'))
                        .set('mand-mobile/lib', path.join(container.config.outputRoot, 'mand-mobile'))
                        .end()

        // 扩展.uni.[ext]后缀，并提升优先级
        const extFiletypes = Array.from(chain.resolve.extensions.store)
        extFiletypes.forEach(ext => chain.resolve.extensions.prepend(`.uni${ext}`))

      })

    service.init()
    return service.run('build', {}, []).catch(err => { console.error(err, 'error occured') })
  }


  public async serve(builderContext, container: BuilderContainer) {
    const { babelConfig, postcssConfig, stylusConfig } = builderContext

    process.env = R.mergeRight(process.env, {
      UNI_INPUT_DIR: container.config.outputRoot,
      UNI_PLATFORM: 'mp-weixin',
      UNI_OUTPUT_DIR: container.config.artifactRoot || path.resolve(container.config.outputRoot, 'dist/dev/mp-weixin'),
    })


    const service = new Service(container.config.outputRoot)

    const g = <any>global
    //@todo set mode process.env.VUE_CLI_MODE
    //@fixme 支持hooks方式设置环境变量
    // @dcloudo/vue-cli-plugin-uni 并不会读取其他插件设置的chainWebpack，需要使用他自身设置webpackChain的api global.uniPlugins.chainWebpack
    g.uniPlugin.chainWebpack.push(chainExtendsHandler({ babelConfig, postcssConfig, stylusConfig }))
    g.uniPlugin.chainWebpack
      .push(chain => {
        
        chain.entry('app').clear().add('./main.js').end()

        chain.resolve.symlinks(false)

        chain.resolve.alias
                        .set('@mand-mobile/platform/lib', path.join(container.config.outputRoot, '_platform/uni'))
                        .set('mand-mobile/lib', path.join(container.config.outputRoot, 'mand-mobile'))
                        .end()

        // 扩展.uni.[ext]后缀，并提升优先级
        const extFiletypes = Array.from(chain.resolve.extensions.store)
        extFiletypes.forEach(ext => chain.resolve.extensions.prepend(`.uni${ext}`))

      })
    
    service.init()
    return service.run('build', {watch: true}, []).catch(err => { console.error(err, 'error occured') })
  }
}


