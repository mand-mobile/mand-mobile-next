/* eslint-disable */
import {baseParse} from '@vue/compiler-core'
import {existsSync, readFileSync, writeFile, mkdirSync} from 'fs'
import {resolve} from 'path'
import {transformJs} from './script-gen'
import {concatcStyle} from './style-gen'
import {transformTpl} from './template-gen'

const COMPONENT_BASE_PATH = './'
const UNI_COMPONETN_BASE_PATH = './'

const resolver = p => resolve(__dirname, p)

function readVueFile(path) {
  path = `${COMPONENT_BASE_PATH}/${path}`
  if (existsSync(resolver(path))) {
    // eslint-disable-next-line no-console
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
  const name = path.split('.')[0]
  const dirPath = `${UNI_COMPONETN_BASE_PATH}/${name}`

  !existsSync(resolver(dirPath)) && mkdirSync(resolver(dirPath))
  writeFile(resolver(`${dirPath}/index.vue`), template + script + style, {}, err => {
    if (err) {
      throw err
    }
    console.log('执行完毕')
  })
}

const run = () => {
  const args = process.argv.slice(2)
  console.log(args)
  if (!args[0]) {
    console.error(`请加上组件名称参数。\n npm run transform component.name \n e: npm run transform button`)
    return
  }
  genUniComponet(compilerCode(readVueFile(`${args[0]}/index.vue`)), `${args[0]}.vue`)
}
