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

/** -----------------------------------------utils --------------------------------------------------------- */

export const packagesResolver = R.curry((componentName, suffix) => path.join(path.dirname(require.resolve(componentName)), suffix))


/** -----------------------------------------Component Helpers --------------------------------------------------------- */


interface IComponents {
  path: string,

  name: string,
  dashedStyledName: string,
  camelCaseStyledName: string,
  text: string,
  
  category: string,
  description: string,
  author: string,
}

/**
 * 
 * @param Options
 * @param Options.platfrom [web|uni]
 * @param Options.componentSOurce [web|uni]
 *  
 */

export function resolveComponents({platform: PLATFORM, componentSource}): Array<IComponents> {

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
    const result = R.mergeRight(componentMeta, {demoCases: computedDemos(dir)})
    return result
  }
  return R.compose(R.map(R.compose(componentNameMapper)), R.map(loadComponent), lsComponentsDirectories)(componentSource)
}

export function renderComponents({platform, target, done}) {
  const moduleName = '@mand-mobile/components'
  const join = root => path.join(root, 'src')
  const inputPath = R.compose(join, path.dirname, require.resolve)(moduleName)
  const fileGlobs = `/${inputPath}/*/*.*`

  copyfiles(
    [fileGlobs, target],
    {
      // 从后向前取两级目录，/componets/src/*/a.vue保留到 src/*/a.vue这两级
      up: -3,
    },
    () => {
      // const matcher = new RegExp(`\\.${platform}\\.(js|vue|ts)$`)
      find.file(/\.(js|vue|ts)$/, target, function(files) {
        files.forEach(file => {
          const dirname = path.dirname(file)
          const basename = path.basename(file)

          const result = basename.split('.')

          if (result.length === 3 && result[1]) {
            if (result[1] === platform) {
              mv(file, `${dirname}/${result[0]}.${result[2]}`, {mkdirp: true}, err => {})
            } else if (result[1] !== '') {
              rimraf.sync(file)
            }
          }
        })
      })
    },
  )
}

export const resolveCategory = components => {
  const category = [
    {name: 'Basic', category: 'basic', text: '基础组件'},
    {name: 'Business', category: 'business', text: '业务组件'},
    {name: 'Feedback', category: 'feedback', text: '操作反馈'},
    {name: 'Form', category: 'form', text: '表单'},
  ]

  const filter = R.filter(component => component.demoCases && component.demoCases.length > 0)
  const group = R.groupBy(R.prop('category'))

  const categoryMap = R.compose(group, filter)(components)

  const computeCategoryItem = item => {
    return Object.assign(item, {
      list: categoryMap[item.category],
    })
  }
  return R.map(computeCategoryItem)(category)
}

// const commonTemplateResolver = filepath => path.resolve(__dirname, 'template/common', filepath)


// 获取调用函数的文件名
// function extractCallDir() {
//   // extract api.$renderPartial() callsite file location using error stack
//   const obj: any = {}
//   Error.captureStackTrace(obj)
//   const callSite = obj.stack.split('\n')[3]
//   const fileName = callSite.match(/\s\((.*):\d+:\d+\)$/)[1]
//   return path.dirname(fileName)
// }


export const chainExtendsHandler = ({stylusConfig, postcssConfig, babelConfig}) => (chain) => {
  const types = ['vue-modules', 'vue', 'normal-modules', 'normal']

  // 针对不同类型的stylus样式进行扩展传入的loader options
  R.forEach(type => chain.module.rule('stylus').oneOf(type).use('stylus-loader').tap(R.mergeLeft(stylusConfig)))(types)

  // 设置用户需要的postcss options
  // @todo 需要放置plugins被多次合并覆盖
  R.forEach(type => chain.module.rule('postcss').oneOf(type).use('postcss-loader').tap(R.mergeLeft(postcssConfig)))(types)

  // 扩展babel配置
  // @todo 需要放置plugins被多次合并覆盖
  chain.module.rule('js').use('babel-loader').tap(R.mergeLeft(babelConfig))
}