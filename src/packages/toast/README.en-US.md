---
component: toast
title: Toast
preview: https://didi.github.io/mand-mobile/examples/#/toast
---

# Toast

### Import

```javascript
import { Toast } from  'mand-mobile-next'

Toast.succeed('Good Job!')

this.$toast.info('hint') // Totally Import

Vue.createApp().component(Toast.name, Toast) // Component Import
```

### Instruction

### Code Examples

<demo-wrapper
  src="src/packages/toast/demo"
/>

### API

#### Toast Static Methods

##### Toast.create({content, icon, iconSvg, duration, position, hasMask, parentNode})

Dynamically create a toast

| Props | Description | Type | Default | Note |
|----|-----|------|------|------|
| icon | name of icon | String | - | refer to `Icon` component for customized icons|
| iconSvg | use svg icon | Boolean | `false` |-|
| content | content of message| String/Number | - |- |
| duration | toast will be closed in milliseconds; if set duration as`0`, the toast will always be visible | Number | `3000` | - |
| position | display position | String | `center` | `top/center/bottom` |
| hasMask | whether to show a transparent mask, which will prevent users from clicking| Boolean | `false` | - |

##### Toast.info(content, duration, hasMask, parentNode)

Dynamically create a text toast

| Props | Description | Type | Default | Note |
|----|-----|------|------|------|
| content | content of message| String/Number | - |- |
| duration | toast will be closed in milliseconds; if set duration as`0`, the toast will always be visible | Number | `3000` | - |
| hasMask | whether to show a transparent mask, which will prevent users from clicking | Boolean | `false` | - |

##### Toast.succeed(content, duration, hasMask, parentNode)

Dynamically create a success toast

| Props | Description | Type | Default | Note |
|----|-----|------|------|------|
| content | content of message | String/Number | - |- |
| duration | toast will be closed in milliseconds; if set duration as`0`, the toast will always be visible | Number | `3000` | - |
| hasMask | whether to show a transparent mask, which will prevent users from clicking | Boolean | `false` | - |

##### Toast.failed(content, duration, hasMask, parentNode)

Dynamically create a failed toast

| Props | Description | Type | Default | Note |
|----|-----|------|------|------|
| content | content of message| String/Number | - |- |
| duration |toast will be closed in milliseconds; if set duration as`0`, the toast will always be visible | Number | `3000` | - |
| hasMask | whether to show a transparent mask, which will prevent users from clicking | Boolean | `false` | - |

##### Toast.loading(content, duration, hasMask, parentNode)

Dynamically create a loading toast

| Props | Description | Type | Default | Note |
|----|-----|------|------|------|
| content | content of message| String/Number | - |- |
| duration | toast will be closed in milliseconds; if set duration as`0`, the toast will always be visible | Number | `0` | - |
| hasMask | whether to show a transparent mask, which will prevent users from clicking | Boolean | `false` | - |

##### Toast.hide()

Hide current toast

#### Toast.component Props



| Props | Description | Type | Default | Note |
|----|-----|------|------|------|
| icon | name of icon | String | - | refer to `Icon` component for customized icons|
| iconSvg | use svg icon | Boolean | `false` |-|
| content | content of message| String/Number | - |- |
| duration | toast will be closed in milliseconds; if set duration as`0`, the toast will always be visible | Number | `3000` | - |
| position | display position | String | `center` | `top/center/bottom` |
| hasMask | whether to show a transparent mask, which will prevent users from clicking| Boolean | `false` | - |

```html
<md-toast>
  <md-activity-indicator>loading...</md-activity-indicator>
</md-toast>
```

#### Toast.component Methods



##### show()

Show toast

##### hide()

Hide toast

#### Toast.component Events



##### @show()

Toast show event

##### @hide()

Toast hidden event
