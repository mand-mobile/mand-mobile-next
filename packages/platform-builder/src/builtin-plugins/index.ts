import * as R from 'ramda'
import * as assert from 'assert'
import * as path from 'path'
import * as find from 'find'
import * as fs from 'fs-extra'
import anymatch from 'anymatch'
import { packagesResolver, resolveComponents, resolveCategory } from './../helper'
import { BuilderContainer } from './../index'
export { VueCliBuilderPlugin } from './plugin-vuecli-core'
export { VueCliBuilderUniPlugin } from './plugin-vuecli-uni'
export { RollupBuilderPlugin } from './plugin-rollup-core'
export { VueSFCBuilderPlugin } from './plugin-sfc-core'
export { VueifySFCBuilderPlugin } from './plugin-vueify-core'
const babelTransformPlatform = require('../babel-plugins/babel-transform-platform')
const validSet = new Set(['web', 'uni'])
/**
 * 设置环境变量
 */
export class PlatformSetupPlugin {
  private platform
  public static NS = 'platform-setup-plugin'
  private componentSource
  private removePlatformExt
  private watched
  private platformSource = ''
  private nameAs = 'platform-runtime'
  constructor({ platform, componentSource, platformSource = '', removePlatformExt = false, watched }) {
    assert.strictEqual(validSet.has(platform), true, `platform must in ${validSet.values()} `)
    this.platform = platform
    this.removePlatformExt = removePlatformExt
    this.platformSource = platformSource || packagesResolver('@mand-mobile/platform-runtime', 'lib')
    this.componentSource = componentSource || packagesResolver('@mand-mobile/components', 'src')

    this.watched = watched
  }
  apply(container: BuilderContainer) {
    if (this.platform) {
      // @Todo 实现setOptions API 用于设置上下文，提供给插件做能力检测
      // container.config.context.PLATFORM = this.platform
      container.hooks.extendsBabelConfig.tap(PlatformSetupPlugin.NS, (babelConfig) => {
        babelConfig.plugins = (babelConfig.plugins || []).concat([[babelTransformPlatform, { platform: this.platform }]])
      })

      container.hooks.setContext.tap(ComponentsSourceSetupPlugin.NS, context => {
        const components = resolveComponents({ componentSource: this.componentSource, platform: this.platform })
        const category = resolveCategory(components)
        context[PlatformSetupPlugin.NS] = {
          category,
          components,
        }
      })
      if (!this.watched) {
        container.hooks.addTemplates.tap(ComponentsSourceSetupPlugin.NS, template => {
          template.push([{ template: this.platformSource, renderer: this.nameAs }, {}])
        })
        // 非watched场景使用软链接方式注入到项目目录下
      } else {
        container.hooks.addLinks.tap(ComponentsSourceSetupPlugin.NS, linkpaths => {
          linkpaths.push({
            source: this.platformSource,
            target: this.nameAs
          })
        })
      }

      // 传入平台相关代码
      container.hooks.setAliasMapper.tap(ComponentsSourceSetupPlugin.NS, (aliasSet: Set<[string, string]>) => {
        aliasSet.add(['@mand-mobile/platform-runtime/lib', path.resolve(container.config.outputRoot, `${this.nameAs}/${this.platform}`)])
      })


      // 处理组件
      container.hooks.afterContainerCreated.tap(PlatformSetupPlugin.NS, () => {

        const compoentRoot = container.context[ComponentsSourceSetupPlugin.NS].componentRoot
        const fst = fs.statSync(compoentRoot)
        if (this.removePlatformExt && !fst.isSymbolicLink()) {
          const platform = this.platform || 'web'
          const files = find.fileSync(/\.(js|vue|ts)$/, compoentRoot)
          const filehandler = R.forEach((file: string) => {
            if (anymatch(`${compoentRoot}/**/demo/**`, file)) {
              return
            }
            const dirname = path.dirname(file)
            const basename = path.basename(file)
            const result = basename.split('.')
            if (result.length === 3 && result[1]) {
              if (result[1] === platform) {
                fs.moveSync(file, `${dirname}/${result[0]}.${result[2]}`, { overwrite: true })
              } else if (result[1] !== '') {
                fs.removeSync(file)
              }
            }
          })
          filehandler(files)
        }
      })

    }
  }
}

export class ComponentsSourceSetupPlugin {
  public static NS = 'component-src-setup-plugin'
  private watched
  private componentSource: string
  private nameAs
  constructor({ componentSource, watched = false, nameAs = 'mand-mobile' }) {
    this.watched = watched
    this.componentSource = componentSource || packagesResolver('@mand-mobile/components', 'src')
    this.nameAs = nameAs
  }
  apply(container: BuilderContainer) {

    container.hooks.setContext.tap(ComponentsSourceSetupPlugin.NS, (context) => {
      context[ComponentsSourceSetupPlugin.NS] = {
        componentRoot: path.resolve(container.config.outputRoot, this.nameAs)
      }
    })
    // 纯用于复制一份组件库文件到目标容器文件夹下
    if (!this.watched) {
      container.hooks.addTemplates.tap(ComponentsSourceSetupPlugin.NS, template => {
        template.push([{ template: this.componentSource, renderer: this.nameAs }, {}])
      })
      // 非watched场景使用软链接方式注入到项目目录下
    } else {
      container.hooks.addLinks.tap(ComponentsSourceSetupPlugin.NS, linkpaths => {
        linkpaths.push({
          source: this.componentSource,
          target: this.nameAs
        })
      })
    }

    container.hooks.setAliasMapper.tap(ComponentsSourceSetupPlugin.NS, (aliasSet: Set<[string, string]>) => {
      aliasSet.add(['mand-mobile/lib', path.resolve(container.config.outputRoot, this.nameAs)])
    })
  }
}


/**
 * 为简化逻辑，将postcss通用配置和stylus共用逻辑放到同一个插件内
 */
export class ThemeSetupPlugin {
  private NS = 'theme-setup-plugin'
  private stylusImports
  constructor({ themeSource }) {
    if (!themeSource) {
      themeSource = packagesResolver('@mand-mobile/shared', 'lib/style/mixin/theme.basic.styl')
    }
    this.stylusImports = R.prepend(themeSource, [
      packagesResolver('@mand-mobile/shared', 'lib/style/mixin/theme.components.styl'),
      packagesResolver('@mand-mobile/shared', 'lib/style/mixin/util.styl'),
    ])
  }

  apply(container: BuilderContainer) {
    container.hooks.extendsStylus.tap(this.NS, (stylusOptions) => {
      stylusOptions.imports = R.concat(this.stylusImports, (stylusOptions.imports || []))
      console.log(`set StylusOptions succeed, now options is ${stylusOptions}`)
    })

    container.hooks.extendsPostcssConfig.tap(this.NS, (postcssConfig) => {
      postcssConfig.plugins = (postcssConfig.plugins || []).concat([
        require('postcss-url')({ url: 'inline' }),
        require('cssnano')({
          preset: ['default', {
            zindex: false,
            mergeIdents: false,
            discardUnused: false,
            autoprefixer: false,
            reduceIdents: false,
          }]
        }),])
    })
  }
}
