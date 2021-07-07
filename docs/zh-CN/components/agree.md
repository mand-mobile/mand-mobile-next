---
component: agree
title: Agree 勾选按钮
preview: https://didi.github.io/mand-mobile/examples/#/agree
---

# Agree 勾选按钮

用于标记切换某种状态，如协议勾选

## 引入

```javascript
import { Agree } from 'mand-mobile-next'

Vue.component(Agree.name, Agree)
```

## 代码演示

<demo-wrapper
  src="src/packages/agree/demo"
  :demos="demos"
/>

<script setup>
const demos = import.meta.globEager('../../../src/packages/agree/demo/demo*.vue')
</script>

## API

### Agree Props
|属性 | 说明 | 类型 | 默认值 | 备注 |
|----|-----|------|------|------|
|value|是否选中|Boolean|`false`| |
|disabled|是否禁用|Boolean|`false`| |
|size|按钮大小|String|`md`|可选值参考组件`Icon`|

### Agree Events

#### @change(name, checked)
勾选状态发生变化事件

|属性 | 说明 | 类型 |
|----|-----|------|
|name|单选按钮名称，唯一标识|Number/String|
|checked|是否选中|Boolean|
