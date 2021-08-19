---
component: agree
title: Agree
preview: https://didi.github.io/mand-mobile/examples/#/agree
---

# Agree


For toggling states

### Import

```javascript
import { Agree } from  'mand-mobile-next'

Vue.createApp().component(Agree.name, Agree)
```

### Code Examples

<demo-wrapper
  src="src/packages/agree/demo"
/>

<!-- DEMO -->

### API

##### Agree Props

| Props | Description | Type | Default | Note |
|----|-----|------|------|------|
| v-model | checked | Boolean | `false` |-|
| disabled | - | Boolean | `false` |-|
| size | size of icon | String | `md` | refer to `Icon` for optional values |
#### Agree Instance Events

##### @change(name, checked)
Invoked when checked state is changed

| Props | Description | Type |
|----|-----|------|
| name | unique name of radio button | Number/String |
| checked | - | Boolean |
