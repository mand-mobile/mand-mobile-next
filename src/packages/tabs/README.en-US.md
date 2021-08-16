---
component: tabs
title: Tabs
preview: https://didi.github.io/mand-mobile/examples/#/tabs
---

# Tabs

To create a tab page with a content area

### Import

```javascript
import { Tabs, TabPane } from  'mand-mobile-next'

Vue.createApp().component(Tabs.name, Tabs)
Vue.createApp().component(TabPane.name, TabPane)
```

### Code Examples

<demo-wrapper
  src="src/packages/tabs/demo"
/>

### API

#### Tabs Props

|Props | Description | Type | Default | Note|
|----|-----|------|------|------|
| default-index | initialize the index of tab | Number | 0 | - |
| has-ink |display underline ink bar |Boolean|`true`| |
| ink-length |the width of ink bar |Number|`0`| the percentage width of ink bar, between `1-100`|
| immediate |trigger a `change` event immediately after initialization |Boolean|`false`| |

#### TabPane Props

|Props | Description | Type | Default | Note|
|----|-----|------|------|------|
|name|unique name|String|-|required|
|label|tab label|String|-|required|
|disabled|disable pane|Boolean|`false`|-|


#### Tabs Events

##### @change(tab)

when user select tab

|Props | Description | Type|
|----|-----|------|
| tab | object of selected tab | Object:{name: String, label: String, disabled: Boolean}|
