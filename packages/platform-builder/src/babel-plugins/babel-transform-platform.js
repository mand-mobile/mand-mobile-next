module.exports = function() {
  return {
    visitor: {
      ImportDeclaration(path, state) {
        const source = path.node.source
        const {platform = 'web'} = state.opts
        const value = source.value.replace(
          /@mand-mobile\/platform-runtime\/lib/,
          `@mand-mobile/platform-runtime/lib/${platform}`,
        )
        source.value = value
      },
    },
  }
}
