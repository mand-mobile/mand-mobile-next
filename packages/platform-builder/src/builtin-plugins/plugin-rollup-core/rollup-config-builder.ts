import R from 'ramda'
import path from 'path'

// 加载rollup plugin
const {nodeResolve: rplgNodeResolve} = require('@rollup/plugin-node-resolve')
const rplgAlias = require('@rollup/plugin-alias')
const rplgVue = require('rollup-plugin-vue')
const rplgStylus = require('./rollup-plugin-stylus-compiler')
const rplgPostcss = require('rollup-plugin-postcss')
const {getBabelOutputPlugin: rplgBabel} = require('@rollup/plugin-babel')
const rplgFilesize = require('rollup-plugin-filesize')
const FORMAT_ES_MODULE = 'esm'
const FORMAT_UMD_MODULE = 'umd'

/**
 * 基于vue-cli所生成的webpack配置，转换为rollup需要的配置
 * @param webpackConfig 
 */
export const rollupConfigBuilder = ({builderContext, entry, artifactRoot = 'dist'}) => {
  // const context = webpackConfig.context

  const {babelConfig, stylusConfig, postcssConfig} = builderContext

  let extensions =  ['.vue', '.js' , '.json', '.ts']

  extensions = ['.vue', '.js' , '.json', '.ts'].map(item => `.web${item}`).concat(extensions)

  const customResolver = rplgNodeResolve({
    extensions,
  })

  const inputOptions = {
    /**
     * @todo 替换 基于约定默认取main.js作为入口
     */
    input: entry,
    external: ['vue'],
    plugins: [
      rplgAlias({
        entries: [{find: /^@mand-mobile\/platform\/lib\/(.*)/, replacement: '@mand-mobile/platform/lib/web/$1'}],
        customResolver,
      }),
      rplgNodeResolve({extensions}),
      rplgStylus({
        stylusConfig,
      }),
      rplgVue({
        preprocessStyles: false,
      }),
      // @todo 排查是否是因为jest环境导致不能正常提取css的问题
      rplgPostcss({
        ...postcssConfig,
        // extract: path.resolve(artifactRoot, 'mand-mobile.css'),
      }),
      // rplgUglify(),
      rplgFilesize(),
    ],
  }

  const outputOptions = R.map(
    moduleType => ({
      file: path.resolve(artifactRoot, `mand-mobile.${moduleType}.js`),
      plugins: rplgBabel({
        ...babelConfig,
        // 生产环境，移除不必要的注释
        comments: false,
        // 保留rollup构建后原本的格式
        allowAllFormats: true,
      }),
      format: moduleType,
      name: 'mand-mobile',
    }),
    [FORMAT_ES_MODULE, FORMAT_UMD_MODULE],
  )

  return {inputOptions, outputOptions}
}