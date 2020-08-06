/* eslint-disable */
const {baseParse} = require('@vue/compiler-core')
const {existsSync, readFileSync, writeFile, mkdirSync, readdirSync} = require('fs')
const {resolve} = require('path')
const prettier = require('prettier')
const {execSync} = require('child_process')
const {transformJs} = require('./script-gen')
const {concatcStyle} = require('./style-gen')
const {transformTpl} = require('./template-gen')

const COMPONENT_BASE_PATH = `${__dirname.split('platform')[0]}components/src`
const UNI_COMPONETN_BASE_PATH = `${__dirname.split('platform')[0]}components/uni/src`

const resolver = p => resolve(p)

function mdkirUni() {
  execSync(
    `
      rm -rf ${__dirname.split('platform')[0]}components/uni
    `,
  )
  mkdirSync(`${__dirname.split('platform')[0]}components/uni`)
  mkdirSync(`${__dirname.split('platform')[0]}components/uni/src`)
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
  const ast = baseParse(code)

  let template = ''
  let style = ''
  let script = ''

  style = concatcStyle(ast)
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
  const dirPath = `${UNI_COMPONETN_BASE_PATH}/${name.split('/')[0]}`

  !existsSync(resolver(dirPath)) && mkdirSync(resolver(dirPath))
  writeFile(resolver(`${UNI_COMPONETN_BASE_PATH}/${name}`), formateCode(template + script + style), {}, err => {
    if (err) {
      throw err
    }
    console.log('执行完毕')
  })
}

function formateCode(code) {
  return prettier.format(code, {
    parser: 'vue',
    semi: false,
    singleQuote: true,
    trailingComma: 'all',
    arrowParens: 'always',
  })
}

function findFile(path) {
  const dir = `${COMPONENT_BASE_PATH}/${path}`
  const files = readdirSync(dir)
  const ignores = ['demo', 'test', 'README.en-US.md', 'README.md']
  return files.filter(f => !ignores.includes(f))
}

const run = () => {
  const args = process.argv.slice(2)
  if (!args[0]) {
    console.error(`
      请加上组件名称参数。\n
      npm run build:uni-component component.name \n
      e: npm run build:uni-component button`)
    return
  }

  findFile(args[0])
    .sort(a => {
      if (a && a.includes('.vue')) {
        return -1
      } else {
        return 0
      }
    })
    .forEach(f => {
      if (f.includes('.vue')) {
        genUniComponet(compilerCode(readVueFile(`${args[0]}/${f}`)), `${args[0]}/${f}`)
      } else {
        execSync(
          `
        cp ${COMPONENT_BASE_PATH}/${args[0]}/${f} ${UNI_COMPONETN_BASE_PATH}/${args[0]}
        `,
        )
      }
    })
}
mdkirUni()
run()
