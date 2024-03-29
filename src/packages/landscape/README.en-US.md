---
component: landscape
title: Landscape
preview: https://didi.github.io/mand-mobile/examples/#/landscape
---

# Landscape

To display ads or descriptions in a floating layer

### Import

```javascript
import { Landscape } from  'mand-mobile-next'

Vue.createApp().component(Landscape.name, Landscape)
```

### Code Examples

<demo-wrapper
  src="src/packages/landscape/demo"
/>

<!-- DEMO -->

### API

#### Landscape Props

|Props | Description | Type | Default | Note |
|----|-----|------|------|----- |
|v-model|display popup layer or not|Boolean|`false`| - |
|has-mask|has mask or not|Boolean|`true`| - |
|mask-closable|if popup layer can be closed through clicking on the mask|Boolean|`false`| - |
|full-screen|whether display as full screen|Boolean|`false`| - |
| transition | the animation effect of dialog | String | when `full-screen` is `true`, the default value is `md-fade`;otherwise the default value is `md-punch` |refer to [Transition](https://didi.github.io/mand-mobile/#/en-US/docs/components/feedback/transition?anchor=API) for optional values |

#### Landscape Events

##### @show()

Display popup

##### @hide()

Hide popup
