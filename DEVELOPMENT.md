# Mand Mobile 贡献者说明

## 开发准备

开发者需要[Nodejs](https://nodejs.org/en/) 12+ 和[yarn](https://yarnpkg.com/en/docs/install)

克隆本仓库后，在项目根目录下执行 

```sh
$ npm run bootstrap
```

### 提交代码

提交代码需要遵守`commit 提交规范`用于自动生成changelog。如果对提交规范不够熟悉，可以在项目根目录下使用`npm run cz`替代`git commit `, 我们会使用一个交互式命令行工具`commitizen`协助你生成规范的`commit message`

### 通用NPM scripts介绍

```sh
# 启动工程, 安装依赖
$ npm run bootstrap

# 构建vue-cli-plugin
$ lerna run --scope vue-cli-plugin-mand-mobile-builder build

# 调试工程， 可在最后输入组件名称用于调试单个组件
$ npm run serve [button-name]

# 发布预发(非稳定)包
$ npm run pub:prerelease

# 发布正式包
$ npm run pub
```

:tipping_hand_man:默认在`packages/mand-mobile/dist/development/mp-weixin`目录下进行uni组件的调试和预览

## 项目结构

- `packages`: Mand Mobile V3.0采用基于lerna 的多包管理方案，此目录下用于存放所有工程源码，包括组件源码、平台源码、工程化脚本和通用工具类和样式
  - `mand-mobile`: 最终交付给应用开发者的主包，此目录不包括任何源代码，仅用于生成并发布应用开发者所需要的构建产物
  - `mand-mobile-components`: 组件源代码
    - `src`:
      - `[componnent-name]`: 即组件工程目录，需要以`-`分割目录名称，目录名不允许出现大写字母
        - `component.json`: 组件元信息，用于记录开发者，组件名称等相关信息
        - `index.vue`: 组件源码
        - `demos`: 组件的示例代码
          - `cases`: 存放组件示例, 此目录下每个文件组要遵循命名规范`index[No.].vue`
            - index0.vue
            - index1.vue
            - ....
  - `mand-mobile-platform`: 平台相关代码
    - `lib`: 用于存放所有平台相关的资源、模板和驱动命令
      - `web`: 用于存放web相关的api、平台类库、构建模板、构建命令
        - `builder`: 用于存放构建期所需要的模板和命令
          - `generator`
            - `index.js`: 渲染模板逻辑入口
            - `templates`:模板目录，存放构建时所需要的ejs模板
          - `command`
            - `build.js`: 构建打包逻辑
            - `serve.js`: 开发预览命令
        - `runtime`: 存放和平台相关的运行时代码
          - components
          - 
      -  `uni`: 用于存放uni构建微信小程序所需要的api、平台类库、构建模板、构建命令
        - ...同web
  - `mand-mobile-shared`: 提供通用的样式、mixin、js utils和相关静态资源
    - `mixin`: 通用的全局stylus mixins
    - `style`: 通用样式
    - `scroller`:运行时所需要的scroller类库封装
    - `util`:组件运行时所需要的工具代码
  - `vue-cli-plugin-mand-mobile-builder`
    - `generator`: 工程类的模板代码和驱动逻辑，用于被`vue invoke`命令驱动编译模板
    - `src`: cli-plugin的主工程，用于被`vue-cli-service`驱动, 执行相应命令

## :warning: 迁移说明

- **引入类库方式变更**: 原有的`_mixin`,`_style`,`_scroller`,`_utils`迁移到`@mand-mobile/shared`目录下

- **引入平台代码**:用户涉及到平台相关代码，需要通过`@mand-mobile/platform/lib/runtime/xxx`进行引入，工程化脚本会根据所制定的平台从相应`platform`目录下进行引入

- **Demo开发过程中引入组件**: 原有的demo目录下通过`import Button from '../../index.vue'`或者`import Button from mand-mobile`引入组件的方式需要替换为`import Button from '@mand-mobile/compoents/src/button'`

- **引入组件**: 开发过程中不支持通过eg. `[Button.name]: Button`挂载组件

- 无需在`demos`目录下放置`index.vue`入口文件

  

