---
component: tabs
title: Tabs 标签页
preview: https://didi.github.io/mand-mobile/examples/#/tabs
---

# Tabs 标签页

用于创建包含内容区域的标签页

## 引入

```javascript
import { Tabs, TabPane } from 'mand-mobile-next'

Vue.createApp().component(Tabs.name, Tabs)
Vue.createApp().component(TabPane.name, TabPane)
```

## 代码演示

<demo-wrapper
  src="src/packages/tabs/demo"
  :demos="demos"
/>

<script setup>
const demos = import.meta.globEager('../../../src/packages/tabs/demo/demo*.vue')
</script>

## API

### Tabs Props

|属性 | 说明 | 类型 | 默认值 | 备注|
|----|-----|------|------|------|
| default-index | 默认显示第几项 | Number | 0 | 数组索引 |
| has-ink |是否显示下划线|Boolean|`true`| |
| ink-length |下划线宽度|Number|`0`|该数值为下划线占标签按钮宽度的百分比，须在`1-100`之间|
| immediate |初始化后立即就触发一次`change`事件|Boolean|`false`| |

### TabPane Props

|属性 | 说明 | 类型 | 默认值 | 备注|
|----|-----|------|------|------|
|name|唯一键名|String| |必须|
|label|菜单标题|String| |必须|
|disabled|是否禁用|Boolean|`false`| |

### Tabs Events

#### @change(tab)

当用户选择标签触发

|属性 | 说明 | 类型|
|----|-----|------|
|tab|选中的标签菜单对象|Object:{name: String, label: String, disabled: Boolean}|
