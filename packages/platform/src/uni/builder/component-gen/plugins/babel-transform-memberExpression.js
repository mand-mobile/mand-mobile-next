const {hyphenate} = require('@vue/shared')

module.exports = function({types: t}) {
  const optionsVistor = {
    ExportDefaultDeclaration: {
      enter(path) {
        if (path.parent.type === 'Program') {
          const declaration = path.node.declaration
          if (declaration.type === 'ObjectExpression') {
            const propComponents = declaration.properties.find(p => {
              return p.type === 'ObjectProperty' && p.key.name === 'components'
            })
            if (propComponents && propComponents.value.type === 'ObjectExpression') {
              const props = propComponents.value.properties.filter(p => {
                return p.key.type === 'MemberExpression'
              })

              props.forEach(p => {
                const _key = t.stringLiteral(hyphenate(p.key.object.name))
                p.key = _key
              })
            }
          }
        }
      },
    },
  }

  return {
    visitor: optionsVistor,
  }
}
