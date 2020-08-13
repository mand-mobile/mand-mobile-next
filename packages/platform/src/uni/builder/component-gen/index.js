/* eslint-disable */
function buildUniComponents(api) {
  const prettier = require('prettier')
  const {parse} = require('@vue/compiler-dom')
  const {existsSync, readFileSync, writeFile, mkdirSync, readdirSync, writeFileSync} = require('fs')
  const {resolve} = require('path')
  const {execSync} = require('child_process')
  const {transformJs} = require('./script-gen')
  const {concatcStyle} = require('./style-gen')
  const {transformTpl} = require('./template-gen')
  const {exeRootPath, MAND_PLATFORM, MAND_INPUT_DIR, MAND_OUTPUT_DIR, MAND_BUILD_TARGET} = api.mdContext || {}
  const {execa, info, error} = api.mdUtils

  // execa('ln', [
  //   '-s',
  //   `${exeRootPath}/node_modules/@mand-mobile/components`,
  //   `${exeRootPath}/${MAND_INPUT_DIR}/_mand-mobile`,
  // ])

  execa('ln', ['-s', `${exeRootPath}/node_modules/@mand-mobile/platform`, `${exeRootPath}/${MAND_INPUT_DIR}/_platform`])
  execa('ln', ['-s', `${exeRootPath}/node_modules/@mand-mobile/shared`, `${exeRootPath}/${MAND_INPUT_DIR}/_shared`])

  const COMPONENT_BASE_PATH = resolve(resolve(exeRootPath, MAND_INPUT_DIR), '_mand-mobile/src')
  const UNI_COMPONETN_BASE = resolve(exeRootPath, MAND_PLATFORM)
  const UNI_COMPONETN_BASE_PATH_LIB = resolve(exeRootPath, MAND_OUTPUT_DIR)
  let UNI_COMPONETN_BASE_PATH_SRC = resolve(exeRootPath, './uni/src')

  const resolver = p => resolve(p)

  function mdkirUni() {
    // execSync(
    //   `
    //     rm -rf ${UNI_COMPONETN_BASE}
    //   `,
    // )
    !existsSync(UNI_COMPONETN_BASE) && mkdirSync(UNI_COMPONETN_BASE)
    // !existsSync(UNI_COMPONETN_BASE_PATH_SRC) && mkdirSync(UNI_COMPONETN_BASE_PATH_SRC)
    !existsSync(UNI_COMPONETN_BASE_PATH_LIB) && mkdirSync(UNI_COMPONETN_BASE_PATH_LIB)
  }

  function readVueFile(path) {
    path = `${COMPONENT_BASE_PATH}/${path}`
    if (!existsSync(resolver(path))) {
      error('未找到该组件，请确认！')
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

    style = concatcStyle(ast, MAND_BUILD_TARGET === 'lib', `${exeRootPath}/${MAND_INPUT_DIR}/_shared`)
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
    const srcPath = `${UNI_COMPONETN_BASE_PATH_LIB}/${name.split('/')[0]}`

    !existsSync(resolver(srcPath)) && mkdirSync(resolver(srcPath))
    writeFileSync(resolver(`${UNI_COMPONETN_BASE_PATH_LIB}/${name}`), formateCode(template + script + style), {})
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

    // console.info(dir)
    // process.exit(1)

    const files = readdirSync(dir)
    const ignores = ['demo', 'test', 'README.en-US.md', 'README.md', 'mixin', 'mixins', 'assets']
    return files.filter(f => !ignores.includes(f))
  }

  function findComponents(path) {
    const comps = readdirSync(path)
    return comps
  }

  const run = (...params) => {
    info('build ' + params)
    const arg = params[0]
    if (!arg) {
      error(`
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
        if (f.includes('.vue')) {
          genUniComponet(compilerCode(readVueFile(`${arg}/${f}`)), `${arg}/${f}`)
        } else {
          execSync(
            `
            cp ${COMPONENT_BASE_PATH}/${arg}/${f} ${UNI_COMPONETN_BASE_PATH_LIB}/${arg}
          `,
          )
          ;['mixin', 'mixins', 'assets'].forEach(dir => {
            existsSync(`${COMPONENT_BASE_PATH}/${arg}/${dir}`) &&
              execSync(
                `
                cp -r ${COMPONENT_BASE_PATH}/${arg}/${dir} ${UNI_COMPONETN_BASE_PATH_LIB}/${arg}
              `,
              )
          })
        }
      })
  }
  // 创建文件夹
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
  info(`====== build ${MAND_BUILD_TARGET} 执行完毕 ======`)
}

module.exports = buildUniComponents
