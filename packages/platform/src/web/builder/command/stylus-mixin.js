const path = require('path')
// const isSpecial = process.env.BUILD_TYPE === 'special'
const nib = require('nib')
const R = require('ramda')

module.exports = function useMixin(stylus) {
  // if (process.env.BUILD_TYPE === 'variables') {
  //   return stylus
  //   .import(path.join(__dirname, '../components/_style/mixin/theme.components.styl'))
  //   .import(path.join(__dirname, '../components/_style/mixin/theme.basic.styl'))
  //   .import(path.join(__dirname, '../components/_style/mixin/theme.variable.styl'))
  //   .import(path.join(__dirname, '../components/_style/mixin/util.styl'))
  //   .import(path.join(__dirname, '../node_modules/nib/lib/nib/vendor'))
  //   .import(path.join(__dirname, '../node_modules/nib/lib/nib/gradients'))

  //   return stylus
  // }

  const resolvePkg = packageName => path.dirname(require('@mand-mobile/shared'))
  const resolver = R.compose(path.dirname, require.resolve)
  return stylus
    .import(path.resolve(resolver('@mand-mobile/shared'), 'lib/style/mixin/theme.components.styl'))
    .import(path.resolve(resolver('@mand-mobile/shared'), 'lib/style/mixin/theme.basic.styl'))
    .import(path.resolve(resolver('@mand-mobile/shared'), 'lib/style/mixin/util.styl'))
    .use(nib())
}
