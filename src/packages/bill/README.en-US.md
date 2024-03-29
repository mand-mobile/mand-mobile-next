---
component: bill
title: Bill
preview: https://didi.github.io/mand-mobile/examples/#/water-mask
---

# Bill


Electronic bill

### 引入

```javascript
import { Bill } from  'mand-mobile-next'

Vue.createApp().component(Bill.name, Bill)
```

### 代码演示

<demo-wrapper
  src="src/packages/bill/demo"
/>

### API

#### Bill Props
|Props | Description | Type | Default | Note |
|----|-----|------|------ |------|
|title|-|String|-|-|
|no|-|String|-|-|
|water-mark|-|String|-|complex content using `scoped slot`|

#### Bill Slots

##### default
Default slot of content

##### header
Header slot

##### footer
Footer slot

##### watermask
Scoped slot of watermask content

```html
<div slot="watermark" slot-scope="props">
  <!-- content -->
</div>
```
