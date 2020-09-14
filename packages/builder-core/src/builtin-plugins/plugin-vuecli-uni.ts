import { BuilderContainer } from './index';
import * as path from 'path'
import * as tapable from 'tapable'
import * as R from 'ramda'
import {chainExtendsHandler} from './helper'

const Service = require('@vue/cli-service')


export class VueCliBuilderUniPlugins {

  constructor(private readonly options: any) { }

  public apply(container: BuilderContainer) {

    container.hooks.extendsStylus.tap('vueCliBuilderUni', options => {
      const resolver = (suffix) => path.join(path.dirname(require.resolve('@mand-mobile/shared')), suffix)
      const result = [
        resolver('lib/style/mixin/theme.basic.styl'),
        resolver('lib/style/mixin/theme.components.styl'),
        resolver('lib/style/mixin/util.styl'),
      ]
      options.import = (options.import || [])
      options.import.push(...result)
    })

    container.hooks.extendsBabelConfig.tap('vueCliBuilderUni', babelConfig => {})
    container.hooks.extendsPostcssConfig.tap('vueCliBuilderUni', postcssConfig => {
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

  public async serve(builderContext, container) {
    const { babelConfig, postcssConfig, stylusConfig } = builderContext

    const service = new Service(container.config.outputRoot)
      //@todo set mode process.env.VUE_CLI_MODE
    service.init()
    service.webpackChainFns.push(chainExtendsHandler({ babelConfig, postcssConfig, stylusConfig }))

    process.env = {...process.env, 
      NODE_ENV: 'development',
      UNI_PLATFORM: 'mp-weixin',
      // UNI_OUTPUT_DIR: path.resolve(exeRootPath, MAND_OUTPUT_DIR),
      UNI_INPUT_DIR: container.config.outputRoot,
      VUE_CLI_SERVICE_CONFIG_PATH: path.resolve(container.config.outputRoot, 'vue.config.js'),
      VUE_CLI_CONTEXT: __dirname,
    }
    return service.run('uni-build', {
      watch: true,
    }, []).catch(err => { console.error(err, 'error occured') })
  }
}


