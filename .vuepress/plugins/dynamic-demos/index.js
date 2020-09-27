const { fs, logger, path } = require('@vuepress/shared-utils')

function dedent (text) {
  const wRegexp = /^([ \t]*)(.*)\n/gm
  let match; let minIndentLength = null

  while ((match = wRegexp.exec(text)) !== null) {
    const [indentation, content] = match.slice(1)
    if (!content) continue

    const indentLength = indentation.length
    if (indentLength > 0) {
      minIndentLength
        = minIndentLength !== null
          ? Math.min(minIndentLength, indentLength)
          : indentLength
    } else break
  }

  if (minIndentLength) {
    text = text.replace(
      new RegExp(`^[ \t]{${minIndentLength}}(.*)`, 'gm'),
      '$1'
    )
  }

  return text
}

function testLine (line, regexp, regionName, end = false) {
  const [full, tag, name] = regexp.exec(line.trim()) || []

  return (
    full
    && tag
    && name === regionName
    && tag.match(end ? /^[Ee]nd ?[rR]egion$/ : /^[rR]egion$/)
  )
}

function findRegion (lines, regionName) {
  const regionRegexps = [
    /^\/\/ ?#?((?:end)?region) ([\w*-]+)$/, // javascript, typescript, java
    /^\/\* ?#((?:end)?region) ([\w*-]+) ?\*\/$/, // css, less, scss
    /^#pragma ((?:end)?region) ([\w*-]+)$/, // C, C++
    /^<!-- #?((?:end)?region) ([\w*-]+) -->$/, // HTML, markdown
    /^#((?:End )Region) ([\w*-]+)$/, // Visual Basic
    /^::#((?:end)region) ([\w*-]+)$/, // Bat
    /^# ?((?:end)?region) ([\w*-]+)$/ // C#, PHP, Powershell, Python, perl & misc
  ]

  let regexp = null
  let start = -1
  
  for (const [lineId, line] of lines.entries()) {
    if (regexp === null) {
      for (const reg of regionRegexps) {
        if (testLine(line, reg, regionName)) {
          start = lineId + 1
          regexp = reg
          break
        }
      }
    } else if (testLine(line, regexp, regionName, true)) {
      return { start, end: lineId, regexp }
    }
  }

  return null
}

function demos (md, options = {}) {
  const fence = md.renderer.rules.fence
  const root = options.root || process.cwd()

  md.renderer.rules.fence = (...args) => {
    const [tokens, idx, , { loader }] = args
    const token = tokens[idx]
    const [src, regionName] = token._src ? token._src.split('#') : ['']
    if (src) {
      if (loader) {
        loader.addDependency(src)
      }
      const isAFile = fs.lstatSync(src).isFile()
      if (fs.existsSync(src) && isAFile) {
        let content = fs.readFileSync(src, 'utf8')
        let lines = content.split(/\r?\n/)

        if (regionName) {
          const region = findRegion(lines, regionName)
          
          if (region) {
            lines = lines
              .slice(region.start, region.end)
              .filter(line => !region.regexp.test(line.trim()))
          }
        }

        const ignoreRegion = findRegion(lines, 'ignore')

        if (ignoreRegion) {
          lines.splice(ignoreRegion.start, ignoreRegion.end - ignoreRegion.start)
          lines = lines.filter(line => !ignoreRegion.regexp.test(line.trim()))
        }
        
        content = dedent(lines.join('\n'))
        
        token.content = content
        return `<MDDemo path="${token.demoPath}" slot="${token.align}">${fence(...args)}</MDDemo>`
      } else {
        token.content = isAFile ? `Code snippet path not found: ${src}` : `Invalid code snippet option`
        token.info = ''
        logger.error(token.content)
      }
    }
    return fence(...args)
  }

  function parser (state, startLine, endLine, silent) {
    const CHL = '{'.charCodeAt(0)
    const CHR = '}'.charCodeAt(0)
    const pos = state.bMarks[startLine] + state.tShift[startLine]
    const max = state.eMarks[startLine]
    const align = state.src.charCodeAt(pos) === CHL
      ? 'left'
      : state.src.charCodeAt(pos) === CHR
        ? 'right'
        : ''

    // if it's indented more than 3 spaces, it should be a code block
    if (state.sCount[startLine] - state.blkIndent >= 4) {
      return false
    }

    for (let i = 0; i < 3; ++i) {
      const ch = state.src.charCodeAt(pos + i)
      if ((ch !== CHL && ch !== CHR) || pos + i >= max) return false
    }

    if (silent) {
      return true
    }

    const start = pos + 3
    const end = state.skipSpacesBack(max, pos)

    /**
     * raw path format: "/path/to/file.extension#region {meta}"
     *    where #region and {meta} are optionnal
     *
     * captures: ['/path/to/file.extension', 'extension', '#region', '{meta}']
     */
    const rawPathRegexp = /^(.+(?:\.([a-z]+)))(?:(#[\w-]+))?(?: ?({\d+(?:[,-]\d+)*}))?$/
    
    const filePath = state.src.slice(start, end).trim()
    const rawPath = filePath.replace(/^@/, root).trim()
    const [demoPath] = filePath.replace(/^@\/packages\/components\/src\//, '').trim().split('#')
    const [filename = '', extension = '', region = '', meta = ''] = (rawPathRegexp.exec(rawPath) || []).slice(1)
    
    state.line = startLine + 1

    const token = state.push('fence', 'code', 0)
    token.info = extension + meta
    token._src = path.resolve(filename) + region
    token.demoPath = demoPath
    token.align = align
    token.markup = '```'
    token.map = [startLine, startLine + 1]

    return true
  }

  md.block.ruler.before('fence', 'demos', parser)
}

// module.exports = {
//   extendMarkdown: demos
// }
module.exports = (options, context) => {
  options.extendMarkdown = demos
  
  options.chainWebpack = (config, isServer) => {
    const {
      siteConfig,
      cacheDirectory,
      cacheIdentifier,
    } = context

    function createVueRule (shadowTarget) {
      const baseRule = config.module.rule('vue').test(/\.vue$/)
      const shadowRule = config.module.rule('vue-shadow').test(/packages(.*)\/(.*)\.vue$/)
      const baseOptions = {
        compilerOptions: {
          preserveWhitespace: true
        },
        cacheDirectory,
        cacheIdentifier: cacheIdentifier + `isServer:${isServer}`
      }

      baseRule.uses.clear()

      baseRule
        .exclude.add(path.resolve(__dirname, '../../../packages')).end()
          .use('vue-loader')
          .loader('vue-loader')
          .options(baseOptions)
          .end()
      shadowRule
        // .include.add(shadowTarget).end()
          .use('vue-loader')
          .loader('vue-loader')
          .options({
            shadowMode: true,
            ...baseOptions
          })
    }

    function createShadowCSSRule (lang, test, loader, options) {
      const baseRule = config.module.rule(lang).test(test).sideEffects(true)
      // const baseRule = config.module.rule(lang).test(test)
      // baseRule.uses.clear()
      const shadowRule = baseRule.oneOf('shadow').before('normal')
        .include
          .add(path.resolve(__dirname, '../../../packages'))
          .end()
        .exclude
          .add(path.resolve(__dirname, '../../../packages/components/src/dialog'))
          .add(path.resolve(__dirname, '../../../packages/components/src/toast'))
          // .add(path.resolve(__dirname, '../../../packages/shared'))
          .end()

      shadowRule
        .use('vue-style-loader')
        .loader('vue-style-loader')
        .options({
          shadowMode: true
        })

      shadowRule.use('css-loader')
        .loader('css-loader')
        .options({
          localIdentName: `[local]_[hash:base64:8]`,
          importLoaders: 1,
          exportOnlyLocals: isServer
        })

      shadowRule.use('postcss-loader').loader('postcss-loader').options(Object.assign({
          plugins: [require('autoprefixer')],
        }, siteConfig.postcss))

      if (loader) {
        shadowRule.use(loader).loader(loader).options(options)
      }
    }

    if (siteConfig.themeConfig.demoConfig.shadowMode) {
      createVueRule()
      createShadowCSSRule('css', /\.css$/)
      createShadowCSSRule('stylus', /\.styl(us)?$/, 'stylus-loader', Object.assign({
        preferPathResolver: 'webpack'
      }, siteConfig.stylus))
    }
  }

  return options
}