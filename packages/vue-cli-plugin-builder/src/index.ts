
/**
 * 找不到@vue/cli的相关类型 暂时any-script过渡一下
 */
import R from 'ramda'
import * as path from 'path'
// import WebpackChain from 'webpack-chain/types'


const commands = ['md-build', 'md-serve']


function addStyleResource (rule: any) {
  const mandMobileSharedRoot = path.dirname(require.resolve('@mand-mobile/shared'))
  /**
   * @todo add nib style-resources
   */
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.join(mandMobileSharedRoot, 'lib/style/mixin/theme.basic.styl'),
        path.join(mandMobileSharedRoot, 'lib/style/mixin/theme.components.styl'),
        path.join(mandMobileSharedRoot, 'lib/style/mixin/util.styl'),
      ],
    })
}

function addPostcssConfig(rule: any) {
  rule
    .use('postcss-loader')
    .loader('postcss-loader')
    .tap((options: any) => {
      options.plugins = options.plugins || []
      options.plugins.push(require('postcss-url')({url: 'inline'}))
      options.plugins.push(require('postcss-pxtorem')({rootValue: 100, minPixelValue: 2, propWhiteList: []}))
      options.plugins.push(require('cssnano')({
        preset: ['default', {
          zindex: false,
          mergeIdents: false,
          discardUnused: false,
          autoprefixer: false,
          reduceIdents: false,
        }]
      }))
      return options
    })
}

export = (api:any, projectOptions: any) => {
  api.chainWebpack((chainConfig: any) => {
    // 通过 webpack-chain 修改 webpack 配置
    // console.info('chainwebpackConfig', webpackConfig)
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    R.forEach(type => addStyleResource(chainConfig.module.rule('stylus').oneOf(type)), types)
    R.forEach(type => addPostcssConfig(chainConfig.module.rule('postcss').oneOf(type)), types)
  })

  api.configureWebpack((webpackConfig:any) => {
    // console.info('webpackConfig', webpackConfig)
  })

  R.forEach((command) => {
    const handler = require(path.resolve(__dirname, `commands/${command}`))
    api.registerCommand(command, handler(api))
  }, commands)
  
}