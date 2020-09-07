import { BuilderContainer } from './index';
import * as path from 'path'

export const vueCliServiceBuilder = new BuilderContainer()

// vueCliServiceBuilder.setConfig({
  
// })

vueCliServiceBuilder.hooks.extendsStylus.tap('vueCliBuilder', options => {
    
    const resolver = (suffix) => path.join(path.dirname(require.resolve('@mand-mobile/shared')), suffix)

    const result = [
      resolver('lib/style/mixin/theme.basic.styl'),
      resolver('lib/style/mixin/theme.components.styl'),
      resolver('lib/style/mixin/util.styl'),
    ]
    options.import = (options.import || [])
    options.import.push(...result)
})

vueCliServiceBuilder.hooks.extendsBabelConfig.tap('vueCliBuilder', babelConfig => {
  console.info(babelConfig)
})


vueCliServiceBuilder.hooks.extendsPostcssConfig.tap('vueCliBuilder', postcssConfig => {
  console.info(postcssConfig)
})


vueCliServiceBuilder.hooks.chainWebpack.tap('vueCliBuilder', (chain) => {
  
  // chain.plugin('html').tap(args => {
  //   args[0].template = '.mand-mobile/public/index.html'
  //   return args
  // })


})





