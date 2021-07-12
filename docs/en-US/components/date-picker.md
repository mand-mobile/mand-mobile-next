---
component: date-picker
title: DatePicker
preview: https://didi.github.io/mand-mobile/examples/#/date-picker
---

# DatePicker


Date or time selecting, supports year/month/day/hour/minute/second custom selecting

### Import

```javascript
import { DatePicker } from 'mand-mobile'

Vue.createApp().component(DatePicker.name, DatePicker)
```

### Code Examples

<demo-wrapper
  src="src/packages/date-picker/demo"
  :demos="demos"
/>

<script setup>
const demos = import.meta.globEager('../../../src/packages/date-picker/demo/demo*.vue')
</script>

<!-- DEMO -->

### API

#### DatePicker Props
|Props | Description | Type | Default | Note |
|----|-----|------|------|------|
|v-model:visible|display date picker or not|Boolean|`false`|-|
|v-model|initial selected date|Date/Array|`new Date()`|value is an Array including hour, miniute and second such as [23, 59, 59] when `type` is `time`, otherwise value is a Date|
|type|type of selection|String|`date`|`date`, `time`, `datetime`, `custom`|
|custom-types|customized type contains `date element`, `[yyyy, MM, dd, hh, mm, ss]`|Array|-|valid when the value of type is `custom`|
|min-date|selectable min date(time)|Date|-|-|
|max-date|selectable max date(time)|Date|-|-|
|unit-text|element unit for text displaying|Array|`['Year', 'Month', 'Day', 'Hour', 'Minute', 'Second']`|`text-render` for complex logic|
|text-render|customized option for text displaying|Function(typeFormat, column0Value, column1Value, ...): String|-|`unit-text` is invalid when using `text-render`, refer to `Appendix`|              
|today-text|displaying text of today|String|`today`|use `&` to take placeholder date, like `&(today)`| 
|line-height|line height of options|Number|`45`|unit `px`| 
|keep-index|keep last stop position when the column data changes|Boolean|`false`|-|          
|is-view|inline-display in page, otherwise it shows as `Popup`|Boolean|`false`|-| 
|title|title of date-picker|String|-|-|
|describe|description of date-picker|String|-|-|
|ok-text|confirmation text|String|`confirm`|-| 
|cancel-text|cancellation text|String|`cancel`|-| 
|large-radius|large radius of title bar|Boolean|`false`|-|
|mask-closable|picker will be closed when clicking mask|String|`true`|-|

#### DatePicker Methods

##### getColumnValues(): columnsValue
Get all values of currently seleted items

Returns

|Props | Description | Type|
|----|-----|------|
|columnsValue|values of all selected items in the column|Array<{value, text, ...}>|


#### DatePicker Events

##### @change(columnIndex, itemIndex, value)
Change selections of date picker

|Parameters | Description | Type|
|----|-----|------|
|columnIndex|change the index of column|Number|
|itemIndex|change the index of selected item|Number|
|value|change the value of selected item|Object: {value, text, ...}|

##### @confirm()
Confirm the selection of date picker(only when `is-view` is `false`）

##### @cancel()
Cancel date picker's selection (only when `is-view` is `false`）

##### @show()
Show date picker (only when `is-view` is `false`）

##### @hide()
Hide date picker (only when `is-view` is `false`）


#### Appendix

* columnData  

```javascript

const columnData = [
  // year
  [
    {
      text: '2017年', // display year text
      value: 2017, // display year value
      typeFormat: 'yyyy' // the type of date: yyyy, MM, dd, hh, mm, ss
    }
  ],
  // month
  [
    {
      text: '1月', // display month text
      value: 1, // display month value
      typeFormat: 'MM' // the type of date: yyyy, MM, dd, hh, mm, ss
    }
  ],
  // day, hour, minute, second
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
