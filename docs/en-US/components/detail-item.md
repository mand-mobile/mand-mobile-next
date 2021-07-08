---
component: detail-item
title: DetailItem
preview: https://didi.github.io/mand-mobile/examples/#/detail-item
---

# DetailItem


Detail list usually used as bill details, inventory details and so on.

### Import

```javascript
import { DetailItem } from 'mand-mobile'

Vue.createApp().component(DetailItem.name, DetailItem)
```

### Code Examples

<demo-wrapper
  src="src/packages/detail-item/demo"
  :demos="demos"
/>

<script setup>
const demos = import.meta.globEager('../../../src/packages/detail-item/demo/demo*.vue')
</script>

<!-- DEMO -->

### API

#### CellItem Props
|Props | Description | Type | Default | Note|
|----|-----|------|------|------|
|title|title|String|-|-|
|content|content text|String|-|-|
|bold|whether emphasis content|Boolean|`false`|-|
