# Quick Start

[![npm](https://img.shields.io/npm/v/mand-mobile-next.svg)](https://www.npmjs.org/package/mand-mobile-next) [![Open in Visual Studio Code](https://open.vscode.dev/badges/open-in-vscode.svg)](https://open.vscode.dev/mand-mobile/mand-mobile-next)[![build](https://github.com/mand-mobile/mand-mobile-next/actions/workflows/build.yml/badge.svg?branch=vue3)](https://github.com/mand-mobile/mand-mobile-next/actions)  

## Install

快速开始最好的方式就是使用 `vite` 初始化项目工程，添加 `mand-mobile-next` 即可。

**Use npm：**

```bash
npm init @vite/app
```

选择 `vue-ts`，初始化工程

**Install `mand-mobile-next`**

```bash
npm i mand-mobile-next@alpha
# or
yarn add mand-mobile-next@alpha
```

## Use

#### Fully import

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

#### On demand

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

## Custom Themes

Mand mobile next uses CSS [var](https://developer.mozilla.org/zh-CN/docs/Web/CSS/var) to implement theme switching, and users can implement custom themes by the following way

- In `main.ts`:

```ts
Import { useCssVar } from 'mand-mobile-next/dist/es/composable'.

const themeVars = {
  '--md-color-primary': '#f44336',
}

useCssVar(themeVars)
```

- In the component `setup`:

```vue
<script setup ts>
import { useCssVar } from 'mand-mobile-next/dist/es/composable'.
import { ref } from 'vue'.

const themeVars = ref({
  '--md-color-primary': '#f44336',
})

useCssVar(themeVars)
</script>
```

#### Base variables

```css
/// Brand color
--md-color-primary : #4280EB // Brand color

/// Text color
--md-color-text-base : #111A34 // important information, such as first-level headings
--md-color-text-base-inverse : #FFF
--md-color-text-body : #41485d // General information, such as the main body of a first-level header
--md-color-text-minor : #666f83 // Secondary information, e.g. point of interest, summary
--md-color-text-caption : #858b9c // auxiliary information, such as list content description
--md-color-text-disabled : #c5cad5 // Disabled status
--md-color-text-placeholder : #c5cad5 // Default prompt input or placeholder
--md-color-text-highlight : --md-color-primary // Highlighted state
--md-color-text-warn : #ff7d41 // point-of-interest, warning prompt
--md-color-text-error : #ff5257 // Strong hint for error
--md-color-text-link : #5878b4 // Text link

/// Border and background colors
--md-color-border-base : #e2e4ea // Borders for entries
--md-color-border-element : #c5cad5 // element border, e.g. button
--md-color-bg-base : #f9fafb // element, container background
--md-color-bg-inverse : #FFF
--md-color-bg-disabled : #e2e4ea // Disable element background
--md-color-bg-tap : #F9FAFB // Entry click state
--md-color-mask : rgba(37, 38, 45, .7) // popup mask

/// Text size
--md-font-heading-large : 60px
--md-font-heading-medium : 52px
--md-font-heading-normal : 44px
--md-font-caption-large : 36px
--md-font-caption-normal : 32px
--md-font-body-large : 28px
--md-font-body-normal : 26px
--md-font-minor-large : 24px
--md-font-minor-normal : 20px

--md-font-weight-light : 300
--md-font-weight-normal : 400
--md-font-weight-medium : 500
--md-font-weight-semibold : 600

/// Radius size
--md-radius-normal : 8px
--md-radius-circle : 50%.

/// Border size
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

/// Opaqueness
--md-opacity-disabled : .3 // Disable opacity of the button, switch, agree

/// Font family
--md-font-family-normal : "Helvetica Neue",Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Microsoft Ya Black",Arial, sans-serif
--md-font-family-number : DINPro-Medium, DIN Alternate, "Helvetica Neue",Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", " Microsoft YaHei", Arial,sans-serif
```

#### component variables

:::tip
You can check the corresponding component code to get
:::
