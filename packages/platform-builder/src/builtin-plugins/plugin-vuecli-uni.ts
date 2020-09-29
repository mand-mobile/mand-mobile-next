import { BuilderContainer } from '../index';
import * as path from 'path'
import * as R from 'ramda'
import { chainExtendsHandler } from '../helper'
import { PlatformSetupPlugin } from '.';

const Service = require('@vue/cli-service')


export class VueCliBuilderUniPlugin {

  public static NS = 'vue-cli-builder-plugin-uni'
  constructor(private readonly options: any = {}) { }

  public apply(container: BuilderContainer) {

    // 创建模板容器
    // 构建模板,单组件模式
    if (this.options.single) {
      container.hooks.addTemplates.tap(VueCliBuilderUniPlugin.NS, templates => {
        const category = container.context[PlatformSetupPlugin.NS].category
        templates.push([{
          template: path.resolve(__dirname, 'templates/uni-preview/preview-single'),
          renderer: '.',
        }, { category: category }])
      })

      container.hooks.addTemplates.tap(VueCliBuilderUniPlugin.NS, templates => {
        const components: any[] = container.context[PlatformSetupPlugin.NS].components
        const component = R.find((item) => item.name === this.options.componentName, components)
        templates.push([{
          template: path.resolve(__dirname, 'templates/uni-preview/common/demo-group.vue'),
          renderer: `pages/index.vue`
        }, { component }])
      })
      // 构建模板，多组件模式  
    } else {
      // 渲染容器
      container.hooks.addTemplates.tap(VueCliBuilderUniPlugin.NS, templates => {
        const components: any[] = container.context[PlatformSetupPlugin.NS].components
        const category = container.context[PlatformSetupPlugin.NS].category
        templates.push([{
          template: path.resolve(__dirname, 'templates/uni-preview/preview-batch'),
          renderer: '.',
        }, { components, category }])
      })

      // 渲染组件demo入口
      container.hooks.addTemplates.tap('vueCliBuilder', templates => {
        const components: any[] = container.context[PlatformSetupPlugin.NS].components
        R.forEach(component => {
          templates.push([{
            template: path.resolve(__dirname, 'templates/uni-preview/common/demo-group.vue'),
            renderer: `pages/${component.name}.vue`
          }, { component }])
        }, components)
      })
    }

    // 指定vue-cli 需要的package.json目录，防止被其余插件影响
    container.hooks.addTemplates.tap('vueCliBuilder', template => {
      template.push([{ template: path.resolve(__dirname, 'templates/uni-preview/common/package.json'), renderer: 'package.json' }])
    })


    // @fixme 排查为啥必须设置一个空的postcss.config.js的问题
    // @todo 排查问题
    container.hooks.addTemplates.tap('vueCliBuilder', template => {
      template.push([{ template: path.resolve(__dirname, 'templates/uni-preview/common/postcss.config.js'), renderer: 'postcss.config.js' }])
    })

    // 为容器启动添加 node_modules依赖 
    // @Fixme 替换相对路径
    container.hooks.addLinks.tap('vueCliBuilder', linkpaths => {
      linkpaths.push({
        source: path.resolve(__dirname, '../../node_modules'),
        target: 'node_modules',
      })
    })

    container.hooks.extendsPostcssConfig.tap('vueCliBuilder', postcssConfig => {
      postcssConfig.plugins = [...(postcssConfig.plugins || []),
      require('postcss-pxtorem')({ rootValue: 100, minPixelValue: 2 }),
      ]
    })
  }



  public async build(builderContext, container: BuilderContainer): Promise<void> {
    const { babelConfig, postcssConfig, stylusConfig, aliasMapper } = builderContext

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

        aliasMapper.forEach(([from, to]) => {
          chain.resolve.alias.set(from, to).end()
        })

        // chain.resolve.alias
        //                 .set('@mand-mobile/platform-runtime/lib', path.join(container.config.outputRoot, '_platform/uni'))
        //                 .set('mand-mobile/lib', path.join(container.config.outputRoot, 'mand-mobile'))
        //                 .end()

        // 扩展.uni.[ext]后缀，并提升优先级
        const extFiletypes = Array.from(chain.resolve.extensions.store)
        extFiletypes.forEach(ext => chain.resolve.extensions.prepend(`.uni${ext}`))

      })

    service.init()
    return service.run('build', {}, []).catch(err => { console.error(err, 'error occured') })
  }


  public async serve(builderContext, container: BuilderContainer) {
    const { babelConfig, postcssConfig, stylusConfig, aliasMapper } = builderContext

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

        aliasMapper.forEach(([from, to]) => {
          chain.resolve.alias.set(from, to).end()
        })

        chain.resolve.alias
          .set('@mand-mobile/platform-runtime/lib', path.join(container.config.outputRoot, '_platform/uni'))
          .set('mand-mobile/lib', path.join(container.config.outputRoot, 'mand-mobile'))
          .end()

        // 扩展.uni.[ext]后缀，并提升优先级
        const extFiletypes = Array.from(chain.resolve.extensions.store)
        extFiletypes.forEach(ext => chain.resolve.extensions.prepend(`.uni${ext}`))

      })

    service.init()
    return service.run('build', { watch: true }, []).catch(err => { console.error(err, 'error occured') })
  }
}


