import * as tapable from 'tapable'

const stylus = require('stylus')
const execa = require('execa')
const Generator = require('@vue/cli/lib/Generator')
const invoke = require('@vue/cli/lib/invoke')
const readFiles = require('@vue/cli/lib/util/readFiles')

/** =========================================Common Utils Segment========================================================== */

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

/** =========================================渲染模板 Segment========================================================== */

export class TemplateGenerator {
  
  private options:{
    templatePath: string,
    renderPath: string,
    variables: any,
  }

  private generator: any

  constructor(options, ctx: string = process.cwd()) {
    const afterAnyInvokeCbs = []
    const afterInvokeCbs = []
    
    this.options = options
    const plugin = {

    }

  }
  
  public generate() {
    
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