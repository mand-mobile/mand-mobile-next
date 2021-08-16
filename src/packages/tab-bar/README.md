---
component: tab-bar
title: TabBar 标签栏
preview: https://didi.github.io/mand-mobile/examples/#/tab-bar
---

# TabBar 标签栏

用于创建不含内容区域的标签栏

## 引入

```javascript
import { TabBar } from 'mand-mobile-next'

Vue.createApp().component(TabBar.name, TabBar)
```

## 代码演示

<demo-wrapper
  src="src/packages/tab-bar/demo"
/>

## API

### TabBar Props

|属性 | 说明 | 类型 | 默认值 | 备注|
|----|-----|------|------|------|
|v-model|双向绑定的标签对象`name`|String| | |
|items|标签标题数组|Array\<{name: String, label: String, disabled: Boolean}\>| | |
|has-ink|是否显示下划线|Boolean|`true`| |
|ink-length|下划线宽度|Number|`0`|该数值为下划线占标签按钮宽度的百分比，须在`1-100`之间|
|immediate|初始化后立即就触发一次`change`事件|Boolean|`false`| |

### TabBar Methods

#### TabBar Events

##### @change(item, index, prevIndex)
标签索引发生变化事件

|属性 | 说明 | 类型|
|----|-----|------|
|item|选中的标签对象|Object|
|index|选中的标签索引|Number|
|prevIndex|上一标签索引|Number|

### TabBar Slot

```html
<md-tab-bar>
  <template #default="slotProps">
    <span class="green">
      {{ slotProps.item.label }}
    </span>
  </template>
</md-tab-bar>
```
