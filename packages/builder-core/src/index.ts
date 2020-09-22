import * as assert from 'assert'
import * as tapable from 'tapable'
import * as R from 'ramda'
import * as ejs from 'ejs'
import * as find from 'find'
import * as path from 'path'
import * as fs from 'fs-extra'

const Service = require('@vue/cli-service')
const execa = require('execa')
const merge = require('webpack-merge')
const Config = require('webpack-chain')

/** =========================================Vue Service Segment========================================================== */



/** =========================================Constant Utils Segment========================================================== */

const WORKSPACE_DIRECTORY = process.cwd()


/** =========================================Renderer Utils Segment========================================================== */

/**
 * 超时机制封装
 * @param timeout 超时时间
 */
const timeout = (timeout: number = 500) => new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error(`[Builder Core] exec async operation timeout!`)), timeout)
})

/**
 * 创建软链接目录
 * @param sourceDir 
 * @param targetDir 
 */
export function linkDir(sourceDir, targetDir): Promise<void> {
  return execa('ln', [
    '-sfn',
    sourceDir,
    targetDir,
  ])
}

/**
 * 模板渲染方法
 * @param filename 
 * @param data 
 * @param options 
 * @param options.timeout 模板编译超时时间 模式500ms
 * @param options.root 如果指定了root，在上下文中返回路径信息
 */
export function compileFile(filename: string, data: any, opt?): Promise<{content: string, ctx: {filepath: string}}> {

  const options = R.mergeRight({timeout: 500, root: '/'}, opt)

  const filepath = path.relative(options.root, filename)
  // 存在相对路径，标识root目录不是文件的父目录, 抛出错误
  if (filepath.startsWith('..')) {
    throw new assert.AssertionError({
      actual: filepath,
      expected: 'it should rendered without .. prefix'
    })
  }

  const resolver =  new Promise((resolve, reject) => {
    ejs.renderFile(filename, data, options, (err, str) => {
      if (err) {
        reject(err)
      }
      resolve({
        content: str,
        ctx: {
          filepath,
          root: options.root,
        }
      })
    })
  })

  return Promise.race([resolver, timeout(options.timeout) as any])
}


/**
 * 基于模板文件导出结果
 * @param str 
 * @param target 
 * @param options 
 * @param options.root
 */
export async function exportFile(renderInfo: {content: string, ctx: {filepath: string}}, opt: {root: string, renderAs?: string}): Promise<string> {

  const options = R.mergeRight({root: WORKSPACE_DIRECTORY}, opt)

  const dist = path.resolve(options.root, opt.renderAs || renderInfo.ctx.filepath)

  return fs.outputFile(dist, renderInfo.content, {encoding: 'utf8'}).then(() => dist)
}


export async function renderFile(filename, data, opt?:{sourceRoot?, distRoot?, renderAs?}) {

  const {sourceRoot, distRoot, renderAs, ...compileOptions} = opt

  const compiler = R.curry(compileFile)(R.__, data, {
    root: sourceRoot, 
    ...compileOptions,
  })

  const dister = R.curry(exportFile)(R.__, {root: distRoot, renderAs})


  return R.composeP(dister, compiler)(filename)
}


/**
 * 基于模板渲染文件夹
 * @param sourceRoot 
 * @param data 
 * @param options 
 */
export async function renderDir(sourceRoot, data?, opt?: {distRoot: string}): Promise<any> {

  const options = R.mergeRight({
    distRoot: WORKSPACE_DIRECTORY
  }, opt)

  const files: string[] =  await new Promise((res, rej) => {
    find
      .file(sourceRoot, (files: string[]) => {
        res(files)
      })
  })

  const renderer = R.curry(renderFile)(R.__, data, {sourceRoot, distRoot: options.distRoot})
  
  return Promise.all(R.map(renderer)(files))
}


/** =========================================Resolver Utils Segment========================================================== */


export async function platformResolver() {

}


/** =========================================构造容器 Segment========================================================== */

export interface IMandPlugins {

  apply(container: BuilderContainer): void

  // 如果插件内实现了以下三个方法，则不执行BuilderContainer本身的 create, serve, build方法，改为使用插件实现的相关的方法，
  // BuilderContainer 的config.plugins是一个数组，则后边的plugins.create|serve|build方法会覆盖前面的.
  create?: (config, container: BuilderContainer) => Promise<void>
  serve?: (config, container: BuilderContainer) => Promise<void>
  build?: (config, container: BuilderContainer) => Promise<void>

}

export interface IContainerConfig {
  outputRoot?: string,
  artifactRoot?: string,
  plugins?: any[]
}

export class BuilderContainer {

  private _config: {
    outputRoot?: string
  } = {}

  get config(): IContainerConfig {
    return this._config
  }


  public hooks = {

    addTemplates: new tapable.SyncHook(['templates']),
    addLinks: new tapable.SyncHook(['linkpaths']),

    // 当容器创建完成之后执行相关操作
    afterContainerCreated: new tapable.SyncHook([]),

    extendsBabelConfig: new tapable.SyncHook(['babelConfig']),
    extendsPostcssConfig: new tapable.SyncHook(['postcssConfig']),
    extendsStylus: new tapable.SyncHook(['stylus']),
    extendsPathMappings: new tapable.SyncHook(['linkCmd']),

    setBuildTasks: new tapable.AsyncParallelHook(['configures']),
    setServeTasks: new tapable.AsyncParallelHook(['configures']),
  }

  private internalCommand: {
    create?: (config: any, container) => void
    build?: (config: any, container) => void
    serve?: (config: any, container) => void
  } = {}

  constructor(cfg: any = {
    outputRoot: '',
    artifactRoot: '',
    plugins:  []
  }) {
    this._config = R.mergeRight(this.config, cfg)

    const plugins = cfg.plugins || []

    R.forEach(([plugin, pluginOptions = {}]) => {

      if (plugin instanceof Function) {
        plugin = new plugin(pluginOptions)
      }

      // 为构建容器注册插件
      plugin.apply(this)

      // plugins里最后一个实现了相关方法的plugin会生效
      plugin.create && (this.internalCommand.create = plugin.create.bind(plugin))
      plugin.build && (this.internalCommand.build = plugin.build.bind(plugin))
      plugin.serve && (this.internalCommand.serve = plugin.serve.bind(plugin))

    })(plugins)

  }

  /**
   * 
   */
  public async create(): Promise<void> {

    const templates: Array<[{
      template,
      renderer,
    }, {[prop: string]: any}]> = [] 

    type source = string
    type target = string
    const linkpaths: Array<[source, target]> = []

    this.hooks.addTemplates.call(templates)
    this.hooks.addLinks.call(linkpaths)


    // 如果插件实现了命令，则优先调用
    if (this.internalCommand.create) {
      return this.internalCommand.create({templates, linkpaths}, this) 
    }

    await Promise.all(R.map(([{template, renderer}, data = {}]) => {
      if (fs.statSync(template).isFile()) {
        return renderFile(template, data, {sourceRoot: '/', distRoot: this.config.outputRoot, renderAs: renderer})
      } else {
        const distRoot: string = path.resolve(this.config.outputRoot, renderer)
        return renderDir(template, data, {distRoot})
      }
    })(templates))

    await Promise.all(R.map(({source, target}) => {
      const distTarget: string = path.resolve(this.config.outputRoot, target)
      return linkDir(source, distTarget)
    })(linkpaths))
    

    // 容器创建成功后进行对于容器文件进行二次加工
    this.hooks.afterContainerCreated.call()

    return 
  }

  /**
   * 构建资源产物
   */
  public async build() {

    // 清空stylus上下文，保证每一次构建都是全新的stylus
    // delete require.cache['stylus']
    const stylusConfig = {}
    const babelConfig = {}
    const postcssConfig = {}

    // @fixme 需要对stylus的重复配置做清空动作
    this.hooks.extendsStylus.call(stylusConfig)
    this.hooks.extendsBabelConfig.call(babelConfig)
    this.hooks.extendsPostcssConfig.call(postcssConfig)
    
    // 如果插件实现了命令，则优先调用
    if (this.internalCommand.build) {
      return this.internalCommand.build({babelConfig, postcssConfig, stylusConfig}, this) 
    }
    return this.hooks.setBuildTasks.promise({babelConfig, postcssConfig, stylusConfig})
  }


  /**
   * 开启调试
   */
  public async serve() {
    const stylusConfig = {}
    const babelConfig = {}
    const postcssConfig = {}

    // @fixme 需要对stylus的重复配置做清空动作
    this.hooks.extendsStylus.call(stylusConfig)
    this.hooks.extendsBabelConfig.call(babelConfig)
    this.hooks.extendsPostcssConfig.call(postcssConfig)

    // 如果插件实现了命令，则优先调用
    if (this.internalCommand.serve) {
      return this.internalCommand.serve({babelConfig, postcssConfig, stylusConfig}, this) 
    }
    return this.hooks.setServeTasks.promise({babelConfig, postcssConfig, stylusConfig})
  }

  /**
   * 对构建产物和构建容易进行清理
   */
  public clean() {}
  
}

/** =========================================驱动类 Segment========================================================== */


/**
* 提供给vue-cli使用的调度器,需要有以下责任
* - 提供container缓存
*/
abstract class BuilderDevice {
  run(env, args) {
  	// const container = containerFactory()
    // if (cache && openCache === true) { // container.exec('balabala')
    // }
  }  
} 