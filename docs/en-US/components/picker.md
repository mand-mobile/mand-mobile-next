---
component: picker
title: Picker
preview: https://didi.github.io/mand-mobile/examples/#/picker
---

# Picker


Scrollable multi-column selector

### Import

```javascript
import { Picker } from  'mand-mobile-next'

Vue.createApp().component(Picker.name, Picker)
```

### Code Examples

<demo-wrapper
  src="src/packages/picker/demo"
  :demos="demos"
/>

<script setup>
const demos = import.meta.globEager('../../../src/packages/picker/demo/demo*.vue')
</script>

<!-- DEMO -->

### API

#### Picker Props
|Props | Description | Type | Default | Note|
|----|-----|------|------|------|
|v-model:visible|display picker or not|Boolean|`false`|-|
|v-model|values of initially selected items in each column|Array|`[]`|Available key `value`|
|data|data source|Array<{value, text, ...}>[]|`[]`|-|
|cols|number of columns|Number|`1`|-|
|invalid-value|values of disabled items in each column|Array|`[]`|array of multiple disabled items, such as `[[1,2], [2]]`|
|is-view|inline display in page, otherwise it shows as `Popup`|Boolean|`false`|-|
|is-cascade|data in each column is cascaded or not|Boolean|`false`|see #Appendix for the format of cascaded data|
|keep-index|keep last stop position when the column data changes|Boolean|`false`|only for cascaded data|  
|line-height|line height of options|Number|`45`|unit `px`|
|title|title of picker|String|-|-|
|describe|description of picker|String|-|-|
|ok-text|confirmation text|String|`confirm`|-|
|cancel-text|cancellation text|String|`cancel`|-|
|large-radius|large radius of title bar|Boolean|`false`|-|
|mask-closable|picker will be closed when clicking mask|Boolean|`true`|-|

#### Picker Methods

##### getColumnValue(index): activeItemValue
Get the data of the currently selected item in a column

|Parameters | Description | Type|
|----|-----|------|
|index|the index of each column|Number|

Returns

|Props | Description | Type|
|----|-----|------|
|activeItemValue|value of selected item|Object: {value, text, ...}|

#### Picker Events

##### @change(columnIndex, itemIndex, value)
Change pickers' selections

|Parameters | Description | Type|
|----|-----|------|
|columnIndex|the index of changed column|Number|
|itemIndex|the index of changed item in the column|Number|
|value|the value of changed item in the column|Object: {value, text, ...}|

##### @confirm()
Confirm picker's selection (only when `is-view` is `false`）

##### @cancel()
Cancel picker's selection (only when `is-view` is `false`）

##### @show()
Show picker (only when `is-view` is `false`）

##### @hide()
Hide picker (only when `is-view` is `false`）

### Appendix

* The format of non-cascade data source

```javascript
[
  [
    {
      // Option display text
      "text": "",
      // Option value
      "value": ""
    },
    // ...
  ],
  // ...
]
```

* The format of cascaded data source

```javascript
[
  [
    {
      // Option display text
      "text": "",
      // data of second column
      "children": [
        {
          "text": "",
          // data of third column
          "children": [
            // ...
          ]
        },
        // ...
      ]
      // Option value
      "value": ""
    },
    // ...
  ]
]
```
