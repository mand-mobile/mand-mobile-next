---
component: steps
title: Steps 步骤条
preview: https://didi.github.io/mand-mobile/examples/#/steps
---

# Steps 步骤条

用于引导用户按照流程完成任务的导航条，显示当前所在步骤

## 引入

```javascript
import { Steps } from 'mand-mobile-next'

Vue.component(Steps.name, Steps)
```

## 代码演示

<demo-wrapper
  src="src/packages/steps/demo"
  :demos="demos"
/>

<script setup>
const demos = import.meta.globEager('../../../src/packages/steps/demo/demo*.vue')
</script>

## API

### Steps Props
| 属性 | 说明 | 类型 | 默认值 | 备注 |
|----|-----|------|------|------|
|steps|步骤信息数组|Array\<[StepOptions](#stepoptions)\>| | |
|current|当前步骤/进度|Number|`0`| 支持小数 |
|direction|展示方向|String|`horizontal`|`horizontal`, `vertical`|
|transition|进度变化动效|Boolean|`false`| |
|dislocation|步骤文案位置自动交错排列|Boolean|`false`|仅支持水平方向展示时|
|adaptive|步骤高度自适应|Boolean|`false`|仅用于`vertical`, **如果设置为`true`则根据容器高度自适应，需设置`.mfe-steps`高度**|

### StepOptions
| 属性 | 说明 | 类型 | 默认值 | 备注 |
|----|-----|------|------|------|
|name|步骤标题|String| | |
|desc|步骤描述|String| | |
|flex|步骤空间占比|Number| 1 | |
|alignItems|步骤图标和连接线的对齐方式|String| center | flex-start/center/flex-end |
|textPosition|步骤文本位置|String| bottom | top/bottom，仅支持水平方向展示时|
|textAlign|步骤文本的对齐方式|String| center | left/center/right，仅支持水平方向展示时|
|iconSize|步骤图标最小尺寸|Number| 32 | 单位px |
|barSize|连接线尺寸|Number| 2 | 单位px |
|barText|连接线文案|String| | |

### Steps Slots

#### icon

统一自定义所有步骤图标，支持`scoped slot`如下所示：

```html
<template slot="reached" slot-scope="{ index, currentIndex }">
  <b v-if="props.index === props.currentIndex">{{ props.index }}</b>
  <span v-else>{{ props.index }}</span>
</template>
```

#### reached

已完成步骤图标插槽，用于自定义已完成步骤图标，支持`scoped slot`如下所示：

```html
<template slot="reached" slot-scope="{ index }">
  <!-- 如果索引值为1，则自定义 -->
  <md-icon name="checked" v-if="index === 1"></md-icon>
  <!-- 默认步骤图标 -->
  <div class="step-node-default" v-else></div>
</template>
```

#### current

当前步骤图标插槽，用于自定义当前步骤图标，支持`scoped slot`用法同`reached`

#### unreached

未完成步骤图标插槽，用于自定义未完成步骤图标，支持`scoped slot`用法同`reached`

#### content

步骤内容插槽

```html
<template
  slot="content"
  slot-scope="{ index, step }"
>
  <!-- index 步骤索引 -->
  <!-- step 步骤信息 -->
</template>
```