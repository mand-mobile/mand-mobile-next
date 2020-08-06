/* eslint-disable */
const postcss = require('postcss')
const stylus = require('stylus')

const STYLE = 'style'

exports.concatcStyle = function concatcStyle(ast) {
  let code = ''

  ast.children
    .filter(child => {
      return child.tag === STYLE
    })
    .forEach(t => {
      code += t.loc.source
    })

  return code
}
