import * as assert from 'assert'
import * as tapable from 'tapable'
import * as R from 'ramda'
import * as ejs from 'ejs'
import * as find from 'find'
import * as path from 'path'
import * as fs from 'fs-extra'

const stylus = require('stylus')
const execa = require('execa')
const {runGenerator} = require('@vue/cli/lib/invoke')


/** =========================================Constant Utils Segment========================================================== */

const WORKSPACE_DIRECTORY = process.cwd()



/** =========================================Common Utils Segment========================================================== */

/**
 * 
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
export function linkDir(sourceDir, targetDir) {
  execa('ln', [
    '-s',
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

  console.info(filename, options.root)
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


export async function renderFile(filename, data,opt?:{sourceRoot?, distRoot?}) {

  const {sourceRoot, distRoot, ...compileOptions} = opt

  const compiler = R.curry(compileFile)(R.__, data, {
    root: sourceRoot, 
    ...compileOptions,
  })

  const dister = R.curry(exportFile)(R.__, {root: distRoot})

  return R.composeP(dister, compiler)(filename)
}


/**
 * 
 * @param sourceRoot 
 * @param data 
 * @param options 
 */
export async function renderDir(sourceRoot, data?, opt?): Promise<unknown[]> {

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

/**
 * 批量渲
 */

/** =========================================渲染模板 Segment========================================================== */

export class TemplateGenerator {
  
  private options:{
    templatePath?: string,
    renderPath?: string,
    variables?: any,
  }

  private generator: any
  private ctx: string
  private plugin: any
  constructor(options = {}, ctx: string = process.cwd()) {
    this.ctx = ctx
    this.options = options
    this.plugin = {
      id: 'builder-core-builtin',
      apply: (api) => {
        console.info(`generator call called`, api)
      },
      options: {
        registry: false,
      }
    }
  }
  
  public async generate() {
    return runGenerator(this.ctx, [this.plugin])
  }
}


/** =========================================构造容器 Segment========================================================== */

export class BuilderContainer {

  private config: any = {
    stylus,
  }

  constructor(cfg: {
    template: TemplateGenerator,
    stylus?: any,
  }) {
    this.config = Object.assign({}, this.config, cfg)
  }

  public hooks: {[hookName: string]: tapable.Hook} = {
    chainWebpack: new tapable.SyncHook(['chain']),
    extendsBabelConfig: new tapable.SyncHook(['babelConfig']),
    extendsPostcssConfig: new tapable.SyncHook(['postcssConfig']),
    extendsStylus: new tapable.SyncHook(['stylus']),
    extendsPathMappings: new tapable.SyncHook(['linkCmd'])
  }

  private containerRef: string
  private cwd: string
  private template: any

  /**
   * 通过模板创建构建容器
   */
  public create() {

    this.config.template.renderer()

    this.hooks.extendsPathMappings.call(execa)
  }

  /**
   * 构建资源产物
   */
  public build() {
    const babelConfig = {}
    const postcssConfig = {}
    // @fixme 需要对stylus的重复配置做清空动作
    const stylus = this.config.stylus
    this.hooks.extendsStylus.call(stylus)
    this.hooks.extendsBabelConfig.call(babelConfig)
    this.hooks.extendsPostcssConfig.call(postcssConfig)
  }


  /**
   * 开启调试
   */
  public serve() {


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