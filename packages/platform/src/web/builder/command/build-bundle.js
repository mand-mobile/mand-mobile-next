const path = require('path')
// const cliExeRoot = process.cwd()
// const pluginPkgRoot = path.resolve(__dirname, '../../../')

const rollup = require('rollup')
const R = require('ramda')
// const fs = require('fs')

// 加载rollup plugin
const {nodeResolve: rplgNodeResolve} = require('@rollup/plugin-node-resolve')
const rplgAlias = require('@rollup/plugin-alias')
const rplgVue = require('rollup-plugin-vue')
const rplgStylus = require('./rollup-plugin-stylus-compiler')
const rplgPostcss = require('rollup-plugin-postcss')
const {getBabelOutputPlugin: rplgBabel} = require('@rollup/plugin-babel')
const rplgFilesize = require('rollup-plugin-filesize')
const mixins = require('./stylus-mixin')
const FORMAT_ES_MODULE = 'esm'
const FORMAT_UMD_MODULE = 'umd'

/**
 * 基于vue-cli所生成的webpack配置，转换为rollup需要的配置
 * @param webpackConfig 
 */
const translateToRollupConfig = ({webpackConfig, entry, context}) => {
  // const context = webpackConfig.context

  let {MAND_OUTPUT_DIR, MAND_INPUT_DIR, exeRootPath} = context
  let {resolve: {extensions}} = webpackConfig

  /**
   * @todo 1 - 从驱动器中获取platform变量
   * @todo 2 - build-bundle需要在所有的vue-cli-plugin注册之后执行，并获取到全局的webpack配置后再读取相关的webpack配置
   *  
   */
  extensions = extensions.map(item => `.web${item}`).concat(extensions)

  const customResolver = rplgNodeResolve({
    extensions,
  })

  console.info(path.resolve(exeRootPath, MAND_INPUT_DIR, 'postcss.config.js'))
  const inputOptions = {
    /**
     * @todo 替换
     */
    input: entry,
    external: ['vue'],
    plugins: [
      rplgAlias({
        // resolve: extensions,
        entries: [{find: /^@mand-mobile\/platform\/lib\/(.*)/, replacement: '@mand-mobile/platform/lib/web/$1'}],
        customResolver,
      }),
      rplgNodeResolve({extensions}),

      rplgStylus({
        use: [mixins],
      }),
      rplgVue({
        preprocessStyles: false,
      }),
      rplgPostcss({
        config: {
          path: path.resolve(exeRootPath, MAND_INPUT_DIR, 'postcss.config.js'),
        },
        extract: path.resolve(MAND_OUTPUT_DIR, 'mand-mobile.css'),
      }),

      // rplgUglify(),
      rplgFilesize(),
    ],
  }

  const outputOptions = R.map(
    moduleType => ({
      file: path.resolve(MAND_OUTPUT_DIR, `mand-mobile.${moduleType}.js`),
      plugins: rplgBabel({
        // 生产环境，移除不必要的注释
        comments: false,
        // 保留rollup构建后原本的格式
        allowAllFormats: true,
        presets: [
          // 'minify',
          [
            '@babel/env',
            {
              targets: 'iOS >= 8, Android > 4.0',
            },
          ],
        ],
      }),
      format: moduleType,
      name: 'mand-mobile',
    }),
    [FORMAT_ES_MODULE, FORMAT_UMD_MODULE],
  )

  return {inputOptions, outputOptions}
}

const generate = async ({inputOptions, outputOptions}) => {
  const bundle = await rollup.rollup(inputOptions)
  if (outputOptions instanceof Array) {
    await Promise.all(R.map(option => bundle.write(option), outputOptions))
  } else {
    await bundle.write(outputOptions)
  }
}

module.exports = (webpackConfig, entry, context) => {
  const run = R.compose(generate, translateToRollupConfig)
  return run({webpackConfig, entry, context})
}
