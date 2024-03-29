---
component: image-viewer
title: ImageViewer 图片查看器
preview: https://didi.github.io/mand-mobile/examples/#/image-viewer
---

# ImageViewer 图片查看器

用于浏览多张图片，并可对图片进行滑动切换

### 引入

```javascript
import { ImageViewer } from 'mand-mobile-next'

Vue.createApp().component(ImageViewer.name, ImageViewer)
```

## 代码演示

<demo-wrapper
  src="src/packages/image-viewer/demo"
/>

### API

#### ImageViewer Props

|属性 | 说明 | 类型 | 默认值 | 备注|
|----|-----|------|------|------|
| visible | 是否显示查看器 | Boolean | `false` |
| list |展示图片列表 | Array\<String\> | `[]` | -|
| default-index | 初始索引值 | Number | `0` | - |
| has-dots | 是否展示图片索引值 | Boolean | `true` | - |
| deletable | 是否展示删除图标 | Boolean | `false` | - |