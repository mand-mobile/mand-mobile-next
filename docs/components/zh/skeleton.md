---
component: skeleton
title: Skeleton 骨架屏
preview: https://didi.github.io/mand-mobile/examples/#/skeleton
---

# Skeleton 骨架屏

骨架屏，一般用于数据尚未加载前先展示出页面的大致结构的加载状态

## 引入

```javascript
import { Skeleton } from 'mand-mobile'

Vue.component(Skeleton.name, Skeleton)
```

## 代码演示

<demo-wrapper
  src="src/packages/skeleton/demo"
  :demos="demos"
/>

<script setup>
const demos = import.meta.globEager('../../../src/packages/skeleton/demo/demo*.vue')
</script>

## API

### Skeleton Props
|属性 | 说明 | 类型 | 默认值 | 备注|
|----|-----|------|------|------|
|loading|是否显示骨架屏|Boolean|true|-|
|avatar|是否显示图标占位图|Boolean|false|-|
|avatar-size|图标占位图大小|String|md| sm, md, lg |
|title|是否显示标题占位图|Boolean|false|-|
|title-width|标题占位宽度|Number,String| 40%|-|
|row|内容占位图行数|Number|3|-|
|row-width|内容占位图宽度|String,Number,Array\<String\|Number\>|100%|-|
