---
component: detail-item
title: DetailItem 清单项
preview: https://didi.github.io/mand-mobile/examples/#/detail-item
---

# DetailItem 清单项

清单列表用于展示一些列表信息，如账单

## 引入

```javascript
import { DetailItem } from 'mand-mobile-next'

Vue.createApp().component(DetailItem.name, DetailItem)
```

## 代码演示

<demo-wrapper
  src="src/packages/detail-item/demo"
  :demos="demos"
/>

<script setup>
const demos = import.meta.globEager('../../../src/packages/detail-item/demo/demo*.vue')
</script>

## API

### DetailItem Props
|属性 | 说明 | 类型 | 默认值|备注|
|----|-----|------|------|------|
|title|标题|String| | |
|content|描述内容|String| | |
|bold|是否加粗显示|Boolean|`false`| |
