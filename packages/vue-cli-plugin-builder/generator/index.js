const R =  require('ramda')
const path = require('path')
const fs = require('fs'); 
const globby = require('globby')
const log = (target) => {console.info(target, 'debug log');return target}

function resolveComponents() {

  const moduleName = '@mand-mobile/components'
  const join = (root) => path.join(root, 'src')
  const resovleModulesPath = R.compose(join, path.dirname, require.resolve)

  const isDirectory = (filepath) => {
    return fs.statSync(filepath).isDirectory()
  }

  const toUpperName = (str) => {
    return str
            .replace(/^\w/, (match) => match.toUpperCase())
            .replace(/-(\w)/g, (match, p1) => {
              return p1.toUpperCase()
            })
  }

  const componentNameMapper = item => Object.assign(item, {
      path: `/${item.name}`,
      dashedStyledName: item.name,
      camelCaseStyledName: toUpperName(item.name),
    })

  // 从 @mand-mobile/components/src目录下获取所有组件所在目录
  const lsComponentsDirectories = dir => R.compose(R.filter(isDirectory),R.map((filename) => path.join(dir, filename)), fs.readdirSync)(dir)
  
  const loadComponent = (dir) => {
    const computedDemos = dir => {
      if (fs.existsSync(`${dir}/demo/cases`)) {
        return fs.readdirSync(`${dir}/demo/cases`).filter((filename) => /(,.)\.vue$/.test).map(filename => path.basename(filename, '.vue'))
      }
      return ([])
    }
    const componentName = path.basename(dir)
    let componentMeta
    try {
      componentMeta = require(`${dir}/component.js`)
    } catch (error) {
      componentMeta = {
        name: componentName
      }
    }
    const result =  Object.assign({}, componentMeta, {
      demoCases: computedDemos(dir),
    })
    return result
  }
  return R.compose(R.map(componentNameMapper), R.map(loadComponent), lsComponentsDirectories, resovleModulesPath)(moduleName)
}


const resolveCategory = (components) => {
  const category = [
    {name: 'Basic', category: 'basic', text: '基础组件'},
    {name: 'Business', category: 'business', text: '业务组件'},
    {name: 'Feedback', category: 'feedback', text: '操作反馈'},
    {name: 'Form', category: 'form', text: '表单'}, 
  ]

  const filter = R.filter((component) => component.demoCases && component.demoCases.length > 0)
  const group = R.groupBy(R.prop('category'))
  

  const categoryMap = R.compose(group, filter)(components)

  computeCategoryItem = (item) => {
    return Object.assign(item, {
      list: categoryMap[item.category]
    })
  }
  return R.map(computeCategoryItem)(category)
}

const commonTemplateResolver = (filepath) => path.resolve(__dirname, 'template/common', filepath)


function extractCallDir () {
  // extract api.$renderPartial() callsite file location using error stack
  const obj = {}
  Error.captureStackTrace(obj)
  const callSite = obj.stack.split('\n')[3]
  const fileName = callSite.match(/\s\((.*):\d+:\d+\)$/)[1]
  return path.dirname(fileName)
}

module.exports = (api) => {
  //web preview
  const {
    platform, 
    target, 
    'component-name': componentName} = api.options
  const components = resolveComponents()  
  const category = resolveCategory(components)
  

  api.context = Object.assign({}, api.context, {
    components, 
    category,

    MAND_INPUT_DIR: process.env.MAND_INPUT_DIR || '.mand-mobile'
  })
  api.utils = Object.assign({}, {commonTemplateResolver}, api.utils)
  
  api.$renderPartial = function renderPartial(target, source, additionalData, ejsOptions) {
    const baseDir = extractCallDir()

    source = path.resolve(baseDir, source)
    const _files = globby.sync(['**/*'], { cwd: source })
    const renderTarget = {}

    _files.forEach(rawPath => {
      // 输出路径使用 相对于pwd的相对路径
      const targetPath = path.join(target, rawPath)
      
      const sourcePath = path.resolve(source, rawPath)

      renderTarget[targetPath] = sourcePath
    })
    
    api.render(renderTarget, additionalData, ejsOptions)
  }

  const generator = require(`@mand-mobile/platform/lib/${platform}/builder/generator`)
  
  return generator(api)
}