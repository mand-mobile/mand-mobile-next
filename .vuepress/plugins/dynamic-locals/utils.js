'use strict'

const {
  path, globby, sort,
} = require('@vuepress/shared-utils')

exports.resolveLocals = function (locales, fn) {
  Object.keys(locales).map(localPath => {
    const localName = localPath.split('/')[1]
    if (localName) {
      fn(localName)
    }
  })
}

exports.addPages = function (name, options, ctx) {
  options.additionalPages = options.additionalPages || []

  const pageFiles = sort(globby.sync([
    `**/*.${name}.md`,
    '!.vuepress',
    '!node_modules',
    '!**/node_modules/**',
    '!**/.mand-mobile/**',
  ], { cwd: ctx.sourceDir }))

  pageFiles.map(relative => {
    const filePath = path.resolve(ctx.sourceDir, relative)
    const filePathParts = relative.split('/')
    const fileNameIndex = filePathParts.length - 1
    const fileName = filePathParts[fileNameIndex]
    
    /**
     * Remove file name from path which is 'README'
     * https://vuepress.vuejs.org/guide/directory-structure.html#default-page-routing
     */
    if (fileName === `README.${name}.md`) {
      filePathParts[fileNameIndex] = ''
    } else {
      filePathParts[fileNameIndex] = fileName.replace(`.${name}.md`, '.html')
    }

    const localePath = `/${name}/`
    options.additionalPages.push({
      path: `${localePath}${filePathParts.join('/')}`,
      filePath,
      localePath,
      frontmatter: {
        localePath
      }
    })
  })
}

exports.shieldLocalPatterns = function (name, options, ctx) {
  ctx.siteConfig.patterns.push(`!**/*.${name}.md`)
}