const R = require('ramda')
const path = require('path')
const fs = require('fs')
const globby = require('globby')
const anymatch = require('anymatch')

const rimraf = require('rimraf')

const find = require('find')
const mv = require('mv')

const copyfiles = require('copyfiles')
const {exec} = require('child_process')
const log = target => {
  return target
}

function resolveComponents({platform: PLATFORM}) {
  const moduleName = '@mand-mobile/components'
  const join = root => path.join(root, 'src')
  const resovleModulesPath = R.compose(join, path.dirname, require.resolve)

  const isDirectory = filepath => {
    return fs.statSync(filepath).isDirectory()
  }

  const toUpperName = str => {
    return str.replace(/^\w/, match => match.toUpperCase()).replace(/-(\w)/g, (match, p1) => {
      return p1.toUpperCase()
    })
  }

  const componentNameMapper = item =>
    Object.assign(item, {
      path: `/${item.name}`,
      dashedStyledName: item.name,
      camelCaseStyledName: toUpperName(item.name),
    })

  // 从 @mand-mobile/components/src目录下获取所有组件所在目录
  const lsComponentsDirectories = dir =>
    R.compose(R.filter(isDirectory), R.map(filename => path.join(dir, filename)), fs.readdirSync)(dir)

  const loadComponent = dir => {
    const computedDemos = dir => {
      const skipAndOnlyStreagyFilterBuilder = files => {
        const onlyMatcher = '*-only?(.*).vue'
        const skipMatcher = '*-skip?(.*).vue'
        const hasOnlyTag = !!R.find(file => anymatch(onlyMatcher, file), files)
        return filename => {
          if (hasOnlyTag) {
            return anymatch(onlyMatcher, filename)
          }
          const mustSkip = anymatch(skipMatcher, filename)
          return !mustSkip
        }
      }
      const platformStreagyFilterBuilder = files => {
        const dic = R.reduce(
          (acc, ele) => {
            return {
              ...acc,
              [ele]: true,
            }
          },
          {},
          files,
        )
        return file => {
          let [name, platform, ext] = file.split('.')
          const match = /(.*)(?=(-skip|-only|$))/.exec(name)
          if (match) {
            name = match[1]
          }
          if (!ext) {
            // match index.vue
            ext = platform
            const result = R.reduce(
              (acc, ele) => {
                if (!acc) {
                  return acc
                }
                // 假设web平台构建
                // 当前目录下存在 index-only.web.vue index-skip.web.vue index.web.vue
                // 则不加载index.vue和index-skip.web.vue
                return !dic[`${name}${ele}.${PLATFORM}.${ext}`]
              },
              true,
              ['-only', '-skip', ''],
            )
            return result
          } else {
            //match index.web.vue index.uni.vue.. index.[platform].vue
            return platform === PLATFORM
          }
        }
      }

      if (fs.existsSync(`${dir}/demo/cases`)) {
        // return fs.readdirSync(`${dir}/demo/cases`).filter((filename) => /\.vue$/.test).map(filename => path.basename(filename, '.vue'))
        const files = fs.readdirSync(`${dir}/demo/cases`)
        const skipFilter = skipAndOnlyStreagyFilterBuilder(files)
        const platformFilter = platformStreagyFilterBuilder(files)
        return R.compose(R.filter(platformFilter), R.filter(skipFilter))(files)
      }
      return []
    }
    const componentName = path.basename(dir)
    let componentMeta
    try {
      componentMeta = require(`${dir}/component.js`)
    } catch (error) {
      componentMeta = {
        name: componentName,
      }
    }
    const result = Object.assign({}, componentMeta, {
      demoCases: computedDemos(dir),
    })
    return result
  }
  return R.compose(R.map(componentNameMapper), R.map(loadComponent), lsComponentsDirectories, resovleModulesPath)(
    moduleName,
  )
}

function renderComponents({platform, target, done}) {
  const fileFilter = () => {}

  const moduleName = '@mand-mobile/components'
  const join = root => path.join(root, 'src')
  const inputPath = R.compose(join, path.dirname, require.resolve)(moduleName)

  const fileGlobs = `/${inputPath}/*/*.*`

  const noop = () => {}

  copyfiles(
    [fileGlobs, target],
    {
      // 从后向前取两级目录，/componets/src/*/a.vue保留到 */a.vue这两级
      up: -2,
    },
    () => {
      const matcher = new RegExp(`\\.${platform}\\.(js|vue|ts)$`)
      find.file(matcher, target, function(files) {
        files.forEach(fileSpecificPlatform => {
          const dir = path.dirname(fileSpecificPlatform)
          const ext = path.extname(fileSpecificPlatform)

          const basename = path.basename(fileSpecificPlatform, `.${platform}${ext}`)

          const singleFilematcher = new RegExp(`${basename}(\\..*)?\\${ext}$`)

          find.file(singleFilematcher, dir, files => {
            files.forEach(file => {
              if (file === fileSpecificPlatform) {
                return
              }
              rimraf.sync(file)
            })

            files.forEach(file => {
              if (file === fileSpecificPlatform) {
                mv(fileSpecificPlatform, `${dir}/${basename}${ext}`, {mkdirp: true}, function(err) {})
              }
            })
          })
        })
      })
    },
  )
}

const resolveCategory = components => {
  const category = [
    {name: 'Basic', category: 'basic', text: '基础组件'},
    {name: 'Business', category: 'business', text: '业务组件'},
    {name: 'Feedback', category: 'feedback', text: '操作反馈'},
    {name: 'Form', category: 'form', text: '表单'},
  ]

  const filter = R.filter(component => component.demoCases && component.demoCases.length > 0)
  const group = R.groupBy(R.prop('category'))

  const categoryMap = R.compose(group, filter)(components)

  computeCategoryItem = item => {
    return Object.assign(item, {
      list: categoryMap[item.category],
    })
  }
  return R.map(computeCategoryItem)(category)
}

const commonTemplateResolver = filepath => path.resolve(__dirname, 'template/common', filepath)

function extractCallDir() {
  // extract api.$renderPartial() callsite file location using error stack
  const obj = {}
  Error.captureStackTrace(obj)
  const callSite = obj.stack.split('\n')[3]
  const fileName = callSite.match(/\s\((.*):\d+:\d+\)$/)[1]
  return path.dirname(fileName)
}

module.exports = api => {
  //web preview
  const {platform, target, 'component-name': componentName} = api.options

  if (!platform) {
    throw new Error(`ValidError!, `)
  }
  const components = resolveComponents({
    platform,
  })
  const category = resolveCategory(components)

  api.context = Object.assign({}, api.context, {
    components,
    category,

    MAND_INPUT_DIR: process.env.MAND_INPUT_DIR || '.mand-mobile',
  })
  api.utils = Object.assign({}, {commonTemplateResolver}, api.utils)

  api.$renderPartial = function renderPartial(target, source, additionalData, ejsOptions) {
    const baseDir = extractCallDir()

    source = path.resolve(baseDir, source)
    const _files = globby.sync(['**/*'], {cwd: source})
    const renderTarget = {}

    _files.forEach(rawPath => {
      // 输出路径使用 相对于pwd的相对路径
      const targetPath = path.join(target, rawPath)

      const sourcePath = path.resolve(source, rawPath)

      renderTarget[targetPath] = sourcePath
    })

    api.render(renderTarget, additionalData, ejsOptions)
  }

  api.$renderComponents = renderComponents

  // api.$createFilterComponents = function componentFilter(componet, ) {
  //   const compoentFile =
  // }

  const generator = require(`@mand-mobile/platform/src/${platform}/builder/generator`)

  return generator(api)
}
