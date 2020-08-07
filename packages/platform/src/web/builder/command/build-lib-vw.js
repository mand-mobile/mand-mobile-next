const glob = require('glob')
const copy = require('recursive-copy')
const postcss = require('postcss')
const px2vw = require('postcss-pixel-to-viewport')
const fs = require('fs')
const path = require('path')
const {resultLog} = require('./utils')
let env = {}

function copyLib() {
  return new Promise((res, reject) => {
    fs.stat(env.outputDir, err => {
      if (err) {
        reject(err)
      }
      res()
    })
  }).then(() => {
    return copy(env.outputDir, env.outputVWDir)
  })
}

function compilePxToVw(filePath) {
  const cssContent = fs.readFileSync(filePath, {
    encoding: 'utf8',
  })

  postcss([
    px2vw({
      viewportUnit: 'vw',
      minPixelValue: 2,
    }),
  ])
    .process(cssContent)
    .then(result => {
      return fs.writeFileSync(filePath, result, {
        encoding: 'utf8',
      })
    })
    .catch(e => console.info(e))
}

function compilePxToVwAll() {
  const fileGlob = `${env.outputVWDir}/**/*.css`
  const cssFiles = glob.sync(fileGlob)
  return Promise.all(cssFiles.map(compilePxToVw)).catch(e => {
    console.info(e)
  })
}

module.exports = (webpackConfig, args, api) => {
  const {exeRootPath, pluginRootPath, vueCliService, MAND_PLATFORM, MAND_OUTPUT_DIR} = api.mdContext || {}
  env.exeRootPath = exeRootPath
  env.outputDir = path.resolve(exeRootPath, MAND_OUTPUT_DIR)
  env.outputVWDir = path.resolve(exeRootPath, MAND_OUTPUT_DIR, '../lib-vw')
  copyLib()
    .then(compilePxToVwAll)
    .then(() => {
      resultLog('success', 'Build **VM/VW** Complete!')
    })
    .catch(err => {
      console.info(err)
      resultLog('error', 'Build **VM/VW** Fail!')
    })
}
