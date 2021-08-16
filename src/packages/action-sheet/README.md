---
component: action-sheet
title: ActionSheet 动作面板
preview: https://didi.github.io/mand-mobile/examples/#/action-sheet
---

# ActionSheet 动作面板

用于提供场景相关的多个操作动作

## 引入

```javascript
import { ActionSheet } from 'mand-mobile-next'

Vue.createApp().component(ActionSheet.name, ActionSheet)

this.$actionsheet.create({ /* ... */ }) // 全量引入
```

## 代码演示

<demo-wrapper
  src="src/packages/action-sheet/demo"
/>

## API

### ActionSheet Props
|属性 | 说明 | 类型 | 默认值 | 备注 |
|----|-----|------|------|------|
| v-model | 选中值 | String, Number | | options[number].value |
|title|面板标题|String|-|-|
|options|面板选项| Array<{text, value}>| `[]`|-|
|invalid-index|禁用选择项索引 |Number|`-1`|-|
|cancel-text|取消按钮文案 |String | 取消 |-|
|default-index|默认选中下标|Boolean|`-1`|-|

### ActionSheet Events

#### <badge>v-model</badge> @update:modelValue(value)

选择事件

|属性 | 说明 | 类型 |
|----|-----|------|
|value| 选中项的值 | String, Number |

### <badge>v-model:visible</badge> @update:visible(value)

|属性 | 说明 | 类型 |
|----|-----|------|
|value| 控制显示隐藏 | boolean |

#### @cancel()

取消选择事件

#### @show()

面板展示事件

#### @hide()

面板隐藏事件

---

### ActionSheet 静态方法

#### create(props)

静态方法创建操作菜单, 返回ActionSheet实例；创建之后会立即显示。考虑到使用的规范性，不建议直接修改 `props` 来控制显示隐藏，**建议使用实例上的 `updateProps` 方法来更新 `props`, 使用 `remove` 方法来销毁实例**。

|属性 | 说明 | 类型 | 默认值 | 备注 |
|----|-----|------|------|------|
|v-model|默认选中的值| String，Number | | options[number].value |
|title|面板标题|String|-|-|
|options|面板选项| Array<{text, value, label}>| `[]`|-|
|invalidIndex|禁用选择项索引 |Number|`-1`|-|
|cancelText|取消按钮文案 |String |-|-|
|maxHeight|面板最高高度, 超出后可滚动|Number|400|单位`px`|
|onShow|面板展示回调|Function|-|-|
|onHide|面板隐藏回调|Function|-|-|
|onCancel|取消选择回调|Function|-|-|
|onSelected|选择回调|Function(item: {text, value})|-|-|
| onMaskClick | 点击蒙层回调 | Function|-| 一般此回调直接隐藏组件即可，见示例 |
