---
component: popup
title: Popup
preview: https://didi.github.io/mand-mobile/examples/#/popup
---

# Popup

A customized content area slides out or pops up on the screen, triggered by other controls.

### Import

```javascript
import { Popup, PopupTitleBar } from  'mand-mobile-next'

Vue.createApp().component(Popup.name, Popup)
Vue.createApp().component(PopupTitleBar.name, PopupTitleBar)
```

### Code Examples

<demo-wrapper
  src="src/packages/popup/demo"
/>

### API

#### Popup Props

|Props | Description | Type | Default | Note|
|----|-----|------|------|------|
|v-model|display popup or not|Boolean|`false`|-|
|has-mask|has mask or not|Boolean|`true`|-|
|mask-closable|if the popup will be closed when clicking mask|Boolean|`true`|-|
|position|the position of popup|String|`center`|`center`, `top`, `bottom`, `left`, `right`|
|transition|the animation effect of popup|String|-|`fade`, `fade-bounce`, `fade-slide`, `fade-zoom`<br> `slide-up`, `slide-down`, `slide-left`, `slide-right`|

#### PopupTitleBar Props

|Props | Description | Type | Default | Note|
|----|-----|------|------|------|
|title|title of popup|String|-|-|
|describe|description of popup|String|-|-|
|ok-text|confirmation text|String|-|no confirmation button if empty|
|cancel-text|cancellation text|String|-|no cancellation button if empty|
|only-close|only right close button|Boolean|`false`|-|
|title-align |title and description position|String|`center`|note that `left` and `right` will hide the left and right buttons respectively|

#### Popup Events

#### @beforeShow()

Popup will be shown

#### @show()

Show popup

#### @beforeHide()

Popup will be hiden

#### @hide()

Hide popup

#### PopupTitleBar Events

##### @confirm()

Confirm selection

##### @cancel()

Cancel selection
