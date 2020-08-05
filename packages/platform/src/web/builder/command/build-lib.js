const glob = require('glob')
const bluebird = require('bluebird')
const babel = bluebird.promisifyAll(require('babel-core'))
const fs = bluebird.promisifyAll(require('fs'))
const path = require('path')
const copy = require('recursive-copy')
const compiler = require('zp-vueify').compiler
const findPostcssConfig = require('postcss-load-config')
const postcss = require('postcss')
const stylus = require('stylus')
const { resultLog } = require('./utils')



let env = {}


function move(inputDir, destDir) {
  return new Promise((resolve, reject) => {
    copy(inputDir, destDir, {
    // copy(inputDir+'/button', destDir + '/button', {
      overwrite: true,
      filter: function(item) {
        if (/demo|test/.test(item)) {
          return false
        }
        if (/^index.js$/.test(item)) {
          return false
        }
        return true
      }}, function (err, result) {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
  })
}

function compileAndReplaceAllJsFile(dir) {
  const fileGlob = `${dir}/**/*.js`
  const jsFiles = glob.sync(fileGlob)
  return Promise.all(jsFiles.map((compileJsAndReplace)))
    .catch(e => {
      throw e
    })
}

function compileJsAndReplace(filePath){
  babel.transformFileAsync(filePath, {
     babelrc: false,
     presets: [
       ['@babel/env', {
         'modules': 'umd',
         'targets': {
           'browsers': ['iOS >= 8', 'Android >= 4']
         }
       }]
     ]
  })
   .then(({code}) => {
     return fs.writeFileAsync(filePath, code)
   })
   .catch(error => {
     throw error
   })
}

function compileAndReplaceAllVueFile(dir) {
  const fileGlob = `${dir}/**/*.vue`
  const jsFiles = glob.sync(fileGlob)
  return Promise.all(jsFiles.map(compileVueAndReplace))
  .catch(e => {
    throw e
  })
}

function compileVueAndReplace(filePath) {
  const styleDir = path.join(path.dirname(filePath), 'style')
  if (!fs.existsSync(styleDir)) {
    fs.mkdirSync(styleDir)
  }
  const fileBaseName = path.basename(filePath, '.vue')
  const cssFilePath = path.join(styleDir, `${fileBaseName}.css`)
  const jsFilePath = filePath.replace(/\.vue$/, '.js')
  const fileContent = fs.readFileSync(filePath, {
    encoding: 'utf8',
  })
  const config = computedCompilerConfig(filePath)
  console.log(JSON.stringify(config));
  compiler.applyConfig(config)
  let styleContent = ''
  const styleCb = res => {
    if (res.style) {
      styleContent = res.style
    }
  }
  compiler.on('style', styleCb)
  return new Promise((resolve, reject) => {
    compiler.compile(fileContent, filePath, (err, result) => {
      if (err) {
        reject(err)
      }
      compiler.removeListener('style', styleCb)
      fs.writeFileAsync(jsFilePath, result)
      .then(() => fs.writeFileAsync(cssFilePath, styleContent))
      .then(() => {
        fs.unlinkAsync(filePath)
        resolve()
      })
    })
  })
}

function computedCompilerConfig(filePath) {
  return {
    extractCSS: true,
    babel: {
      presets: [
        ['@babel/env', 
          {
            'modules': 'umd',
            'targets': {
              'browsers': ['iOS >= 8', 'Android >= 4']
            }
          }
        ],
      ],
      plugins: [
        [babelPluginInsertCssImportForVue, {
          filePath,
        }]
      ]
    },
    customCompilers: {
      stylus: compileVueStylus
    }
  }
}

function babelPluginInsertCssImportForVue ({ types: t }) {
  function computedSameDirCssPosition(filePath) {
    const filePathParse = path.parse(filePath)
    return `./style/${filePathParse.name}.css`
  }
  const globalCssLiteral = '../../shared/style/global.css'
  return {
    visitor: {
      Program(path, state) {
        const importLiteral = computedSameDirCssPosition(state.opts.filePath)
        path.unshiftContainer('body', t.ImportDeclaration([],t.StringLiteral(importLiteral)))
        path.unshiftContainer('body', t.ImportDeclaration([],t.StringLiteral(globalCssLiteral)))
      }
    }
  }
}
function compileVueStylus (content, cb, compiler, filePath) {
  const libDir = path.resolve(env.exeRootPath, '../components/lib')
  stylus(content)
    .set('filename', filePath)
    .define('url', stylus.url())
    .import(path.join(libDir, 'shared/style/mixin/util.styl'))
    .import(path.join(libDir, 'shared/style/mixin/theme.components.styl'))
    .import(path.join(libDir, 'shared/style/mixin/theme.basic.styl'))
    // .import(path.join(libDir, '../../node_modules/nib/lib/nib/vendor'))
    // .import(path.join(libDir, '../../node_modules/nib/lib/nib/gradients'))
    .render(async (err, css) => {
      if (err) {
        throw err
      }
      const {plugins} = await findPostcssConfig({
        env: process.env.NODE_ENV
      })

      postcss(plugins)
        .process(css, {
          from: undefined
        })
        .then(result => {
          cb(null, result.css)
        })
    })
}

function compileGlobalStylus() {
  const libDir = path.resolve(env.exeRootPath, '../components/lib')
  const filePath = path.resolve(libDir, 'shared/style/global.styl')
  const targetPath = path.resolve(libDir, 'shared/style/global.css')
  const fileContent = fs.readFileSync(filePath, {
    encoding: 'utf8',
  })
  return compileVueStylus(fileContent, (err, cssContent) => {
    fs.writeFileAsync(targetPath, cssContent)
  })

}

module.exports = (webpackConfig, args, api) => {
  const {exeRootPath, pluginRootPath, vueCliService, MAND_PLATFORM, MAND_INPUT_DIR} = api.mdContext || {}
  const componentsDir = path.resolve(exeRootPath, '../components/src')
  const sharedDir = path.resolve(exeRootPath, '../shared/lib')
  const libDir = path.resolve(exeRootPath, '../components/lib')
  env.exeRootPath = exeRootPath

  return move(componentsDir, path.resolve(libDir, 'components'))
    .then(() => move(sharedDir, path.resolve(libDir, 'shared')))
    .then(() => Promise.all([compileAndReplaceAllJsFile(libDir),compileAndReplaceAllVueFile(libDir),compileGlobalStylus()]))
    .then(() => {
      resultLog('success', 'Build **Components** Complete!')
    })
    .catch(e => {
      // eslint-disable-next-line no-console
      console.error(e)
      resultLog('error', 'Build **Components** Fail!')
    })
  
}
