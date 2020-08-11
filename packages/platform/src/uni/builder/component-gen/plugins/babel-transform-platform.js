module.exports = function() {
  return {
    visitor: {
      ImportDeclaration(path) {
        const source = path.node.source
        const value = source.value.replace(/@mand-mobile\/platform\/lib/, '@mand-mobile/platform/lib/uni')
        source.value = value
      },
    },
  }
}
