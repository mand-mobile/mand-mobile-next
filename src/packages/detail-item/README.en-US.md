---
component: detail-item
title: DetailItem
preview: https://didi.github.io/mand-mobile/examples/#/detail-item
---

# DetailItem

Detail list usually used as bill details, inventory details and so on.

### Import

```javascript
import { DetailItem } from  'mand-mobile-next'

Vue.createApp().component(DetailItem.name, DetailItem)
```

### Code Examples

<demo-wrapper
  src="src/packages/detail-item/demo"
/>

### API

#### CellItem Props

|Props | Description | Type | Default | Note|
|----|-----|------|------|------|
|title|title|String|-|-|
|content|content text|String\/Number|-|-|
|bold|whether emphasis content|Boolean|`false`|-|
