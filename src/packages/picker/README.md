---
component: picker
title: Picker 选择器
preview: https://didi.github.io/mand-mobile/examples/#/picker
---

# Picker 选择器

滚动多列选择

## 引入

```javascript
import { Picker } from 'mand-mobile-next'

Vue.createApp().component(Picker.name, Picker)
```

## 代码演示

<demo-wrapper
  src="src/packages/picker/demo"
  :demos="demos"
/>

<script setup>
const demos = import.meta.globEager('../../../src/packages/picker/demo/demo*.vue')
</script>

## API

### Picker Props
|属性 | 说明 | 类型 | 默认值 | 备注|
|----|-----|------|------|------|
|v-model:visible|选择器是否可见|Boolean|`false`|-|
|v-model|选择器各列初始选中项值|Array|`[]`|选项值字段`value`|
|data|数据源|Array<{value, text, ...}>[]|`[]`|-|
|cols|数据列数|Number|`1`|-|
|invalid-value|选择器各列不可用选项值|Array|`[]`|选项值字段`value`,某列多个不可用项使用数组,如`[[1,2], [2]]`|
|line-height|选择器选项行高|Number|`45`|单位`px`|
|is-view|是否内嵌在页面内展示，否则以弹层形式|Boolean|`false`|-|
|is-cascade|各列数据是否级联|Boolean|`false`|级联数据格式见附录|
|keep-index|当列数据变化时保持上次停留的位置|Boolean|`false`|仅用于级联数据|  
|title|选择器标题|String|-|-|
|describe|选择器描述|String|-|-|
|ok-text|选择器确认文案|String|`确认`|-|
|cancel-text|选择器取消文案|String|`取消`|-|
|large-radius|选择器标题栏大圆角模式|Boolean|`false`|-|
|mask-closable|点击蒙层是否可关闭弹出层|Boolean|`true`|-|

### Picker Methods

#### getColumnValues(): columnsValue
获取所有列选中项的值

返回

|属性 | 说明 | 类型|
|----|-----|------|
|columnsValue|所有列选中项的值|Array<{value, text, ...}>|

### Picker Events

#### @change(columnIndex, itemIndex, value)
选择器选中项更改事件

|参数 | 说明 | 类型|
|----|-----|------|
|columnIndex|更改列的索引值|Number|
|itemIndex|更改列选中项的索引值|Number|
|value|更改列选中项的的值|Object: {value, text, ...}|

#### @confirm()
选择器确认选择事件（仅`is-view`为`false`）

#### @cancel()
选择器取消选择事件（仅`is-view`为`false`）

#### @show()
选择器弹层展示事件（仅`is-view`为`false`）

#### @hide()
选择器弹层隐藏事件（仅`is-view`为`false`）

## 附录

* 非级联数据源数据格式

```javascript
[
  [
    {
      // 选项展示文案
      "text": "",
      // 选项值
      "value": ""
    },
    // ...
  ],
  // ...
]
```

* 级联数据源数据格式

```javascript
[
  [
    {
      // 选项展示文案
      "text": "",
      // 第二列对应数据
      "children": [
        {
          "text": "",
          // 第三列对应数据
          "children": [
            // ...
          ]
        },
        // ...
      ]
      // 选项值
      "value": ""
    },
    // ...
  ]
]
```
