[[_TOC_]]

## 开发

```bash
yarn
# then
yarn dev
```

- 推荐使用 [volar](https://github.com/johnsoncodehk/volar) 作为开发 `Vue3` 的插件，获得更好的类型推导
- 禁用 `vetur` 在当前工作区，防止与 `volar` 冲突

## 构建

```bash
yarn build
```

## 新建组件

```bash
yarn gen ${name}
```

## 组件间相互引用

```ts
import Icon from 'mand-mobile/icon'
```

## 单元测试 / 快照**WIP**

- [Jest](https://jestjs.io/zh-Hans/)
- [vue-test-utils](https://next.vue-test-utils.vuejs.org/)

## E2E **WIP**

- [cypress](https://github.com/cypress-io/cypress)

## 其他

### [example](http://10.96.82.236:3030)

![img](https://pt-starimg.didistatic.com/static/starimg/img/xGYtxhudxq1621568050925.png)

### 参考文档

- [Vue3](https://v3.cn.vuejs.org/)
- [vite](https://cn.vitejs.dev/guide/#scaffolding-your-first-vite-project)

### [component 进度](./docs/milestone.md)

### TODO

- [x] husky commit 校验  
- [x] 按需加载打包  
- [x] 组件开发任务分配  
- [x] 组件类型构建
- [x] 额外的 `CSS` 片段移除，`rollup-plugin-vue` 对 `stylus` 的处理有问题，得额外注入样式变量
- [x] `esbuild` 构建 `Vue` (esbuild 不支持 umd，是否兼容？个人觉得 esm/iife 即可)
- [ ] 样式梳理以及金融 4.0 设计规范对接

### 代码片段

- [mdc](./.vscode/mdc.code-snippets)
- [mdd](./.vscode/mdd.code-snippets)
- css

```html
.selector {
  /* Positioning */
  position: absolute;
  z-index: 10;
  top: 0;
  right: 0;

  /* Display & Box Model */
  display: inline-block;
  overflow: hidden;
  box-sizing: border-box;
  width: 100px;
  height: 100px;
  padding: 10px;
  border: 10px solid #333;
  margin: 10px;

  /* Color */
  background: #000;
  color: #fff
  
  /* Text */
  font-family: sans-serif;
  font-size: 16px;
  line-height: 1.4;
  text-align: right;

  /* Other */
  cursor: pointer;
}
```
