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
export async function exportFile(renderInfo: {content: string, ctx: {filepath: string}}, opt: {root: string}): Promise<string> {

  const options = R.mergeRight({root: WORKSPACE_DIRECTORY}, opt)

  const dist = path.resolve(options.root, renderInfo.ctx.filepath)

  return fs.outputFile(dist, renderInfo.content, {encoding: 'utf8'}).then(() => dist)
}


export async function renderFile(filename, data, opt?:{sourceRoot?, distRoot?}) {

  const {sourceRoot, distRoot, ...compileOptions} = opt

  const compiler = R.curry(compileFile)(R.__, data, {
    root: sourceRoot, 
    ...compileOptions,
  })

  const dister = R.curry(exportFile)(R.__, {root: distRoot})

  return R.composeP(dister, compiler)(filename)
}


/**
 * 基于模板渲染文件夹
 * @param sourceRoot 
 * @param data 
 * @param options 
 */
export async function renderDir(sourceRoot, data?, opt?: {distRoot: string}): Promise<unknown[]> {

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

export class BuilderContainer {

  private config: {
    outputRoot?: string
  } = {}
  constructor(cfg?: any) {
    this.config = R.mergeRight(this.config, cfg)
  }

  public setConfig(config) {
    this.config = R.mergeRight(this.config, config)
  }

  public hooks = {

    addTemplates: new tapable.SyncHook(['templates']),
    addLinks: new tapable.SyncHook(['linkpaths']),

    chainWebpack: new tapable.SyncHook(['chain']),
    extendsBabelConfig: new tapable.SyncHook(['babelConfig']),
    extendsPostcssConfig: new tapable.SyncHook(['postcssConfig']),
    extendsStylus: new tapable.SyncHook(['stylus']),
    extendsPathMappings: new tapable.SyncHook(['linkCmd']),

    setBuildCmd: new tapable.SyncBailHook(['buildCmd']),
    setServeCmd: new tapable.SyncBailHook(['serveCmd']),
  }

  /**
   * 通过模板创建构建容器
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

    await Promise.all(R.map(([{template, renderer}, data = {}]) => {
      const distRoot: string = path.resolve(this.config.outputRoot, renderer)

      console.info(template, data, {distRoot})
      return renderDir(template, data, {distRoot})
    })(templates))

    await Promise.all(R.map(({source, target}) => {
      const distTarget: string = path.resolve(this.config.outputRoot, target)
      return linkDir(source, distTarget)
    })(linkpaths))
    
    return 
  }


  /**
   * temp 用于调试build方法，后边会抽象到钩子内
   * @param stylus 
   * @param babelConfig 
   * @param postcssConfig 
   */
  private async _build(stylus, babelConfig, postcssConfig) {

    const service = new Service(this.config.outputRoot)


    //@todo set mode process.env.VUE_CLI_MODE
    service.init()

    service.webpackChainFns.push((chain) => {
      this.hooks.chainWebpack.call(chain)
    })


    service.webpackChainFns.push((chain) => {
      const types = ['vue-modules', 'vue', 'normal-modules', 'normal']


      // 针对不同类型的stylus样式进行扩展传入的loader options

      R.forEach(type => chain.module.rule('stylus').oneOf(type).use('stylus-loader').tap(R.mergeLeft(stylus)))(types)


      // 设置用户需要的postcss options
      // @todo 需要放置plugins被多次合并覆盖
      R.forEach(type => chain.module.rule('postcss').oneOf(type).use('postcss-loader').tap(R.mergeLeft(postcssConfig)))(types)
      
      // 扩展babel配置
      // @todo 需要放置plugins被多次合并覆盖
      chain.module.rule('js').use('babel-loader').tap(R.mergeLeft(babelConfig))
    })

    // service.webpackRawConfigFns.push((webpackConfig) => {
    //   return merge(webpackConfig, chainWebpack.toConfig())
    // })
    return service.run('build', {}, []).catch(err => {

      console.error(err, 'error occured')

      // process.exit(1)
    })
  }

  /**
   * 构建资源产物
   */
  public build() {

    // 清空stylus上下文，保证每一次构建都是全新的stylus
    // delete require.cache['stylus']
    const stylus = {}
    const babelConfig = {}
    const postcssConfig = {}

    // @fixme 需要对stylus的重复配置做清空动作
    this.hooks.extendsStylus.call(stylus)
    this.hooks.extendsBabelConfig.call(babelConfig)
    this.hooks.extendsPostcssConfig.call(postcssConfig)
  
    return this._build(stylus, babelConfig, postcssConfig)
  }


  /**
   * 开启调试
   */
  public serve() {}

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