const path = require('path')
// const isSpecial = process.env.BUILD_TYPE === 'special'
const nib = require('nib')


module.exports = function useMixin(style) {
  // if (process.env.BUILD_TYPE === 'variables') {
  //   return style
  //   .import(path.join(__dirname, '../components/_style/mixin/theme.components.styl'))
  //   .import(path.join(__dirname, '../components/_style/mixin/theme.basic.styl'))
  //   .import(path.join(__dirname, '../components/_style/mixin/theme.variable.styl'))
  //   .import(path.join(__dirname, '../components/_style/mixin/util.styl'))
  //   .import(path.join(__dirname, '../node_modules/nib/lib/nib/vendor'))
  //   .import(path.join(__dirname, '../node_modules/nib/lib/nib/gradients'))
  // } else {

  const resolvePkg = (packageName) => path.dirname(require('@mand-mobile/shared'))
  return style
  .import(path.resolve(require('@mand-mobile/shared'), 'lib/mixin/theme.components.styl'))
  .import(path.resolve(require('@mand-mobile/shared'), 'lib/mixin/theme.basic.styl'))
  .import(path.resolve(require('@mand-mobile/shared'), 'lib/mixin/util.styl'))
  .use(nib())
  // }
}
