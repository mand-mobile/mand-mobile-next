---
component: notice-bar
title: NoticeBar 通告栏
preview: https://didi.github.io/mand-mobile/examples/#/notice-bar
---

# NoticeBar 通告栏

通常用于系统提醒、活动提醒等通知

## 引入

```javascript
import { NoticeBar } from 'mand-mobile-next'

Vue.component(NoticeBar.name, NoticeBar)
```

## 代码演示

<demo-wrapper
  src="src/packages/notice-bar/demo"
  :demos="demos"
/>

<script setup>
const demos = import.meta.globEager('../../../src/packages/notice-bar/demo/demo*.vue')
</script>

## API

### NoticeBar Props
|属性 | 说明 | 类型 | 默认值 | 备注|
|----|-----|------|------|------|
|mode|右边提示类型|String| |`closable`, `link`|
|type|主题样式|String|`default`|`default`, `activity`, `warning`|
|time|显示时长|Number|`0`|单位为`ms`，不需要自动消失可将其置为`0`|
|round|圆角展示|Boolean|`false`| |
|multi-rows|内容超出多行展示|Boolean|`false`|优先级高于scrollable|
|scrollable|内容超出滚动展示|Boolean|`false`|优先级低于multiRows|
|icon|左侧图标|String|| |
|icon-svg |使用svg图标|Boolean|`false`| |

### NoticeBar Slots

#### default
默认内容插槽

#### left
左侧插槽，一般用于放置图标等

#### right
右侧插槽，一般用于放置图标等

### NoticeBar Events

#### @close()
通告栏关闭事件（设置`mode`为`closable`）

