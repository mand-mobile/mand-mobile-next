---
component: cell-item
title: CellItem
preview: https://didi.github.io/mand-mobile/examples/#/cell-item
---

# CellItem


Arrange vertically and display current contents, status and other allowable operations.

### Import

```javascript
import { CellItem } from 'mand-mobile'

Vue.createApp().component(CellItem.name, CellItem)
```

### Code Examples

<demo-wrapper
  src="src/packages/cell-item/demo"
  :demos="demos"
/>

<script setup>
const demos = import.meta.globEager('../../../src/packages/cell-item/demo/demo*.vue')
</script>

<!-- DEMO -->

### API

#### CellItem Props
|Props | Description | Type | Default | Note|
|----|-----|------|------|------|
|title|title|String|-|-|
|brief|description text|String|-|-|
|addon|help info text|String|-|-|
|disabled|disable item operation|Boolean|`false`|-|
|arrow|arrow indicator|Boolean|`false`|-|
|no-border|remove border|Boolean|`false`|-|

#### CellItem Events
##### @click(event)
click event when not disabled

#### CellItem Slots

##### default
default content slot

##### left
left content slot

##### right
right content slot

##### children
extra children slot
