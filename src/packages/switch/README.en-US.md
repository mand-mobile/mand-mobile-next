---
component: switch
title: Switch
preview: https://didi.github.io/mand-mobile/examples/#/switch
---

# Switch

Switch between two status

### Import

```javascript
import { Switch } from  'mand-mobile-next'

Vue.createApp().component(Switch.name, Switch)
```

### Code Examples

<demo-wrapper
  src="src/packages/switch/demo"
/>

### API

#### Switch Props

| Props | Description | Type | Default |
|----|-----|------|------|
|v-model| Whether it is on or off |Boolean|`false`|
|disabled| Whether it is disabled or not |Boolean|`false`|

#### Switch Instance Events

##### @change(isActive)

| Props | Description | Type |
|----|-----|------|
|isActive| Whether it is on or off |Boolean|
