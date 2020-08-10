const {createFilter} = require('rollup-pluginutils')
const stylus = require('stylus')
const path = require('path')

module.exports = function(options = {}) {
  // set default stylus file extensions
  if (!options.include) options.include = ['**/*.styl', '**/*.stylus', /lang.stylus/]

  /**
   * 支持从外部传入插件扩展stylus
   */
  const useFn = options.use || []

  const filter = createFilter(options.include, options.exclude)

  // use to cache the compiled content
  // structure: {[compiledId]: [compiledContent]}
  const compiledCache = {}

  /** API : https://rollupjs.org/guide/en#hooks */
  return {
    name: 'rollup-plugin-stylus-compiler',
    /** Kind: async, first */
    resolveId(importee, importer) {
      if (compiledCache[importee]) return importee
    },
    /** Kind: async, first */
    load(id) {
      if (compiledCache[id]) return compiledCache[id]
    },
    /** Kind: async, sequential */
    transform(code, id) {
      if (!filter(id)) return

      return new Promise(function(resolve, reject) {
        const relativePath = path.relative(process.cwd(), id)

        const stylusCompiler = stylus(code, options.compiler).set('filename', relativePath)
        useFn.forEach(fn => {
          stylusCompiler.use(fn)
        })

        stylusCompiler.render(function(err, css) {
          if (err) reject(err)
          else {
            // cache the compiled content
            // use `.css` extention so next plugin can deal it as pure css
            const compiledId = `${id}.css`

            compiledCache[compiledId] = css

            resolve({
              // make next css plugin work
              // code: `import ${JSON.stringify(compiledId)}`,
              code: css,
              map: {mappings: ''},
            })
          }
        })
      })
    },
  }
}
