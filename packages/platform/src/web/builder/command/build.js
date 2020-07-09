const path = require('path')
const cliExeRoot = process.cwd()
const pluginPkgRoot = path.resolve(__dirname, '../../../')

const rollup = require('rollup')
const R = require('ramda')
const fs = require('fs')


// 加载rollup plugin
const rplgNodeResolve = require('rollup-plugin-node-resolve')
const rplgVue = require('rollup-plugin-vue')
const rplgStylus = require('rollup-plugin-stylus-compiler')
const rplgPostcss = require('rollup-plugin-postcss')
const {getBabelOutputPlugin: rplgBabel} = require('@rollup/plugin-babel')
const rplgFilesize = require('rollup-plugin-filesize')

const FORMAT_ES_MODULE ='esm'
const FORMAT_UMD_MODULE ='umd'

/**
 * 基于vue-cli所生成的webpack配置，转换为rollup需要的配置
 * @param webpackConfig 
 */
const translateToRollupConfig = ({
  webpackConfig,
  entry,
}) => {
  
  // const context = webpackConfig.context

  const {
    resolve: {
      extensions,
    }
  } = webpackConfig

  const inputOptions = {
    /**
     * @todo 替换
     */
    input: entry,

    plugins: [
      rplgNodeResolve({extensions}),
      rplgVue({
        preprocessStyles: true
      }),
      rplgStylus(),
      rplgPostcss({
        config: false,
        extract: path.join(webpackConfig.output.path, `mand-mobile.css`)
      }),


      // rplgUglify(),
      rplgFilesize(),
    ]
  }

  const outputOptions = R.map((moduleType) => ({
    file: path.join(webpackConfig.output.path, `mand-mobile.${moduleType}.js`),
    plugins: rplgBabel({
      //生产环境，移除不必要的注释
      comments: false,
      // 保留rollup构建后原本的格式
      allowAllFormats: true,
      presets: [
        // 'minify', 
        ['@babel/env', {
        targets: "iOS >= 8, Android > 4.0",
      }]]
    }),
    format: moduleType,
    name: 'mand-mobile'
  }), [FORMAT_ES_MODULE, FORMAT_UMD_MODULE])

  return ({inputOptions, outputOptions})
}


const generate = async ({inputOptions, outputOptions}) => {
  const bundle = await rollup.rollup(inputOptions)
  if (outputOptions instanceof Array) {
    await Promise.all(R.map((option) => bundle.write(option), outputOptions))
  } else {
    await bundle.write(outputOptions)
  }
}



module.exports = (args, api) => {
  
  const {MAND_BUILD_TARGET, webpackConfig} = api.mdContext

  if (MAND_BUILD_TARGET ===  'bundle') {
    const run = R.compose(generate, translateToRollupConfig)
    return run({webpackConfig, entry: args._})
  }
}