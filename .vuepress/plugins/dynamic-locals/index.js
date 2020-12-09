/**
 * Change structure restrictions of multi-language
 * Distinguish by formatted file name 
 * 
 * Configration
 * { '/': {}, '/en-US/': {} }
 * 
 * Compiled
 * \/xxx\/README.md => /xxx/
 * \/xxx\/README.en-US.md => /en-US/xxx/
 * \/xxx\/anything.md => /xxx/anything.html/
 * \/xxx\/anything.en-US.md => /en-US/xxx/anything.html/
 */

const {
  resolveLocals, addPages, shieldLocalPatterns
} = require('./utils')

module.exports = (options, ctx) => {
  const {locales, patterns} = ctx.siteConfig
  options.patterns = patterns
  resolveLocals(locales, name => {
    addPages(name, options, ctx)
    shieldLocalPatterns(name, options, ctx)
  })

  return options
}