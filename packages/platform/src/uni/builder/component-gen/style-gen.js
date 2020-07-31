const STYLE = 'style'

export function concatcStyle(ast) {
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
