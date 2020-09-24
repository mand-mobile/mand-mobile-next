import * as assert from 'assert'
import * as path from 'path'
import fs from 'fs-extra'
import R from 'ramda'
import { BuilderContainer } from '../index'
import { packagesResolver } from '../helper'
const find = require('find')

const stylus = require('stylus')
const { transform } = require('@babel/core')
const prettier = require('prettier')
const compPlugin = require('../babel-plugins/babel-transform-memberExpression')
const platformPlugin = require('../babel-plugins/babel-transform-platform')
const { compiler } = require('zp-vueify')

function babelPluginInsertCssImportForVue({ types: t }) {
  const globalCssLiteral = '@mand-mobile/shared/lib/style/global.styl'
  return {
    visitor: {
      Program(p, state) {
        const importLiteral = `./${path.basename(state.opts.filePath)}.css`
        p.unshiftContainer('body', t.ImportDeclaration([], t.StringLiteral(importLiteral)))
        p.unshiftContainer('body', t.ImportDeclaration([], t.StringLiteral(globalCssLiteral)))
      }
    }
  }
}
// function computedCompilerConfig(filePath) {
//   return {
//     extractCSS: true,
//     babel: {
//       presets: [
//         ['@babel/env',
//           {
//             'modules': 'umd',
//             'targets': {
//               'browsers': ['iOS >= 8', 'Android >= 4']
//             }
//           }
//         ],
//       ],
//     },
//   }
// }
export class VueifySFCBuilderPlugin {

  constructor(private readonly options = { transformTo: false, platform: 'web' }) { }

  public apply(container: BuilderContainer) {

    // 设置全局样式变量
    container.hooks.extendsStylus.tap('vueCliBuilder', options => {
      const result = [
        packagesResolver('@mand-mobile/shared', 'lib/style/mixin/theme.basic.styl'),
        packagesResolver('@mand-mobile/shared', 'lib/style/mixin/theme.components.styl'),
        packagesResolver('@mand-mobile/shared', 'lib/style/mixin/util.styl'),
      ]
      options.imports = (options.imports || [])
      options.imports.push(...result)
    })

    container.hooks.extendsBabelConfig.tap('vueCliBuilder', babelConfig => R.mergeRight(babelConfig, {
      presets: [...(babelConfig.presets || []), ['@babel/env', {
        modules: 'umd',
        targets: {
          browsers: ['iOS >= 8', 'Android >= 4'],
        }
      }]]
    }))

    // 纯用于复制一份组件库文件到目标容器文件夹下
    container.hooks.addTemplates.tap('vueCliBuilder', template => {
      template.push([{ template: packagesResolver('@mand-mobile/components', 'src'), renderer: '_mand-mobile' }, {}])
    })

    // 移除掉和本平台无关的模板文件
    container.hooks.afterContainerCreated.tap('vueCliBuilder', () => {
      const componetRoot = path.resolve(container.config.outputRoot, '_mand-mobile')
      const platform = this.options.platform || 'web'
      const files = find.fileSync(/\.(js|vue|ts)$/, componetRoot)
      R.forEach((file: string) => {
        const dirname = path.dirname(file)
        const basename = path.basename(file)
        const result = basename.split('.')
        if (result.length === 3 && result[1]) {
          if (result[1] === platform) {
            fs.moveSync(file, `${dirname}/${result[0]}.${result[2]}`, { overwrite: true })
          } else if (result[1] !== '') {
            fs.removeSync(file)
          }
        }
      }, files)
    })

    container.hooks.extendsBabelConfig.tap('vueCliBuilder', (babelConfig) => {
      babelConfig.plugins = babelConfig.plugins || []
      babelConfig.plugins.push(
        compPlugin,
        [platformPlugin, { platform: this.options.platform }],
      )
    })

  }

  public async build(builderContext, container: BuilderContainer): Promise<unknown> {
    //@fixme 
    const { babelConfig, postcssConfig, stylusConfig } = builderContext
    const componentRoot = path.resolve(container.config.outputRoot, '_mand-mobile')
    const distRoot = container.config.artifactRoot


    const filepipe = ({ from, to }: {from: string, to: string}, transpile: (source: Buffer, context: any) => Promise<Buffer>) => {

      const _emitFiles = {}
      
      const emitFile = (filename, buffer) => {
        _emitFiles[filename] = buffer
      }

      const t = (source: Buffer) => {
        return transpile.call(null, source, {
          emitFile,
        })
      }

      const op = {
        
        reader() {
          return fs.readFile(from)
        },
        writer(buf: Buffer): Promise<void> {

          R.compose(R.forEach((filename: any) => {
            
            let target = filename
            if (!path.isAbsolute(target)) {
              target = R.compose(parent => path.resolve(parent, filename), path.dirname)(to)
            }
            fs.outputFileSync(target, _emitFiles[filename])
          }), R.keys)(_emitFiles)

          return fs.outputFile(to, buf)
        },
        builder: () => {
          // 这是个hack用于绕过ramda的一个类型推导错误bug， 参数未被真实使用
          R.composeP(op.writer, t, op.reader)(void 0)
        }
      }
      return op
    }

    const promiseWarp = (fn) => {
      return (...params) => {
        const result = fn.apply(null, params)
        if (result instanceof Promise) {
          return result
        }
        return Promise.resolve(result)
      }
    }

    // 基于文件名生成编译策略
    const transpileGetter = (filename) => {
      const strategyVue = (code, context) => {
        const config = {
          extractCSS: true,
          babel: {
            ...babelConfig,
            plugins: R.append([babelPluginInsertCssImportForVue, {filePath: filename}], babelConfig.plugins)
          },
          customCompilers: {
            stylus: (content, cb, _compiler, _filePath) => {
              stylus.render(content, stylusConfig, (err, css) => {
                if (err) throw err
                cb(null, css)
              })
            },
          }
        }
        compiler.applyConfig(config)
        let styleContent = ''
        const styleCb = res => {
          return styleContent += (res.style || '')
        }
        compiler.on('style', styleCb)
        return new Promise((resolve, reject) => {
          compiler.compile(code, filename, (err, result) => {
            if (err) {
              reject(err)
            }
            compiler.removeListener('style', styleCb)
            if (styleContent) console.info(styleContent, 'styleContent')
            context.emitFile(`${path.basename(filename)}.css`, Buffer.from(styleContent, 'utf8'))
            resolve(result)
          })
        }).catch(e => {
          console.error(e)
        })
      }
      const _strategyJS = (code) => {
        return transform(code, babelConfig).code
      }
      const strategyJS = promiseWarp(_strategyJS)

      const _bufferToStr = (buf: Buffer) => {
        assert.strictEqual(buf instanceof Buffer, true, 'params must be Buffer')
        return buf.toString('utf8')
      }
      const bufferToStr = promiseWarp(_bufferToStr)

      const _strToBuffer = str => {
        assert.strictEqual(typeof str === 'string', true, 'params must be string')
        return Buffer.from(str, 'utf8')
      }
      const strToBuffer = promiseWarp(_strToBuffer)

      const strategyTable = {
        '.vue': (code, context) => R.composeP(
                                                strToBuffer, 
                                                // formater('vue'), 
                                                R.curry(strategyVue)(R.__, context), bufferToStr)(code),
        '.js': (code, _) => R.composeP(
                                        strToBuffer, 
                                        // formater('babel'), 
                                        strategyJS, 
                                        bufferToStr)(code),
        'default': promiseWarp(buf => buf),
      }

      const ext = path.extname(filename)
      return strategyTable[ext] || strategyTable['default']
    }

    const files = find.fileSync(componentRoot)
    const compileAndDist = R.forEach((file: string) => {
      const reg = new RegExp(`^${componentRoot}\/.*(test|demo)\/.*$`)
      if (reg.test(file)) return

      const transpile = transpileGetter(file)
      const distfilePath = path.relative(componentRoot, file)

      filepipe({
        from: file,
        to: path.join(distRoot, distfilePath).replace(/\.vue$/, '.js')
      }, transpile).builder()
    })
    compileAndDist(files)
    return Promise.resolve()
  }


  public async serve(builderContext, container) {
    // @TODO
  }
}


