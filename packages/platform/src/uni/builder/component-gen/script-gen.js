/* eslint-disable no-console */
const {transform} = require('@babel/core')
const compPlugin = require('./plugins/babel-transform-memberExpression')
const platformPlugin = require('./plugins/babel-transform-platform')
const SCRIPT = 'script'

exports.transformJs = function transformJs(ast) {
  let code = ''

  ast.children
    .filter(child => {
      return child.tag === SCRIPT
    })
    .forEach(s => {
      s.children.forEach(js => {
        code += `
          <script>
            ${transform(js.loc.source, {
              plugins: [compPlugin, platformPlugin],
            }).code}
          </script>
        `
      })
    })

  return code
}

exports.genJs = function genJs(code) {
  return transform(code, {
    plugins: [platformPlugin],
  }).code
}
