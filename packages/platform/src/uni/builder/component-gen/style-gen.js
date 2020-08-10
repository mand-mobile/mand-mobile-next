/* eslint-disable */
// const postcss = require('postcss')
const stylus = require('stylus')
const STYLE = 'style'

exports.concatcStyle = function concatcStyle(ast, transformFlag = false, _shared) {
  let code = ''

  ast.children
    .filter(child => {
      return child.tag === STYLE
    })
    .forEach(t => {
      if (transformFlag) {
        t.children.forEach(styl => {
          stylus(styl.loc.source)
            .import(_shared + '/lib/style/mixin/theme.basic')
            .import(_shared + '/lib/style/mixin/util')
            // .import(_shared + '/theme.variable')
            .import(_shared + '/lib/style/mixin/theme.components')
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
