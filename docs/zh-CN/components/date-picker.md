---
component: date-picker
title: DatePicker 时间选择器
preview: https://didi.github.io/mand-mobile/examples/#/date-picker
---

# DatePicker 时间选择器

选择日期或者时间，支持年/月/日/时/分/秒自定义时间列表选择

## 引入

```javascript
import { DatePicker } from 'mand-mobile-next'

Vue.createApp().component(DatePicker.name, DatePicker)
```

## 代码演示

<demo-wrapper
  src="src/packages/date-picker/demo"
  :demos="demos"
/>

<script setup>
const demos = import.meta.globEager('../../../src/packages/date-picker/demo/demo*.vue')
</script>

## API

### DatePicker Props
|属性 | 说明 | 类型 | 默认值 | 备注 |
|----|-----|------|------|------|
|v-model:visible|日期选择器是否可见|Boolean|`false`|-|
|v-model|选中日期|Date/Array|`new Date()`|如果`type`是`time`, 选中日期是时分秒的`Array`, 如[23,59,59], 其他`type`则是`Date`类型|
|type|日期选择类型|String|`date`|`date`, `time`, `datetime`, `custom`|
|custom-types|自定义类型包含的日期元素, `[yyyy, MM, dd, hh, mm, ss]`|Array|-|仅用于type为`custom`|
|min-date|最小可选日期（时间）|Date|-|-|
|max-date|最大可选日期（时间）|Date|-|-|
|unit-text|元素单位展示文案设置|Array|`['年', '月', '日', '时', '分', '秒']`|复杂逻辑使用`text-render`|
|text-render|自定义选项展示文案方法|Function(typeFormat, column0Value, column1Value, ...): String|-|如果使用`text-render`则`unit-text`无效, 示例见附录|
|today-text|今天展示文案设置|String|`今天`|使用`&`可占位日期数字，如`&(今天)`| 
|line-height|选择器选项行高|Number|`45`|单位`px`|  
|keep-index|当列数据变化时保持上次停留的位置|Boolean|`false`|-|        
|is-view|是否内嵌在页面内展示, 否则以弹层形式|Boolean|`false`|-| 
|title|选择器标题|String|-|-|
|describe|选择器描述|String|-|-|
|ok-text|选择器确认文案|String|`确认`|-| 
|cancel-text|选择器取消文案|String|`取消`|-| 
|large-radius|选择器标题栏大圆角模式|Boolean|`false`|-|
|mask-closable|点击蒙层是否可关闭弹出层|Boolean|`true`|-|

### DatePicker Methods

#### getColumnValues(): columnsValue
获取所有列选中项的值

返回

|属性 | 说明 | 类型 |
|----|-----|------|
|columnsValue|所有列选中项的值|Array<{text, value, typeFormat}>|

### DatePicker Events

#### @change(columnIndex, itemIndex, value)
选择器选中项更改事件

|参数 | 说明 | 类型 |
|----|-----|------|
|columnIndex|更改列的索引值|Number|
|itemIndex|更改列选中项的索引值|Number|
|value|更改列选中项的的值|Object: {text, value, typeFormat}|

#### @confirm()
选择器确认选择事件（仅`is-view`为`false`）


### 附录

* columnData  

```javascript

const columnData = [
  // 年
  [
    {
      text: '2017年', // 日期元素展示文案
      value: 2017, // 日期元素数字
      typeFormat: 'yyyy' // 日期元素类型 yyyy, MM, dd, hh, mm, HalfDay
    }
  ],
  // 月
  [
    {
      text: '1月', // 日期元素展示文案
      value: 1, // 日期元素数字
      typeFormat: 'MM' // 日期元素类型 yyyy, MM, dd, hh, mm, HalfDay
    }
  ],
  // 日, 时, 分, 秒
  [
    ...,
  ]
]
```

* textRender

```typescript
  const MONTH_MAP = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ]

  const textRender = (
    typeFormat: string,
    columnValue: number
  ) => {
    if (typeFormat === 'MM') {
      return MONTH_MAP[columnValue - 1]
    }
    return
  }
```
