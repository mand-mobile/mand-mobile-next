const { fs, logger, path } = require('@vuepress/shared-utils')

module.exports = {
  extendPageData ($page) {
    const { _filePath, frontmatter } = $page

    const paths = _filePath.split('/')
    paths.splice(-1)

    const parentPath = paths.join('/')
    const metaFilePath = `${parentPath}/component.js`

    $page.meta = {
      name: frontmatter.name || '',
      catetory: frontmatter.catetory || ''
    }

    if (fs.existsSync(metaFilePath)) {
      const isAFile = fs.lstatSync(metaFilePath).isFile()
      if (isAFile) {
        try {
          const meta = require(metaFilePath)
          // meta.category = `components/${meta.category}`
          $page.meta = {
            ...meta,
            category: `components/${meta.category}`
          }
        } catch (error) {
          logger.error(error.stack)
        }
      }
    }
  }
}