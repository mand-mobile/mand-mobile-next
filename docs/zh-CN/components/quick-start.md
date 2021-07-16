# 快速开始

[![npm](https://img.shields.io/npm/v/mand-mobile-next.svg)](https://www.npmjs.org/package/mand-mobile-next) [![Open in Visual Studio Code](https://open.vscode.dev/badges/open-in-vscode.svg)](https://open.vscode.dev/mand-mobile/mand-mobile-next)[![build](https://github.com/mand-mobile/mand-mobile-next/actions/workflows/build.yml/badge.svg?branch=vue3)](https://github.com/mand-mobile/mand-mobile-next/actions)  

## 安装

快速开始最好的方式就是使用 `vite` 初始化项目工程，添加 `mand-mobile-next` 即可。

**使用 npm：**

```bash
npm init @vite/app
```

选择 `vue-ts`，初始化工程

**安装 `mand-mobile-next`**

```bash
npm i mand-mobile-next@alpha
# or
yarn add mand-mobile-next@alpha
```

## 使用

#### 全量引入

在 `main.ts` 写入一下内容

```typescript
import { createApp } from 'vue'
import MandMobile from 'mand-mobile-next';
import 'mand-mobile-next/dist/es/mand-mobile-next.min.css';
import App from './App.vue';

const app = createApp(App)
app.use(MandMobile)
app.mount('#app')
```

#### 按需引入

**在 `vite` 中按需引入**

首先，安装 `vite-plugin-style-import`:

```bash
npm install vite-plugin-style-import -D
#or
yarn add vite-plugin-style-import -D
```

然后修改 `vite.config.ts`:

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'

export default defineConfig({
  plugins: [
    vue(),
    styleImport({
      libs: [{
        libraryName: 'mand-mobile-next',
        esModule: true,
        ensureStyleFile: true,
        resolveStyle: (name) => {
          return `mand-mobile-next/dist/es/${name}/index.css`;
        },
        resolveComponent: (name) => {
          return `mand-mobile-next/dist/es/${name}`;
        },
      }]
    })
  ]
})
```

接下来，如果你只希望引入部分组件，比如 Button，需要在 main.js 中写入以下内容：

```ts
import { createApp } from 'vue'
import { Button } from 'mand-mobile-next';
import App from './App.vue';

const app = createApp(App)
app.component(Button.name, Button);

/* or
 * app.use(ElButton)
 * app.use(ElSelect)
 */

app.mount('#app')
```

或者直接在组件中使用：

```ts
import { Button } from 'mand-mobile-next';

export default {
  components: {
    MdButton: Button,
  }
}
```

## 自定义主题

Mand mobile next 采用 CSS [var](https://developer.mozilla.org/zh-CN/docs/Web/CSS/var) 实现主题切换，用户可以通过下面的方式实现自定义主题。

- 在 `main.ts` 中：

```ts
import { useCssVar } from 'mand-mobile-next/dist/es/composable'

const themeVars ={
  '--md-color-primary': '#f44336',
}

useCssVar(themeVars)
```

- 在组件 `setup` 中

```vue
<script setup ts>
import { useCssVar } from 'mand-mobile-next/dist/es/composable'
import { ref } from 'vue'

const themeVars = ref({
  '--md-color-primary': '#f44336',
})

useCssVar(themeVars)
</script>
```

#### 基础变量

```css
/// Brand Color
--md-color-primary           : #4280EB // 品牌色

/// Text Color
--md-color-text-base         : #111A34 // 重要信息，如一级标题
--md-color-text-base-inverse : #FFF
--md-color-text-body         : #41485D // 普通信息，如正文主要内容
--md-color-text-minor        : #666f83 // 次要信息，如利益点、摘要
--md-color-text-caption      : #858B9C // 辅助信息，如列表内容描述
--md-color-text-disabled     : #C5CAD5 // 禁用状态
--md-color-text-placeholder  : #C5CAD5 // 默认提示输入或占位
--md-color-text-highlight    : --md-color-primary // 高亮状态
--md-color-text-warn         : #FF7D41 // 利益点，警告提示
--md-color-text-error        : #FF5257 // 强提示报错
--md-color-text-link         : #5878B4 // 文字链接

/// Border & Background Color
--md-color-border-base       : #E2E4EA // 条目边框
--md-color-border-element    : #C5CAD5 // 元素边框，如按钮
--md-color-bg-base           : #F9FAFB // 元素，容器背景
--md-color-bg-inverse        : #FFF
--md-color-bg-disabled       : #E2E4EA // 禁用元素背景
--md-color-bg-tap            : #F9FAFB // 条目点击态
--md-color-mask              : rgba(37, 38, 45, .7) // 弹窗蒙层

/// Text Size
--md-font-heading-large  : 60px
--md-font-heading-medium : 52px
--md-font-heading-normal : 44px
--md-font-caption-large  : 36px
--md-font-caption-normal : 32px
--md-font-body-large     : 28px
--md-font-body-normal    : 26px
--md-font-minor-large    : 24px
--md-font-minor-normal   : 20px

--md-font-weight-light    : 300
--md-font-weight-normal   : 400
--md-font-weight-medium   : 500
--md-font-weight-semibold : 600

/// Radius Size
--md-radius-normal : 8px
--md-radius-circle : 50%

/// Border Size
--md-border-width-base : 2px

/// Spacing size
--md-h-gap-xs : 8px
--md-h-gap-sm : 12px
--md-h-gap-md : 20px
--md-h-gap-lg : 32px
--md-h-gap-sl : 40px

--md-v-gap-xs : 8px
--md-v-gap-sm : 12px
--md-v-gap-md : 20px
--md-v-gap-lg : 32px
--md-v-gap-sl : 40px

/// Transition
--md-ease-in-out-quint : cubic-bezier(.86, 0, .07, 1)

/// Opacity
--md-opacity-disabled : .3 // opacity of disabled button, switch, agree

/// Font Family
--md-font-family-normal : "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif
--md-font-family-number : DINPro-Medium, DIN Alternate, "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif
```

#### 组件变量

:::tip
可查看对应的组件代码获取
:::
