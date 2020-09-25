import * as assert from 'assert'
import * as path from 'path'
import fs from 'fs-extra'
import R from 'ramda'

import { BuilderContainer } from '../../index'
import { packagesResolver } from '../../helper'

const find = require('find')
const {parse} = require('@vue/compiler-dom')
const stylus = require('stylus')
const prettier = require('prettier')
const { transform } = require('@babel/core')
const compPlugin = require('../../babel-plugins/babel-transform-memberExpression')
const platformPlugin = require('../../babel-plugins/babel-transform-platform')

interface IStyleOptions {
  stylusConfig?,
  transformTo?: boolean | string
}

interface IScriptOptions {
  babelConfig?,
}
const styleCompiler = (ast, options: IStyleOptions = {}) => {
  const STYLE_TAG = 'style'
  const { stylusConfig = {}, transformTo = 'css' } = options
  let code = ''
  ast.children
  .filter(child => {
    return child.tag === STYLE_TAG
  })
  .forEach(t => {
    if (transformTo === 'css') {
      t.children.forEach(styl => {
        stylus(styl.loc.source)
        .render((err, css) => {
          if (err) throw err
          code += `<style>${css}</style>`
        }, stylusConfig)
      })
    }
    if (!transformTo) {
      code += t.loc.source
    }
  })
  return code
}

const scriptCompiler = (ast, options: IScriptOptions = {}) => {
  const SCRIPT_TAG = 'script'
  const { babelConfig = {} } = options
  let code = ''
  ast.children
    .filter(child => {
      return child.tag === SCRIPT_TAG
    })
    .forEach(node => {
      node.children.forEach(js => {
        code += `<script>${transform(js.loc.source, babelConfig).code}</script>`
      })
    })
  return code
}

const templateCompiler = (ast, options = {}) => {
  const TEMPLATE_TAG = 'template'
  const NORMAL_ATTR = 6

  let code = ''
  
  function injectProps(props, context) {
    const {push} = context
    props.forEach(prop => {
      push(` `)
      const {type, name, value, loc} = prop
      if (type === NORMAL_ATTR) {
        value ? push(`${name}=${value.loc.source}`) : push(`${name}`)
      } else {
        push(loc.source)
      }
    })
  }
  
  function injectImgMode() {
    return [
      {
        name: 'mode',
        value: {
          loc: {
            source: '"widthFix"',
          },
        },
        type: NORMAL_ATTR,
      },
    ]
  }
  function genHTML(ast, context) {
    const {push, newline} = context
    ast.children.forEach(child => {
      const {tag, isSelfClosing, props} = child
      if (tag) {
        if (isSelfClosing) {
          push(`<${tag}`)
          injectProps(props, context)
          if (tag === 'img') {
            injectProps(injectImgMode(), context)
          }
          push(`/>`)
          newline()
        } else {
          push(`<${tag}`)
          injectProps(props, context)
          push(`>`)
          if (child.children && child.children.length) {
            genHTML(child, context)
          }
          push(`</${tag}>`)
          newline()
        }
      } else {
        push(child.loc.source)
      }
    })
  }


  const genTemplate = (ast) => {
    const context = {
      code: ``,
      push(code) {
        context.code += code
      },
      source: ast.loc.source,
      newline(n = 2) {
        context.push('\n' + ` `.repeat(n))
      },
    }

    context.push('<template>')
    context.newline()
    genHTML(ast, context)
    context.push('</template>')
    context.newline()

    return context
  }

  ast.children
    .filter(child => {
      return child.tag === TEMPLATE_TAG
    })
    .forEach(c => {
      code += genTemplate(c).code
    })

  return code
}




export class VueSFCBuilderPlugin {

  constructor(private readonly options = {transformTo: false, platform: 'web'}) { }

  public apply(container: BuilderContainer) {

    // const components = resolveComponents({platform: 'web', componentSource: packagesResolver('@mand-mobile/components', 'src')})


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
        [platformPlugin, {platform: this.options.platform}],
      )
    })

  }

  public async build(builderContext, container: BuilderContainer): Promise<unknown> {
    //@fixme 
    const { babelConfig, postcssConfig, stylusConfig } = builderContext
    const componentRoot = path.resolve(container.config.outputRoot, '_mand-mobile')
    const distRoot = container.config.artifactRoot

    // const readFile = 

    const filepipe = ({from, to}, transpile: (source: Buffer) => Buffer) => {
      const op = {
        reader(): Buffer {
          return fs.readFileSync(from)
        },
        writer(buf: Buffer) {
          return fs.outputFileSync(to, buf)
        },
        builder: () => {
          R.compose(op.writer, transpile, op.reader)()
        }
      }
      return op
    }


    // 基于文件名生成编译策略
    const transpileGetter = (filename) => {
      const formater = R.curry((parser, code) => {
        const rule = {
          semi: false,
          singleQuote: true,
          trailingComma: 'es5',
          arrowParens: 'always',
          printWidth: 60,
          tabWidth: 2,
        }
        return prettier.format(code, {...rule, parser})
      })
      const strategyVue = (code) => {
        const ast = parse(code)
        return [templateCompiler(ast), scriptCompiler(ast, {babelConfig}), styleCompiler(ast, {stylusConfig, transformTo: this.options.transformTo})].join('\n\n')
      }
      const strategyJS = (code) => {
        return transform(code, babelConfig).code
      }

      const bufferToStr = (buf: Buffer) => {
        assert.strictEqual(buf instanceof Buffer, true, 'params must be Buffer')
        return buf.toString('utf8')
      }
      const strToBuffer = str => {
        assert.strictEqual(typeof str === 'string', true, 'params must be string')
        return Buffer.from(str, 'utf8')
      }

      const strategyTable = {
        '.vue': R.compose(strToBuffer, formater('vue'), strategyVue, bufferToStr),
        '.js': R.compose(strToBuffer, formater('babel'), strategyJS, bufferToStr),
        'default': buf => buf,
      }
      
      const ext = path.extname(filename) 
      return strategyTable[ext] || strategyTable['default']
    }

    const files = find.fileSync(componentRoot)
    const compileAndDist = R.forEach((file: string) => {

        const reg = new RegExp(`^${componentRoot}\/.*(test|demo)\/.*$`)
        if ( reg.test(file)) return 
        const distfilePath = path.relative(componentRoot, file)
        const transpile = transpileGetter(file)
        filepipe({
          from: file,
          to: path.join(distRoot, distfilePath)
        }, transpile).builder()
    }) 

    compileAndDist(files)

    return Promise.resolve()
  }


  public async serve(builderContext, container) {
    // @TODO
  }
}


