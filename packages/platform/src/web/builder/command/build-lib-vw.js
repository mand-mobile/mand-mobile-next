const glob = require('glob')
const copy = require('recursive-copy')
const postcss = require('postcss')
const px2vw = require('postcss-pixel-to-viewport')
const fs = require('fs')
const path = require('path')
const {resultLog} = require('./utils')
let env = {}
let libDir = ''
let libDirVW = ''

function copyLib() {
  return new Promise((res, reject) => {
    fs.stat(libDir, err => {
      if (err) {
        reject(err)
      }
      res()
    })
  }).then(() => {
    return copy(libDir, libDirVW)
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
  const fileGlob = `${libDirVW}/**/*.css`
  const cssFiles = glob.sync(fileGlob)
  return Promise.all(cssFiles.map(compilePxToVw)).catch(e => {
    console.info(e)
  })
}

module.exports = (webpackConfig, args, api) => {
  const {exeRootPath, pluginRootPath, vueCliService, MAND_PLATFORM, MAND_INPUT_DIR} = api.mdContext || {}
  env.exeRootPath = exeRootPath
  libDir = path.resolve(env.exeRootPath, '../components/lib')
  libDirVW = path.resolve(env.exeRootPath, '../components/lib-vw')

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
