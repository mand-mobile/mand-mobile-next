---
component: codebox
title: CodeBox
preview: https://didi.github.io/mand-mobile/examples/#/codebox
---

# Codebox

### Import

```javascript
import { Codebox } from  'mand-mobile-next'

Vue.createApp().component(Codebox.name, Codebox)
```

### Code Examples

<demo-wrapper
  src="src/packages/codebox/demo"
/>

### API

#### Codebox Props

| Props | Description | Type | Default |
|----|-----|------|------|
| v-model | captcha | String | - |
| maxlength | maxlength of captacha, set to `-1` as no restriction | Number | `4` |
| autofocus | immediately open simulated keyboard, not work for system keyboard | Boolean | `false` |
| mask | whether to mask code or not | Boolean | `false` |
|disabled|disable input|Boolean|`false`|
|justify|take full space|Boolean|`false`|
| closable | whether to hide keyboard when clicking away | Boolean | `true` |
| ok-text | the text of confirmation button of the keyboard |String| `Confirm` |
| disorder| whether to use random keyboard layout or not | Boolean | `false` |
| system | whether to use system keyboard or simulated keyboard | Boolean | `false` |
| is-view | whether to show as inline element or append to the body | Boolean |`false`|

#### Codebox Methods

##### focus()

##### blur()

Hide keyboard

#### Codebox Events

##### @submit(code)

Invoked when user submit
