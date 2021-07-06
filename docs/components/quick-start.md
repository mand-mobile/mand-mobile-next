# 快速开始

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

### 全量引入

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

### 按需引入

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
          return `mand-mobile-next/dist/es/${name}.scss`;
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
