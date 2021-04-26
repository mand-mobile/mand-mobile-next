---
title: PlatformBuilder
name: platform-builder
permalink: /packages/modules/platform-builder
---

## 介绍

Platform Builder 是一个抽象的构建容器，可快速拓展面向多个平台（Vue2.0, Vue3.0, Uniapp, Hummerjs等）的构建能力，可结合[Platform Runtime](/mand-mobile/packages/modules/platform-builder/)将一套基于Vue DSL的组件模板面向特定的运行平台构建产出，并可基于约定的插件、模板、配置增强构建能力。

多平台的插件、模板、配置所在目录是基于约定的，所以通常目录结构看起来像下面这样：

```sh
platform
  ├── web                   # web平台
    ├── preview             # 预览动作
      ├── plugin            # 插件目录，内部的插件会在Builder初始化时自动集成
        ├── index.js
        └── ... 
      ├── template          # 模板目录，内部的模板文件会在Builder初始化时自动复制到设定的中间态构建目录
        └── ... 
      └── builder.config.js # 配置文件
    └── install             # 编译动作
      ├── plugin     
      └── template   
  ├── uni                   # uni平台
  └── ...                   # 其它
```

## 核心API

### Builder

抽象构建容器类，用于创建一个面向特定平台及构建动作的（preview，install）的构建实例，并可基于约定的插件和模板增强构建能力。

`Builder(context: string, options: object)`

* context 
  构建对象的工程路径，一般可直接使用`process.cwd()`

- options
  - platform：平台标识（web，uniapp）
  - service：构建动作标识（preview，install）
  - platformPath：平台配置路径，一般包含不同平台和不同构建动作下的插件，模板，配置等

### run

`run(command: string, args?: object, rawArgv?: any[])`

:::tip
一般可结合Vue CLI的自定义命令使用。
:::

```js
// vue-cli command md-preview 
import Builder from '@mand-mobile/platform-builder'

export = (api: any) => async (args: any, rawArgv: any) => {
  const builder = new Builder(process.cwd(), {
    platform: args.platform,
    service: 'preview',
    platformPath: '~@mand-mobile/platform-builder/platform'
  })
  builder.run('serve', args, rawArgv)
}
```

## 插件

插件能够为Builder添加额外的功能，这些功能包括：

- 为构建实例添加新的命令
- 为构建实例添加软链
- 为构建实例动态添加模板，如调试单个组件时，根据指定的特定的组件，动态生成用于该组件调试的demo

```js
module.exports = function (api, options) {
  api.registerCommand('serve', (args, rawArgv) => {
    console.log('start serve...')
  })
}
```

### api

* registerCommand(command: string, handler: Function(args, rawArgv))

  添加新的命令

* registerTemplate(template: string, renderAs: string, templateData?: any, ignores?: string[])

  添加模板

  - template：模板目录或文件路径
  - renderAs：模板渲染路径
  - templateData：模板渲染数据
  - ignores：模板渲染时需跳过的文件路径

* registerLinks(source: string, target: string)

  添加软链

  - source：源目录或文件路径
  - renderAs：目标目录或文件路径

* setContext(key: string, val: any) 

  设置构建上下文

### options

* target：构建目标，当构建单个组件时有值，构建全部组件时为空
* platform：构建平台
* service：构建动作
* context：构建上下文
* projectDir：中间态构建目录
* projectOptions：构建配置（`builder.config.js`）

## 模板

特定构建平台和构建动作中的模板文件会在Builder初始化时被自动渲染（使用[EJS](https://github.com/mde/ejs)）到中间态构建目录中，如果有动态渲染模板的逻辑可在插件中配置

## 配置

特定构建平台和构建动作目录中的`builder.config.js`用于设置Builder的构建行为和Vue CLI的配置

* tempDir: 中间态构建目录，默认为`__temp__`
* outputDir: 构建产出静态文件目录，默认为`dist`
* componentPath: component源码所在目录 支持绝对路径、相对路径和依赖包(以~开头)，默认为`~@mand-mobile/components/src`
* mainEntry: 构建入口文件，默认为`main.js`
* vueOptions: [Vue CLI 配置](https://cli.vuejs.org/zh/config/#%E5%85%A8%E5%B1%80-cli-%E9%85%8D%E7%BD%AE)


