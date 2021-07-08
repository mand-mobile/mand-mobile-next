---
component: water-mark
title: WaterMark
preview: https://didi.github.io/mand-mobile/examples/#/water-mark
---

# WaterMark


Container with watermark background

### Instruction

```javascript
import { WaterMark } from 'mand-mobile'

Vue.createApp().component(WaterMark.name, WaterMark)
```

### Code Examples

<demo-wrapper
  src="src/packages/water-mark/demo"
  :demos="demos"
/>

<script setup>
const demos = import.meta.globEager('../../../src/packages/water-mark/demo/demo*.vue')
</script>

<!-- DEMO -->

### API

#### WaterMark Props
|Props | Description | Type | Default | Note |
|----|-----|------|------ |------|
|content|-|String|-|complex content using `scoped slot`|
|spacing|-|String|`20vw`|-|
|repeat-x|-|Boolean|`true`|-|
|repeat-y|-|Boolean|`true`|-|
|rotate|-|String|`-30`|-|
|opacity|-|String|`0.1`|-|

#### WaterMark Slots

##### default
Default slot of content

##### watermark
scoped slot of watermark content

```html
<div slot="watermark" slot-scope="{ coord }">
  <!-- coord.row row index -->
  <!-- coord.col column index -->
</div>
```
