/* eslint-disable */
const TEMPLATE = 'template'
const NORMAL_ATTR = 6

function createCodegenContext(ast) {
  const context = {
    code: ``,
    push(code) {
      context.code += code
    },
    source: ast.loc.source,
    newline(n = 2) {
      context.push('\n' + ` `.repeat(n))
    },
  }

  return context
}

exports.transformTpl = function transformTpl(ast) {
  let code = ''

  ast.children
    .filter(child => {
      return child.tag === TEMPLATE
    })
    .forEach(c => {
      code += genTemplate(c).code
    })

  return code
}

function genTemplate(ast) {
  const context = createCodegenContext(ast)
  const {push, newline} = context

  push('<template>')
  newline()

  genHTML(ast, context)

  push('</template>')
  newline()
  return context
}

function genHTML(ast, context) {
  const {push, newline} = context
  ast.children.forEach(child => {
    const {tag, isSelfClosing, props} = child
    if (tag) {
      if (isSelfClosing) {
        push(`<${tag}`)
        injectProps(props, context)
        if (tag === 'img') {
          injectProps(injectImgMode(), context)
        }
        push(`/>`)
        newline()
      } else {
        push(`<${tag}`)
        injectProps(props, context)
        push(`>`)
        if (child.children && child.children.length) {
          genHTML(child, context)
        }
        push(`</${tag}>`)
        newline()
      }
    } else {
      push(child.loc.source)
    }
  })
}

function injectProps(props, context) {
  const {push} = context
  props.forEach(prop => {
    push(` `)
    const {type, name, value, loc} = prop
    if (type === NORMAL_ATTR) {
      value ? push(`${name}=${value.loc.source}`) : push(`${name}`)
    } else {
      push(loc.source)
    }
  })
}

function injectImgMode() {
  return [
    {
      name: 'mode',
      value: {
        loc: {
          source: '"widthFix"',
        },
      },
      type: NORMAL_ATTR,
    },
  ]
}
