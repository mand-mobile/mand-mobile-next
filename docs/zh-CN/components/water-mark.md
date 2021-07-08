---
component: water-mark
title: WaterMark 水印
preview: https://didi.github.io/mand-mobile/examples/#/water-mark
---

# WaterMark 水印

自带水印背景的容器

## 引入

```javascript
import { WaterMark } from 'mand-mobile-next'

Vue.createApp().component(WaterMask.name, WaterMark)
```

## 代码演示

<demo-wrapper
  src="src/packages/water-mark/demo"
  :demos="demos"
/>

<script setup>
const demos = import.meta.globEager('../../../src/packages/water-mark/demo/demo*.vue')
</script>

## API

### WaterMask Props
|属性 | 说明 | 类型 | 默认值 | 备注 |
|----|-----|------|------ |------|
|content|水印内容|String| |复杂内容使用`scoped slot`|
|spacing|水印间距|String|`60px`| |
|repeat-x|横向重复|Boolean|`true`| |
|repeat-y|纵向重复|Boolean|`true`| |
|rotate|旋转角度|String|`-30`| |
|opacity|透明度|String|`0.1`| |

### WaterMark Slots

#### default
默认内容插槽

#### watermark
水印内容scoped插槽

```html
<div slot="watermark" slot-scope="{ coord }">
  <!-- coord.row 行索引 -->
  <!-- coord.col 列索引 -->
</div>
```