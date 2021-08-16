---
component: action-sheet
title: ActionSheet
preview: https://didi.github.io/mand-mobile/examples/#/action-sheet
---

# ActionSheet


Support scenario-relevent operations

### Import

```javascript
import { ActionSheet } from  'mand-mobile-next'

Vue.createApp().component(ActionSheet.name, ActionSheet)

this.$actionsheet.create({ /* ... */ }) // Totally Import
```

### Code Examples

<demo-wrapper
  src="src/packages/action-sheet/demo"
/>

<!-- DEMO -->


### API

#### ActionSheet Props
|Props | Description | Type | Default | Note |
|----|-----|------|------|------|------|
|v-model|display actionsheet or not|Boolean|`false`|-|
|title|title of actionsheet|String|-|-|
|options|options of actionsheet|Array<{text, value, label}>| [] |-|
|default-index|default selected index|Boolean|0|-|
|invalid-index|invalid index|Number| -1|-|
|cancel-text|cancel text|String|-|-|
|defaultIndex|default selected index|Boolean|-1|-|

#### ActionSheet Events

#### <badge>v-model</badge> @update:modelValue(value)
Select event

| Props | Description | Type |
|----|-----|------|
| value | selected value | String, Number |

### <badge>v-model:visible</badge> @update:visible(value)

| Props | Description | Type |
|----|-----|------|
| value | control show or hide | boolean |

##### @cancel()

cancel event

##### @show()

show event

#### @hide()

hide event
#### ActionSheet Static Methods

##### create(props)
Static create a global ActionSheet, and return instance. You can change instance `value` to toggle the visibility of ActionSheet.

|----|-----|------|------|------|------|
|v-model|display actionsheet or not|Boolean|`true`|-|
|title|title of actionsheet|String|-|-|
|options|options of actionsheet|Array<{text, value}>| [] |-|
|invalidIndex|invalid index|Number| -1|-|
|cancelText|cancel text|String|-|-|
|maxHeight|the maximum height of actionsheet area|Number|`400`|unit `px`|
|onShow|actionsheet show callback|Function|-|-|
|onHide|actionsheet hide callback|Function|-|-|
|onCancel|cancel selection callback|Function|-|-|
|onSelected|selection callback|Function(item: {text, value})|-|-|
| onMaskClick | click mask callback | Function|-| normally this callback simply hides the component, as shown in the example |
