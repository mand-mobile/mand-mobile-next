import {transform} from '@babel/core'

const babelPlugin = require('./plugins/babel-transform-memberExpression.js')
const SCRIPT = 'script'

export function transformJs(ast) {
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
              plugins: [babelPlugin],
            })}
          </script>
        `
      })
    })

  return code
}
