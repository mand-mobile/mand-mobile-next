import * as assert from 'assert'
import * as path from 'path'
import fs from 'fs-extra'
import R from 'ramda'
import { BuilderContainer } from '../index'
import { packagesResolver } from '../helper'
import { ComponentsSourceSetupPlugin } from '.'
const find = require('find')
const stylus = require('stylus')
const { transform } = require('@babel/core')
const compPlugin = require('../babel-plugins/babel-transform-memberExpression')
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
export class VueifySFCBuilderPlugin {
  public static NS = 'vueify-sfc-builder-plugin'
  constructor(private readonly options = { transformTo: false, platform: 'web' }) { }

  public apply(container: BuilderContainer) {

    container.hooks.extendsBabelConfig.tap(VueifySFCBuilderPlugin.NS, (babelConfig) => {
      babelConfig.plugins = babelConfig.plugins || []
      babelConfig.plugins.push(
        compPlugin,
      )
    })

  }

  public async build(builderContext, container: BuilderContainer): Promise<unknown> {
    //@fixme 针对postcss配置进行编译
    const { babelConfig, postcssConfig, stylusConfig } = builderContext

    // @fixme 提取compoentRoot到插件上下文中
    const componentRoot = container.context[ComponentsSourceSetupPlugin.NS].componentRoot
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
          return R.composeP(op.writer, t, op.reader)(void 0)
        }
      }
      return op
    }

    // 基于文件名生成编译策略
    const transpileGetter = (filename) => {
      const strategyVue = (code, context) => {
        const config = {
          extractCSS: true,
          babel: {
            ...babelConfig,
            plugins: R.append([babelPluginInsertCssImportForVue, {filePath: filename}], (babelConfig.plugins || []))
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
              return reject(err)
            }
            compiler.removeListener('style', styleCb)
            context.emitFile(`${path.basename(filename)}.css`, Buffer.from(styleContent, 'utf8'))
            resolve(result)
          })
        }).catch(e => {
          console.error(e)
          return ''
        })
      }
      const strategyJS = (code) => {
        return Promise.resolve(transform(code, babelConfig).code)
      }

      const bufferToStr = (buf: Buffer) => {
        assert.strictEqual(buf instanceof Buffer, true, 'params must be Buffer')
        return Promise.resolve(buf.toString('utf8'))
      }

      const strToBuffer = str => {
        assert.strictEqual(typeof str === 'string', true, 'params must be string')
        return Promise.resolve(Buffer.from(str, 'utf8'))
      }

      const strategyTable = {
        '.vue': (code, context) => R.composeP(
                                                strToBuffer, 
                                                // formater('vue'), 
                                                (code) => strategyVue(code, context), 
                                                bufferToStr)(code),
        '.js': (code, _) => R.composeP(
                                        strToBuffer, 
                                        // formater('babel'), 
                                        strategyJS, 
                                        bufferToStr)(code),
        'default': (buf) => Promise.resolve(buf),
      }

      const ext = path.extname(filename)
      return strategyTable[ext] || strategyTable['default']
    }

    const files = find.fileSync(componentRoot)
    const compileAndDist = R.map((file: string) => {
      const reg = new RegExp(`^${componentRoot}\/.*(test|demo)\/.*$`)
      if (reg.test(file)) return

      const transpile = transpileGetter(file)
      const distfilePath = path.relative(componentRoot, file)

      return filepipe({
        from: file,
        to: path.join(distRoot, distfilePath).replace(/\.vue$/, '.js')
      }, transpile).builder()
    })
    Promise.all(compileAndDist(files))
    return Promise.resolve()
  }


  public async serve(builderContext, container) {
    // @TODO
  }
}


