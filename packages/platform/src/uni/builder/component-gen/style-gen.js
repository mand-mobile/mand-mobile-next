/* eslint-disable */
// const postcss = require('postcss')
const stylus = require('stylus')

const STYLE = 'style'
const IMPORT_PAHT = `${__dirname.split('platform')[0]}shared/src/style/mixin`

exports.concatcStyle = function concatcStyle(ast, transformFlag = false) {
  let code = ''

  ast.children
    .filter(child => {
      return child.tag === STYLE
    })
    .forEach(t => {
      if (transformFlag) {
        t.children.forEach(styl => {
          stylus(styl.loc.source)
            .import(IMPORT_PAHT + '/theme.basic')
            .import(IMPORT_PAHT + '/util')
            // .import(IMPORT_PAHT + '/theme.variable')
            .import(IMPORT_PAHT + '/theme.components')
            .render((err, css) => {
              if (err) {
                throw new Error(err)
              }
              code += `
                <style>
                ${css}
                </style>
              `
            })
        })
      } else {
        code += t.loc.source
      }
    })

  return code
}
