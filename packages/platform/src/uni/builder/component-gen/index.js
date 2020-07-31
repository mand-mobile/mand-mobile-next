/* eslint-disable */
import {baseParse} from '@vue/compiler-core'
import {existsSync, readFileSync, writeFile} from 'fs'
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
