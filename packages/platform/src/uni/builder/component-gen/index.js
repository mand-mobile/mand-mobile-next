/* eslint-disable */
// const {baseParse} = require('@vue/compiler-core')
// const {parse} = require('@vue/compiler-sfc')
const prettier = require('prettier')
const {parse} = require('@vue/compiler-dom')
const {existsSync, readFileSync, writeFile, mkdirSync, readdirSync} = require('fs')
const {resolve} = require('path')
const {execSync} = require('child_process')
const {transformJs} = require('./script-gen')
const {concatcStyle} = require('./style-gen')
const {transformTpl} = require('./template-gen')

const COMPONENT_BASE_PATH = `${__dirname.split('platform')[0]}components/src`
const UNI_COMPONETN_BASE = `${__dirname.split('platform')[0]}components/uni`
const UNI_COMPONETN_BASE_PATH_LIB = `${__dirname.split('platform')[0]}components/uni/lib`
let UNI_COMPONETN_BASE_PATH_SRC = `${__dirname.split('platform')[0]}components/uni/src`

const resolver = p => resolve(p)

function mdkirUni() {
  execSync(
    `
      rm -rf ${__dirname.split('platform')[0]}components/uni
    `,
  )
  mkdirSync(UNI_COMPONETN_BASE)
  mkdirSync(UNI_COMPONETN_BASE_PATH_SRC)
  mkdirSync(UNI_COMPONETN_BASE_PATH_LIB)
}

function readVueFile(path) {
  path = `${COMPONENT_BASE_PATH}/${path}`
  if (!existsSync(resolver(path))) {
    console.error('未找到该组件，请确认！')
    return
  }
  return readFileSync(resolver(path), {
    encoding: 'utf8',
  })
}

function compilerCode(code) {
  const ast = parse(code)

  let template = ''
  let style = ''
  let script = ''

  style = concatcStyle(ast, UNI_COMPONETN_BASE_PATH_SRC === UNI_COMPONETN_BASE_PATH_LIB)
  script = transformJs(ast)
  template = transformTpl(ast)

  return {
    template,
    style,
    script,
  }
}

function genUniComponet({template, script, style}, path) {
  const name = path
  const srcPath = `${UNI_COMPONETN_BASE_PATH_SRC}/${name.split('/')[0]}`

  !existsSync(resolver(srcPath)) && mkdirSync(resolver(srcPath))
  writeFile(resolver(`${UNI_COMPONETN_BASE_PATH_SRC}/${name}`), formateCode(template + script + style), {}, err => {
    if (err) {
      throw err
    }
  })
}

function formateCode(code) {
  return prettier.format(code, {
    parser: 'vue',
    semi: false,
    singleQuote: true,
    trailingComma: 'es5',
    arrowParens: 'always',
    printWidth: 60,
    tabWidth: 2,
    trailingComma: 'es5',
  })
}

function findFile(path) {
  const dir = `${COMPONENT_BASE_PATH}/${path}`
  const files = readdirSync(dir)
  const ignores = ['demo', 'test', 'README.en-US.md', 'README.md', 'mixin', 'mixins', 'assets']
  return files.filter(f => !ignores.includes(f))
}

function findComponents(path) {
  const comps = readdirSync(path)
  return comps
}

const run = (...params) => {
  console.log('build ' + params)
  const arg = process.argv.slice(2)[0] || params[0]
  if (!arg) {
    console.error(`
      请加上组件名称参数。\n
      npm run build:uni-component component.name \n
      e: npm run build:uni-component button`)
    return
  }

  findFile(arg)
    .sort(a => {
      if (a && a.includes('.vue')) {
        return -1
      } else {
        return 0
      }
    })
    .forEach(f => {
      if (f.includes('.vue') && !f.includes('uni')) {
        genUniComponet(compilerCode(readVueFile(`${arg}/${f}`)), `${arg}/${f}`)
      } else {
        execSync(
          `
          cp ${COMPONENT_BASE_PATH}/${arg}/${f} ${UNI_COMPONETN_BASE_PATH_SRC}/${arg}
        `,
        )
        ;['mixin', 'mixins', 'assets'].forEach(dir => {
          existsSync(`${COMPONENT_BASE_PATH}/${arg}/${dir}`) &&
            execSync(
              `
              cp -r ${COMPONENT_BASE_PATH}/${arg}/${dir} ${UNI_COMPONETN_BASE_PATH_SRC}/${arg}
            `,
            )
        })
      }
    })
}

mdkirUni()

const comps = findComponents(`${__dirname.split('platform')[0]}components/src`).sort()
let i = 0
const start = () => {
  if (i === comps.length - 1) return
  run(comps[i])
  i++
  start()
}

start()
console.log('====== build src 执行完毕 ======')

i = 0
UNI_COMPONETN_BASE_PATH_SRC = UNI_COMPONETN_BASE_PATH_LIB

start()
console.log('====== build lib 执行完毕 ======')