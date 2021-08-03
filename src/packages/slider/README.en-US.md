---
component: slider
title: Slider
preview: https://didi.github.io/mand-mobile/examples/#/slider
---

# Slider


### Import

```javascript
import { Slider } from  'mand-mobile-next'

Vue.createApp().component(Slider.name, Slider)
```

### Code Examples

<demo-wrapper
  src="src/packages/slider/demo"
  :demos="demos"
/>

<script setup>
const demos = import.meta.globEager('../../../src/packages/slider/demo/demo*.vue')
</script>

<!-- DEMO -->

### API

#### Slider Props
|Props | Description | Type | Default | Note|
|----|-----|------|------|------|
|v-model|the value of slider, when <code>range</code> is false, use <code>number</code>, otherwise, use <code>[number, number]</code>|number , number[]|`0`|-|
|disabled|whether to disable slider|Boolean|`false`|-|
|min|the minimum value the slider can slide from|number|`0`|-|
|max|the maximum value the slider can slide to|number|`100`|-|
|step|the granularity the slider can step through|number|`1`|-|
|range|dual thumb mode|Boolean|`false`|-|
|format|slider will pass its value to <code>format</code>, and display its value in tooltip|Function|`(val) => {return val}`|-|
