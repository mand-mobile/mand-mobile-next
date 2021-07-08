---
component: tip
title: Tip
preview: https://didi.github.io/mand-mobile/examples/#/tip
---

# Tip


Tooltip

### Import

```javascript
import { Tip } from 'mand-mobile'

Vue.createApp().component(Tip.name, Tip)
```

### Code Examples

<demo-wrapper
  src="src/packages/tip/demo"
  :demos="demos"
/>

<script setup>
const demos = import.meta.globEager('../../../src/packages/tip/demo/demo*.vue')
</script>

<!-- DEMO -->

### API

#### Tip Props
| Props | Description | Type | Default | Note |
|----|-----|------|------|------|
|name|the name of tip|String/Number|-|generally used for special class names|
|content|the content of tip|String/Number|-|-|
|placement|the position of tip|String|`top`| `top`, `left`, `bottom`, `right`|
|icon|icon on the left of content|String|-|refer to `Icon` for optional values|
|icon-svg|use svg icon|Boolean|`false`|-|
|fill|filled with child elements|Boolean|`false`|such as button prompts, equal width(top/bottom) or height(left/right) with buttons|
|offset|-|Object:{left, top}|-|-|

#### Tip Events

##### @show()
Invoked after dialog is shown

##### @hide()
Invoked after dialog is hidden
