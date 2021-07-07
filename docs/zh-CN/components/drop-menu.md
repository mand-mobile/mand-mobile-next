---
component: drop-menu
title: DropMenu 下拉菜单
preview: https://didi.github.io/mand-mobile/examples/#/drop-menu
---

# DropMenu 下拉菜单

下拉菜单可用于列表筛选

## 引入

```javascript
import { DropMenu } from 'mand-mobile-next'

Vue.component(DropMenu.name, DropMenu)
```

## 代码演示

<demo-wrapper
  src="src/packages/drop-menu/demo"
  :demos="demos"
/>

<script setup>
const demos = import.meta.globEager('../../../src/packages/drop-menu/demo/demo*.vue')
</script>

<style>
  .demo-wrapper .md-drop-menu {
    position: static;
  }

  .demo-wrapper .md-drop-menu .md-popup {
    position: absolute;
    z-index: 9999;
  }
</style>

## API

### DropMenu Props
|属性 | 说明 | 类型 | 默认值 | 备注|
|----|-----|------|------|------|
|data|数据源|Array\<[DropMenuBarItem](#dropmenubaritem)\>|`[]`||
|default-value|初始值|Array\<String\>|`[]`|-|
|option-render |返回各选项渲染内容|Function(option: [DropMenuListItem](#dropmenulistitem)):String|-|`vue 2.1.0+`可使用`slot-scope`，参考`Radio`|

#### DropMenuBarItem

|属性 | 说明 | 类型 | 默认值 | 备注|
|----|-----|------|------|------|
|text|文案|String|||
|disabled|禁用|Boolean|`false`||
|options|选项数据|Array\<[DropMenuListItem](#dropmenulistitem)\>|`[]`||
|[property]|其它数据|any|||

#### DropMenuListItem

|属性 | 说明 | 类型 | 默认值 | 备注|
|----|-----|------|------|------|
|text|文案|String|||
|disabled|禁用|Boolean|`false`||
|[property]|其它数据|any|||


### DropMenu Methods

#### getSelectedValue(index)
获取某菜单项选中值

|参数 | 说明 | 类型 | 默认值|
|----|-----|------|------|
|index|菜单项索引值|Number|-|

返回

|属性 | 说明 | 类型|
|----|-----|------|
|listItem|选项数据|Object: [DropMenuListItem](#dropmenulistitem)|

#### getSelectedValues()
获取所有菜单项选中值

返回

|属性 | 说明 | 类型|
|----|-----|------|
|listItems|选项数据|Array\<[DropMenuListItem](#dropmenulistitem)\>|

### DropMenu Events

#### @change(barItem, listItem)
选中某项事件

|属性 | 说明 | 类型|
|----|-----|------|
|barItem|菜单项数据|Object: [DropMenuBarItem](#dropmenubaritem)|
|listItem|选项数据|Object: [DropMenuListItem](#dropmenulistitem)|

#### @show()
下拉菜单展示事件

#### @hide()
下拉菜单隐藏事件
